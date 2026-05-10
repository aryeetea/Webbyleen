import { useEffect, useState } from 'react'
import { defaultSiteContent, fetchSiteContent, hasRemoteSiteContent } from '../lib/siteContent'

export function useSiteContent() {
  const [content, setContent] = useState(defaultSiteContent)
  const [loading, setLoading] = useState(hasRemoteSiteContent)

  useEffect(() => {
    let cancelled = false

    async function loadContent() {
      if (!hasRemoteSiteContent) {
        setLoading(false)
        return
      }

      try {
        const nextContent = await fetchSiteContent()

        if (!cancelled) {
          setContent(nextContent)
        }
      } catch {
        if (!cancelled) {
          setContent(defaultSiteContent)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadContent()

    return () => {
      cancelled = true
    }
  }, [])

  return { content, loading }
}
