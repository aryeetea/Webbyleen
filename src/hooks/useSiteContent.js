import { useEffect, useState } from 'react'
import { defaultSiteContent, fetchSiteContent } from '../lib/siteContent'
import { isSanityConfigured } from '../lib/sanity'

export function useSiteContent() {
  const [content, setContent] = useState(defaultSiteContent)
  const [loading, setLoading] = useState(isSanityConfigured)

  useEffect(() => {
    let cancelled = false

    async function loadContent() {
      if (!isSanityConfigured) {
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
