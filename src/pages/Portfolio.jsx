import { useEffect, useState } from 'react'
import PortfolioShowcase from '../components/PortfolioShowcase'
import SectionIntro from '../components/SectionIntro'
import { fetchPortfolioProjects } from '../lib/api'

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadProjects() {
      try {
        const items = await fetchPortfolioProjects()
        if (!cancelled) {
          setProjects(items)
        }
      } catch (loadError) {
        if (!cancelled) {
          setProjects([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProjects()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <section className="relative overflow-hidden px-5 pb-20 pt-36 sm:px-6 sm:pt-40">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_right,rgba(196,168,130,0.24),transparent_36%),radial-gradient(circle_at_left,rgba(139,111,78,0.12),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl">
          <SectionIntro
            label="Portfolio"
            title="Custom websites built for real businesses."
            copy="Every project below is designed and developed from scratch — built to help a business look established, intentional, and worth remembering online."
          />
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-[34px] border border-warmbrown/10 bg-softwhite/36 p-2 shadow-[0_24px_56px_rgba(17,17,16,0.04)]">
          <PortfolioShowcase
            projects={projects}
            loading={loading}
          />
        </div>
      </section>
    </>
  )
}
