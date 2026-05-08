import { Link } from 'react-router-dom'
import PortraitCard from '../components/PortraitCard'

export default function AboutUs() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_right,rgba(196,168,130,0.24),transparent_36%),radial-gradient(circle_at_left,rgba(139,111,78,0.12),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl">
          <h1 className="font-display text-[2.8rem] leading-[0.96] text-ink sm:text-[4.4rem]">
            About
          </h1>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-warmbrown">
              About ACE Web Studio
            </div>
            <h2 className="mt-5 font-display text-[2.4rem] leading-[0.98] text-ink sm:text-[3.4rem]">
              Meet the Team
            </h2>
            <p className="mt-4 text-[1rem] leading-8 text-ink/58 sm:text-[1.08rem]">
              Three creatives. One studio. Every project gets all of us.
            </p>
            <p className="mx-auto mt-8 max-w-3xl text-[1rem] leading-8 text-ink/68 sm:text-[1.06rem]">
              ACE Web Studio is a small creative team building thoughtful websites with strong visual direction and clean execution. We keep our process personal, collaborative, and precise so every project feels elevated from the first idea to the final launch.
            </p>
          </div>

          <div className="mt-14">
            <PortraitCard />
          </div>

          <div className="surface-subtle mt-14 rounded-[30px] px-6 py-6 sm:px-8 sm:py-8">
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="rounded-full bg-ink px-8 py-4 text-center text-[0.76rem] font-medium uppercase tracking-[0.2em] text-softwhite transition hover:-translate-y-0.5 hover:bg-warmbrown"
              >
                Contact
              </Link>
              <Link
                to="/services"
                className="rounded-full border border-ink px-8 py-4 text-center text-[0.76rem] font-medium uppercase tracking-[0.2em] text-ink transition hover:bg-ink hover:text-softwhite"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
