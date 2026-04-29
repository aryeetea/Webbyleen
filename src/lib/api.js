const API_BASE_URL = import.meta.env.VITE_API_URL || ''

function getApiUrl(path) {
  return `${API_BASE_URL}${path}`
}

async function readJson(response) {
  return response.json().catch(() => ({}))
}

function getNetworkErrorMessage(fallback) {
  return `${fallback} Make sure the API server is running on http://localhost:5050.`
}

function getFriendlyErrorMessage(payload, fallback) {
  const raw = typeof payload?.error === 'string' ? payload.error : ''

  if (!raw) {
    return fallback
  }

  if (/supabase is not configured/i.test(raw)) {
    return 'Supabase is not connected yet. Add your Supabase keys to the local environment first.'
  }

  if (/relation .* does not exist|table .* does not exist/i.test(raw)) {
    return 'Your Supabase tables are not ready yet. Create the required SQL tables first.'
  }

  if (/bucket .* not found|portfolio-previews/i.test(raw) && /not found|does not exist/i.test(raw)) {
    return 'Your Supabase storage bucket is missing. Create the `portfolio-previews` bucket first.'
  }

  if (/invalid email or password/i.test(raw)) {
    return 'The email or password is not correct.'
  }

  if (/email and password are required/i.test(raw)) {
    return 'Enter both an email and password.'
  }

  if (/email is required/i.test(raw)) {
    return 'Enter an email address before sending the form.'
  }

  if (/already exists|already in the portfolio/i.test(raw)) {
    return raw
  }

  if (/create the admin account first/i.test(raw)) {
    return 'Create the admin account first, then sign in.'
  }

  if (/project not found/i.test(raw)) {
    return 'That project could not be found anymore.'
  }

  return fallback
}

export function resolveAssetUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  return `${API_BASE_URL}${path}`
}

export async function fetchPortfolioProjects() {
  let response

  try {
    response = await fetch(getApiUrl('/api/portfolio-projects'))
  } catch {
    throw new Error(getNetworkErrorMessage('Could not load portfolio projects.'))
  }

  if (!response.ok) {
    const payload = await readJson(response)
    throw new Error(getFriendlyErrorMessage(payload, 'Could not load portfolio projects right now.'))
  }

  return response.json()
}

export async function fetchAdminStatus() {
  let response

  try {
    response = await fetch(getApiUrl('/api/admin/status'))
  } catch {
    throw new Error(getNetworkErrorMessage('Could not load admin status.'))
  }

  if (!response.ok) {
    const payload = await readJson(response)
    throw new Error(getFriendlyErrorMessage(payload, 'Could not load admin status right now.'))
  }

  return response.json()
}

export async function setupAdmin(email, password) {
  let response

  try {
    response = await fetch(getApiUrl('/api/admin/setup'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
  } catch {
    throw new Error(getNetworkErrorMessage('Could not create the admin account.'))
  }

  const payload = await readJson(response)

  if (!response.ok) {
    throw new Error(getFriendlyErrorMessage(payload, 'Could not create the admin account right now.'))
  }

  return payload
}

export async function loginAdmin(email, password) {
  let response

  try {
    response = await fetch(getApiUrl('/api/admin/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
  } catch {
    throw new Error(getNetworkErrorMessage('Login failed.'))
  }

  const payload = await readJson(response)

  if (!response.ok) {
    throw new Error(getFriendlyErrorMessage(payload, 'Could not sign in right now.'))
  }

  return payload
}

export async function verifyAdminSession(token) {
  let response

  try {
    response = await fetch(getApiUrl('/api/admin/session'), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch {
    return null
  }

  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function createPortfolioProject(url, token) {
  let response

  try {
    response = await fetch(getApiUrl('/api/admin/portfolio-projects'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url }),
    })
  } catch {
    throw new Error(getNetworkErrorMessage('Could not add this project.'))
  }

  const payload = await readJson(response)

  if (!response.ok) {
    throw new Error(getFriendlyErrorMessage(payload, 'Could not add this project right now.'))
  }

  return payload
}

export async function deletePortfolioProject(id, token) {
  let response

  try {
    response = await fetch(getApiUrl(`/api/admin/portfolio-projects/${id}`), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch {
    throw new Error(getNetworkErrorMessage('Could not remove this project.'))
  }

  const payload = await readJson(response)

  if (!response.ok) {
    throw new Error(getFriendlyErrorMessage(payload, 'Could not remove this project right now.'))
  }

  return payload
}

export async function createContactInquiry(form) {
  let response

  try {
    response = await fetch(getApiUrl('/api/contact-inquiries'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
  } catch {
    throw new Error(getNetworkErrorMessage('Could not send your message.'))
  }

  const payload = await readJson(response)

  if (!response.ok) {
    throw new Error(getFriendlyErrorMessage(payload, 'Could not send your message right now.'))
  }

  return payload
}

export async function fetchContactInquiries() {
  let response

  try {
    response = await fetch(getApiUrl('/api/contact-inquiries'))
  } catch {
    throw new Error(getNetworkErrorMessage('Could not load inquiries.'))
  }

  if (!response.ok) {
    const payload = await readJson(response)
    throw new Error(getFriendlyErrorMessage(payload, 'Could not load inquiries right now.'))
  }

  return response.json()
}
