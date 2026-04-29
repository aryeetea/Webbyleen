import { useEffect, useRef, useState } from 'react'
import {
  createPortfolioProject,
  deletePortfolioProject,
  fetchAdminStatus,
  fetchPortfolioProjects,
  loginAdmin,
  setupAdmin,
  verifyAdminSession,
} from '../lib/api'

const ADMIN_TOKEN_KEY = 'adminSessionToken'

function getStoredToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY) || ''
}

export default function Admin() {
  const [token, setToken] = useState(getStoredToken)
  const [hasAccount, setHasAccount] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [url, setUrl] = useState('')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [authChecking, setAuthChecking] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const urlRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    async function boot() {
      try {
        const status = await fetchAdminStatus()

        if (!cancelled) {
          setHasAccount(status.hasAccount)
        }

        if (!token) {
          return
        }

        const session = await verifyAdminSession(token)

        if (!session) {
          localStorage.removeItem(ADMIN_TOKEN_KEY)
          if (!cancelled) {
            setToken('')
            setAdminEmail('')
          }
          return
        }

        const items = await fetchPortfolioProjects()
        if (!cancelled) {
          setProjects(items)
          setAdminEmail(session.admin?.email || '')
          setFormEmail(session.admin?.email || '')
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message)
        }
      } finally {
        if (!cancelled) {
          setAuthChecking(false)
          setLoading(false)
        }
      }
    }

    boot()

    return () => {
      cancelled = true
    }
  }, [token])

  async function handleSetup(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setMessage('')

    if (password !== confirmPassword) {
      setSubmitting(false)
      setError('Passwords do not match.')
      return
    }

    try {
      const session = await setupAdmin(formEmail, password)
      localStorage.setItem(ADMIN_TOKEN_KEY, session.token)
      setToken(session.token)
      setHasAccount(true)
      setAdminEmail(session.admin?.email || formEmail)
      setPassword('')
      setConfirmPassword('')
      setMessage('Admin account created.')
    } catch (setupError) {
      setError(setupError.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleLogin(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setMessage('')

    try {
      const session = await loginAdmin(formEmail, password)
      localStorage.setItem(ADMIN_TOKEN_KEY, session.token)
      setToken(session.token)
      setAdminEmail(session.admin?.email || formEmail)
      setPassword('')
      setConfirmPassword('')
      setMessage('Admin access granted.')
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleAddProject(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setMessage('')

    try {
      const project = await createPortfolioProject(url, token)
      setProjects(current => [project, ...current])
      setUrl('')
      setMessage('Project added. The public site can render it now.')
      urlRef.current?.focus()
    } catch (saveError) {
      setError(saveError.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleRemoveProject(id) {
    setError('')
    setMessage('')

    try {
      await deletePortfolioProject(id, token)
      setProjects(current => current.filter(project => project.id !== id))
      setMessage('Project removed from the live portfolio.')
    } catch (removeError) {
      setError(removeError.message)
    }
  }

  function handleLogout() {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    setToken('')
    setProjects([])
    setPassword('')
    setConfirmPassword('')
    setMessage('Signed out.')
  }

  if (authChecking) {
    return (
      <section className="px-5 pb-24 pt-36 sm:px-6 sm:pt-40">
        <div className="mx-auto max-w-3xl rounded-[4px] border border-warmbrown-pale bg-softwhite p-10 text-center text-ink/60 shadow-[0_14px_36px_rgba(17,17,16,0.04)]">
          Checking admin access...
        </div>
      </section>
    )
  }

  if (!token) {
    const isSetupMode = !hasAccount

    return (
      <section className="relative overflow-hidden px-5 pb-24 pt-36 sm:px-6 sm:pt-40">
        <div className="absolute inset-x-0 top-0 h-130 bg-[radial-gradient(circle_at_top,rgba(196,168,130,0.18),transparent_34%),radial-gradient(circle_at_left,rgba(139,111,78,0.08),transparent_28%)]" />
        <div className="relative mx-auto max-w-3xl">
          <div className="rounded-[4px] border border-warmbrown-pale bg-softwhite p-8 shadow-[0_24px_60px_rgba(17,17,16,0.08)] sm:p-10">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-warmbrown">Admin</p>
            <h1 className="mt-5 font-display text-[3rem] leading-[0.94] text-ink sm:text-[3.8rem]">
              {isSetupMode ? 'Create the admin account first.' : 'Sign in to publish portfolio links to the main site.'}
            </h1>
            <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-ink/65">
              {isSetupMode
                ? 'Set up the first admin email and password here. After that, this page becomes the normal admin login.'
                : 'Use the admin account you created to manage portfolio links and publish rendered project previews to the public site.'}
            </p>

            <form onSubmit={isSetupMode ? handleSetup : handleLogin} className="mt-10 space-y-5">
              <label className="block">
                <span className="mb-2 block text-[0.74rem] font-medium uppercase tracking-[0.18em] text-ink/60">Admin email</span>
                <input
                  type="email"
                  value={formEmail}
                  onChange={event => setFormEmail(event.target.value)}
                  className="w-full rounded-[4px] border border-warmbrown-pale bg-cream px-4 py-4 text-[1rem] text-ink outline-none focus:border-warmbrown"
                  placeholder="hello@acwebstudio.com"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[0.74rem] font-medium uppercase tracking-[0.18em] text-ink/60">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  className="w-full rounded-[4px] border border-warmbrown-pale bg-cream px-4 py-4 text-[1rem] text-ink outline-none focus:border-warmbrown"
                  placeholder={isSetupMode ? 'Create a password' : 'Enter your password'}
                  required
                />
              </label>

              {isSetupMode && (
                <label className="block">
                  <span className="mb-2 block text-[0.74rem] font-medium uppercase tracking-[0.18em] text-ink/60">Confirm password</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                    className="w-full rounded-[4px] border border-warmbrown-pale bg-cream px-4 py-4 text-[1rem] text-ink outline-none focus:border-warmbrown"
                    placeholder="Re-enter your password"
                    required
                  />
                </label>
              )}

              {error && <p className="rounded-[4px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
              {message && <p className="rounded-[4px] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-ink px-8 py-4 text-[0.76rem] font-medium uppercase tracking-[0.2em] text-softwhite transition hover:bg-warmbrown disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (isSetupMode ? 'Creating Account...' : 'Signing In...') : isSetupMode ? 'Create Admin Account' : 'Enter Admin'}
              </button>
            </form>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-5 pb-24 pt-36 sm:px-6 sm:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[4px] border border-warmbrown-pale bg-softwhite p-8 shadow-[0_14px_36px_rgba(17,17,16,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-warmbrown">Admin Dashboard</p>
                <h1 className="mt-4 font-display text-[2.6rem] leading-[0.96] text-ink">Publish a project link to the public portfolio.</h1>
                {adminEmail && <p className="mt-4 text-sm uppercase tracking-[0.16em] text-ink/50">Signed in as {adminEmail}</p>}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-warmbrown-pale px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-ink/65 transition hover:border-warmbrown hover:text-ink"
              >
                Log Out
              </button>
            </div>

            <p className="mt-5 text-[1rem] leading-8 text-ink/65">
              When you add a URL here, the backend visits the live website, captures its content, saves preview images, and sends that rendered project to the main site.
            </p>

            <form onSubmit={handleAddProject} className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-[0.74rem] font-medium uppercase tracking-[0.18em] text-ink/60">Portfolio project link</span>
                <input
                  ref={urlRef}
                  type="url"
                  value={url}
                  onChange={event => setUrl(event.target.value)}
                  className="w-full rounded-[4px] border border-warmbrown-pale bg-cream px-4 py-4 text-[1rem] text-ink outline-none focus:border-warmbrown"
                  placeholder="https://yourclientproject.com"
                  required
                />
              </label>

              {error && <p className="rounded-[4px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
              {message && <p className="rounded-[4px] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-ink px-8 py-4 text-[0.76rem] font-medium uppercase tracking-[0.2em] text-softwhite transition hover:bg-warmbrown disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Rendering Project...' : 'Add Project'}
              </button>
            </form>
          </div>

          <div className="rounded-[4px] border border-warmbrown-pale bg-softwhite p-8 shadow-[0_14px_36px_rgba(17,17,16,0.04)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-warmbrown">Live Entries</p>
                <h2 className="mt-4 font-display text-[2.2rem] leading-none text-ink">Projects currently showing on the public site.</h2>
              </div>
              <span className="rounded-full bg-cream px-4 py-2 text-[0.7rem] uppercase tracking-[0.16em] text-ink/60">
                {loading ? 'Loading...' : `${projects.length} total`}
              </span>
            </div>

            <div className="mt-8 space-y-5">
              {projects.length === 0 ? (
                <div className="rounded-[4px] border border-dashed border-warmbrown-pale bg-cream px-6 py-10 text-center text-ink/60">
                  No projects added yet.
                </div>
              ) : (
                projects.map(project => (
                  <article key={project.id} className="rounded-[4px] border border-warmbrown-pale bg-cream p-5">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-warmbrown">
                          {new URL(project.url).hostname.replace(/^www\./, '')}
                        </p>
                        <h3 className="mt-2 font-display text-[1.7rem] text-ink">{project.title}</h3>
                        <p className="mt-3 text-[0.95rem] leading-7 text-ink/65">{project.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.technologies?.map(technology => (
                            <span key={technology} className="rounded-full bg-softwhite px-3 py-1 text-[0.66rem] uppercase tracking-[0.14em] text-warmbrown">
                              {technology}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveProject(project.id)}
                        className="rounded-full border border-warmbrown-pale px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-ink/65 transition hover:border-red-300 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
