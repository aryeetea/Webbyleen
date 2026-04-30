import cors from 'cors'
import crypto from 'crypto'
import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import puppeteer from 'puppeteer'
import { fileURLToPath } from 'url'
import { hasSupabaseConfig, supabase } from './supabase.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const dataDir = path.join(__dirname, 'data')

const PORT = process.env.PORT || 5050
const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'change-me-before-production'
const TOKEN_TTL_MS = 1000 * 60 * 60 * 12
const ADMIN_ACCESS_CODE = process.env.ADMIN_ACCESS_CODE?.trim() || ''
const PACKAGE_OPTIONS = new Set(['Starter', 'Professional', 'Signature', 'Custom'])

app.use(cors())
app.use(express.json({ limit: '2mb' }))

async function ensureStorage() {
  await fs.mkdir(dataDir, { recursive: true })
}

function ensureSupabase() {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error('Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to the API environment.')
  }
}

function mapProjectRow(project) {
  return {
    id: project.id,
    url: project.url,
    title: project.title,
    description: project.description,
    technologies: project.technologies || [],
    packageType: project.package_type,
    summary: project.summary,
    ogImage: project.og_image,
    screenshots: project.screenshots || [],
    createdAt: project.created_at,
  }
}

async function readProjects() {
  ensureSupabase()

  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (data || []).map(mapProjectRow)
}

async function readContactInquiries() {
  ensureSupabase()

  const { data, error } = await supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (data || []).map(inquiry => ({
    id: inquiry.id,
    firstName: inquiry.first_name,
    lastName: inquiry.last_name,
    email: inquiry.email,
    businessName: inquiry.business_name,
    website: inquiry.website,
    timeline: inquiry.timeline,
    package: inquiry.package,
    message: inquiry.message,
    createdAt: inquiry.created_at,
  }))
}

function sanitizeSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'project'
}

function normalizeUrl(rawUrl) {
  const value = rawUrl?.trim()

  if (!value) {
    throw new Error('Missing url')
  }

  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
  const normalized = new URL(withProtocol)

  return normalized.toString()
}

function signToken(payload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto.createHmac('sha256', TOKEN_SECRET).update(encoded).digest('base64url')

  return `${encoded}.${signature}`
}

function verifyToken(token) {
  if (!token) return null

  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) return null

  const expected = crypto.createHmac('sha256', TOKEN_SECRET).update(encoded).digest('base64url')
  if (signature !== expected) return null

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'))
    if (payload.expiresAt < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  const session = verifyToken(token)

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  req.session = session
  next()
}

function guessTech(html) {
  const tech = []

  if (/react/i.test(html)) tech.push('React')
  if (/next/i.test(html)) tech.push('Next.js')
  if (/vue/i.test(html)) tech.push('Vue.js')
  if (/wordpress|wp-content/i.test(html)) tech.push('WordPress')
  if (/shopify/i.test(html)) tech.push('Shopify')
  if (/bootstrap/i.test(html)) tech.push('Bootstrap')
  if (/tailwind/i.test(html)) tech.push('Tailwind CSS')
  if (/squarespace/i.test(html)) tech.push('Squarespace')
  if (/wix/i.test(html)) tech.push('Wix')
  if (/angular/i.test(html)) tech.push('Angular')
  if (/jquery/i.test(html)) tech.push('jQuery')
  if (/vite/i.test(html)) tech.push('Vite')
  if (/gatsby/i.test(html)) tech.push('Gatsby')
  if (/svelte/i.test(html)) tech.push('Svelte')

  return tech.length ? tech : ['Custom/Other']
}

function normalizePackageType(value) {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  return PACKAGE_OPTIONS.has(trimmed) ? trimmed : ''
}

function suggestPackageType(html) {
  const internalLinks = new Set(
    Array.from(
      html.matchAll(/<a [^>]*href=["'](\/(?!\/)[^"']*|https?:\/\/[^"']+)["']/gi),
      match => match[1]
    )
      .map(link => link.trim())
      .filter(link => link && !/^https?:\/\/(www\.)?(facebook|instagram|linkedin|x|twitter|youtube)\./i.test(link))
  )

  const sections = (html.match(/<section\b/gi) || []).length
  const forms = (html.match(/<form\b/gi) || []).length
  const serviceKeywords = (html.match(/services?|pricing|testimonials?|portfolio|contact|about|faq/gi) || []).length

  const score = internalLinks.size + sections + forms * 2 + Math.min(serviceKeywords, 6)

  if (score <= 6) return 'Starter'
  if (score <= 14) return 'Professional'
  return 'Signature'
}

function getMetaFromHtml(html, fallbackUrl) {
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is)
  const descriptionMatch = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>|<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i
  )
  const ogImageMatch = html.match(
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["'][^>]*>|<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:image["'][^>]*>/i
  )

  return {
    title: titleMatch?.[1]?.replace(/\s+/g, ' ').trim() || fallbackUrl,
    description: (descriptionMatch?.[1] || descriptionMatch?.[2] || '').trim(),
    ogImage: (ogImageMatch?.[1] || ogImageMatch?.[2] || '').trim(),
  }
}

function generateSummary(meta, tech, pkg) {
  const description = meta.description ? ` ${meta.description}` : ''
  return `This project is built with ${tech.join(', ')} and best fits the ${pkg} package.${description}`.trim()
}

function createFallbackAnalysis(url) {
  const parsedUrl = new URL(url)
  const hostname = parsedUrl.hostname.replace(/^www\./, '')
  const readableTitle = hostname
    .split('.')
    .filter(Boolean)
    .slice(0, 2)
    .join(' ')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())

  return {
    title: readableTitle || hostname,
    description: 'Live project link added without an automated preview.',
    technologies: ['Custom/Other'],
    packageType: 'Custom',
    summary: 'This project was published from its live URL. Preview screenshots were not available, so the site is shown with a fallback portfolio card.',
    ogImage: '',
    screenshots: [],
  }
}

async function uploadScreenshots(baseName, screenshots) {
  ensureSupabase()
  const uploadedPaths = []

  for (const [index, screenshot] of screenshots.entries()) {
    const storagePath = `${baseName}-${index + 1}.png`
    const buffer = Buffer.from(screenshot, 'base64')

    const { error } = await supabase.storage
      .from('portfolio-previews')
      .upload(storagePath, buffer, {
        contentType: 'image/png',
        upsert: true,
      })

    if (error) {
      throw new Error(error.message)
    }

    const { data } = supabase.storage.from('portfolio-previews').getPublicUrl(storagePath)
    uploadedPaths.push(data.publicUrl)
  }

  return uploadedPaths
}

async function removeScreenshots(screenshots = []) {
  ensureSupabase()

  const paths = screenshots
    .map(screenshotUrl => {
      try {
        const pathname = new URL(screenshotUrl).pathname
        const marker = '/storage/v1/object/public/portfolio-previews/'
        const index = pathname.indexOf(marker)
        return index >= 0 ? pathname.slice(index + marker.length) : null
      } catch {
        return null
      }
    })
    .filter(Boolean)

  if (!paths.length) {
    return
  }

  const { error } = await supabase.storage.from('portfolio-previews').remove(paths)

  if (error) {
    throw new Error(error.message)
  }
}

async function analyzeProject(url) {
  let browser

  try {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 1024, deviceScaleFactor: 1 })
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })

    const html = await page.content()
    const meta = getMetaFromHtml(html, url)
    const tech = guessTech(html)
    const packageType = suggestPackageType(html)
    const summary = generateSummary(meta, tech, packageType)

    const screenshots = []
    screenshots.push(await page.screenshot({ encoding: 'base64', fullPage: false, type: 'png' }))
    await page.evaluate(() => window.scrollTo(0, Math.max(window.innerHeight * 0.9, document.body.scrollHeight * 0.35)))
    screenshots.push(await page.screenshot({ encoding: 'base64', fullPage: false, type: 'png' }))
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    screenshots.push(await page.screenshot({ encoding: 'base64', fullPage: false, type: 'png' }))

    return {
      title: meta.title,
      description: meta.description,
      technologies: tech,
      packageType,
      summary,
      ogImage: meta.ogImage,
      screenshots,
    }
  } catch (error) {
    if (/ERR_NAME_NOT_RESOLVED|ERR_CONNECTION_REFUSED|ERR_CONNECTION_TIMED_OUT|ERR_INTERNET_DISCONNECTED/i.test(error.message)) {
      throw new Error('Could not reach that website. Check the link and make sure the site is live.', { cause: error })
    }

    if (/Navigation timeout/i.test(error.message)) {
      throw new Error('That website took too long to load for a preview. Try again or use another project link.', { cause: error })
    }

    if (/net::ERR_ABORTED|403|401/i.test(error.message)) {
      throw new Error('That website blocked the preview request. Some sites do not allow automated previews.', { cause: error })
    }

    throw new Error(`Preview failed: ${error.message}`, { cause: error })
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

app.get('/api/portfolio-projects', async (_req, res) => {
  try {
    const projects = await readProjects()
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/contact-inquiries', async (_req, res) => {
  try {
    const inquiries = await readContactInquiries()
    res.json(inquiries)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/contact-inquiries', async (req, res) => {
  try {
    ensureSupabase()

    const payload = {
      first_name: req.body.firstName?.trim() || '',
      last_name: req.body.lastName?.trim() || '',
      email: req.body.email?.trim(),
      business_name: req.body.businessName?.trim() || '',
      website: req.body.website?.trim() || '',
      timeline: req.body.timeline?.trim() || '',
      package: req.body.package?.trim() || '',
      message: req.body.message?.trim() || '',
    }

    if (!payload.email) {
      return res.status(400).json({ error: 'Email is required.' })
    }

    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert(payload)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    res.status(201).json({
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      businessName: data.business_name,
      website: data.website,
      timeline: data.timeline,
      package: data.package,
      message: data.message,
      createdAt: data.created_at,
    })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not save this inquiry.' })
  }
})

app.get('/api/admin/status', async (_req, res) => {
  try {
    res.json({
      ready: Boolean(ADMIN_ACCESS_CODE),
    })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not load admin status.' })
  }
})

app.post('/api/admin/login', async (req, res) => {
  try {
    if (!ADMIN_ACCESS_CODE) {
      return res.status(500).json({ error: 'Admin access code is not configured on the server.' })
    }

    const code = req.body.code?.trim()

    if (!code) {
      return res.status(400).json({ error: 'Admin access code is required.' })
    }

    if (code !== ADMIN_ACCESS_CODE) {
      return res.status(401).json({ error: 'Invalid admin access code.' })
    }

    const expiresAt = Date.now() + TOKEN_TTL_MS
    const token = signToken({ role: 'admin', expiresAt })

    res.json({
      token,
      expiresAt,
      admin: { role: 'admin' },
    })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not sign in to admin.' })
  }
})

app.get('/api/admin/session', requireAdmin, (req, res) => {
  res.json({
    ok: true,
    admin: {
      role: req.session.role,
    },
  })
})

app.post('/api/admin/portfolio-projects', requireAdmin, async (req, res) => {
  try {
    const url = normalizeUrl(req.body.url)
    const packageTypeOverride = normalizePackageType(req.body.packageType)
    const existingProjects = await readProjects()

    if (existingProjects.some(project => project.url === url)) {
      return res.status(409).json({ error: 'This project is already in the portfolio.' })
    }

    let analysis

    try {
      analysis = await analyzeProject(url)
    } catch (previewError) {
      console.warn(`Preview generation failed for ${url}:`, previewError.message)
      analysis = createFallbackAnalysis(url)
    }

    if (packageTypeOverride) {
      analysis.packageType = packageTypeOverride
    }

    let screenshotPaths = []

    if (analysis.screenshots.length > 0) {
      try {
        const baseName = `${sanitizeSlug(analysis.title)}-${crypto.randomUUID()}`
        screenshotPaths = await uploadScreenshots(baseName, analysis.screenshots)
      } catch (uploadError) {
        console.warn(`Screenshot upload failed for ${url}:`, uploadError.message)
      }
    }

    const { data, error } = await supabase
      .from('portfolio_projects')
      .insert({
        url,
        title: analysis.title,
        description: analysis.description,
        technologies: analysis.technologies,
        package_type: analysis.packageType,
        summary: analysis.summary,
        og_image: analysis.ogImage,
        screenshots: screenshotPaths,
      })
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    const project = mapProjectRow(data)
    res.status(201).json(project)
  } catch (error) {
    console.error('Failed to add portfolio project:', error)
    res.status(500).json({ error: error.message || 'Could not analyze this project link.' })
  }
})

app.patch('/api/admin/portfolio-projects/:id', requireAdmin, async (req, res) => {
  try {
    ensureSupabase()

    const packageType = normalizePackageType(req.body.packageType)

    if (!packageType) {
      return res.status(400).json({ error: 'A valid package type is required.' })
    }

    const { data, error } = await supabase
      .from('portfolio_projects')
      .update({ package_type: packageType })
      .eq('id', req.params.id)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    res.json(mapProjectRow(data))
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not update this project.' })
  }
})

app.delete('/api/admin/portfolio-projects/:id', requireAdmin, async (req, res) => {
  try {
    const projects = await readProjects()
    const project = projects.find(item => item.id === req.params.id)

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    await removeScreenshots(project.screenshots)

    const { error } = await supabase
      .from('portfolio_projects')
      .delete()
      .eq('id', req.params.id)

    if (error) {
      throw new Error(error.message)
    }

    res.json({ ok: true })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not remove this project.' })
  }
})

ensureStorage()
  .then(() => {
    app.listen(PORT, () => console.log(`API running on port ${PORT}`))
  })
  .catch(error => {
    console.error('Failed to prepare API storage', error)
    process.exit(1)
  })
