import { Studio } from 'sanity'
import { isSanityConfigured } from '../lib/sanity'
import { studioConfig } from '../sanity/config'

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <section className="min-h-screen bg-cream px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-[30px] border border-warmbrown/12 bg-softwhite p-8 shadow-[0_24px_56px_rgba(17,17,16,0.06)] sm:p-10">
          <div className="text-[0.72rem] uppercase tracking-[0.24em] text-warmbrown">Sanity CMS</div>
          <h1 className="mt-5 font-display text-[2.3rem] leading-none text-ink sm:text-[3rem]">
            Add your Sanity project details to open the studio.
          </h1>
          <p className="mt-6 text-[1rem] leading-8 text-ink/64">
            Set `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` in `.env.local`, restart the Vite server, then revisit `/studio`.
          </p>
        </div>
      </section>
    )
  }

  return <Studio config={studioConfig} basePath="/studio" unstable_globalStyles />
}
