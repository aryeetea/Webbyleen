import PortraitCard from '../components/PortraitCard'

export default function AboutUs() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
        <div className="absolute inset-0 bg-cream" />
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
        </div>
      </section>
    </>
  )
}
