import { Link } from 'react-router-dom'
import SectionIntro from '../components/SectionIntro'
import { useSiteContent } from '../hooks/useSiteContent'

function renderHeroTitle(title, highlight) {
  if (!highlight || !title.includes(highlight)) {
    return title
  }

  const [before, after] = title.split(highlight)

  return (
    <>
      {before}
      <span className="italic text-warmbrown">{highlight}</span>
      {after}
    </>
  )
}

function getHomepageCtas(homeHero) {
  return [
    {
      label: 'Order Now',
      to: '/checkout',
      className:
        'inline-flex min-w-[220px] items-center justify-center rounded-full bg-ink px-10 py-5 text-center text-[0.95rem] font-semibold tracking-[-0.01em] text-softwhite shadow-[0_14px_28px_rgba(26,26,26,0.18)] transition hover:-translate-y-0.5 hover:bg-warmbrown sm:min-w-[250px]',
    },
    {
      label: 'Contact Us',
      to: '/contact',
      className:
        'inline-flex min-w-[220px] items-center justify-center rounded-full bg-warmbrown px-10 py-5 text-center text-[0.95rem] font-semibold tracking-[-0.01em] text-softwhite shadow-[0_14px_28px_rgba(184,149,106,0.28)] transition hover:-translate-y-0.5 hover:bg-warmbrown-light sm:min-w-[250px]',
    },
  ]
}

export default function Home() {
  const { content } = useSiteContent()
  const { homeHero } = content.settings
  const homepageCtas = getHomepageCtas(homeHero)

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-40">
        <div className="absolute inset-0 bg-cream" />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="animate-fade-up flex flex-wrap items-center gap-3 text-[0.68rem] font-medium uppercase editorial-kicker text-warmbrown sm:text-[0.72rem]">
              <span className="rounded-full border border-warmbrown/12 bg-softwhite/80 px-3 py-1 shadow-[0_10px_24px_rgba(23,20,17,0.05)]">Luxury feel</span>
              <span className="h-px w-8 bg-warmbrown/70" />
              <span>{homeHero.eyebrow}</span>
            </div>
            <h1 className="text-balance animate-fade-up mt-6 max-w-5xl font-display text-[2.7rem] leading-[0.94] text-ink opacity-0 [animation-delay:120ms] sm:text-[4.4rem] lg:text-[5.5rem]">
              {renderHeroTitle(homeHero.title, homeHero.highlight)}
            </h1>
            <div className="animate-fade-up mt-8 flex flex-col gap-4 opacity-0 [animation-delay:200ms] sm:flex-row">
              {homepageCtas.map(cta => (
                <Link key={cta.label} to={cta.to} className={cta.className}>
                  {cta.label}
                </Link>
              ))}
            </div>
            <p className="animate-fade-up mt-6 max-w-3xl text-[1rem] leading-7 text-ink/66 opacity-0 [animation-delay:240ms] sm:mt-7 sm:text-[1.08rem] sm:leading-8">
              {homeHero.description}
            </p>
          </div>

          <div className="animate-fade-up opacity-0 [animation-delay:420ms]">
            <div className="surface-panel relative rounded-[34px] p-6">
              <div className="absolute right-6 top-6 rounded-full border border-warmbrown/12 bg-warmbrown-pale/28 px-3 py-1 text-[0.66rem] uppercase tracking-[0.18em] text-warmbrown">
                Editorial polish
              </div>
              <div className="grid gap-5 pt-14">
                {[
                  ['Custom coded', 'No templates. Every layout is shaped around your business.'],
                  ['Professional pacing', 'Typography, spacing, and hierarchy tuned to feel premium.'],
                  ['Ready to launch', 'Structured, mobile-responsive, and built for modern trust signals.'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[24px] border border-warmbrown/10 bg-softwhite/70 p-5">
                    <div className="text-[0.68rem] uppercase tracking-[0.2em] text-warmbrown">{label}</div>
                    <p className="mt-3 text-[0.96rem] leading-7 text-ink/66">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-16 text-softwhite sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <h2 className="text-balance max-w-xl font-display text-[2.2rem] leading-[1] sm:text-[3.4rem]">
              Design-first development that feels refined and performs.
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-8">
              {[
                ['100%', 'Custom-built'],
                ['3', 'Core packages'],
                ['50%', 'Deposit to book'],
                ['3 mo', 'Free support'],
              ].map(([value, label]) => (
                <div key={label} className="border-t border-softwhite/15 pt-4">
                  <div className="font-display text-[2.6rem] leading-none text-softwhite">{value}</div>
                  <div className="mt-2 text-[0.78rem] uppercase tracking-[0.18em] text-softwhite/45">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="self-end text-[1rem] leading-8 text-softwhite/60">
            Every package includes a Figma mockup before development begins, responsive layouts across devices, hosting and deployment, and three months of minor post-launch support.
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            label="Studio Overview"
            title="One studio, three clear places to begin."
            copy="Explore the services, view the portfolio, or get in touch when you are ready to move forward."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Services',
                copy: 'See the packages, pricing, inclusions, add-ons, and FAQs in one place.',
                cta: 'View Services',
                to: '/services',
              },
              {
                title: 'Portfolio',
                copy: 'Browse the studio work and see how ACE Web Studio presents real businesses online.',
                cta: 'View Portfolio',
                to: '/portfolio',
              },
              {
                title: 'Contact',
                copy: 'Reach out directly if you have questions, want advice, or need help choosing the right package.',
                cta: 'Contact Us',
                to: '/contact',
              },
            ].map(item => (
              <article
                key={item.title}
                className="group rounded-[30px] border border-warmbrown/12 bg-softwhite p-8 text-ink shadow-[0_24px_56px_rgba(17,17,16,0.06)] transition duration-500 hover:-translate-y-1.5"
              >
                <div className="text-[0.74rem] uppercase tracking-[0.22em] text-warmbrown">
                  ACE Web Studio
                </div>
                <h3 className="mt-8 font-display text-[2.3rem] leading-none">{item.title}</h3>
                <p className="mt-5 text-[0.97rem] leading-8 text-ink/64">
                  {item.copy}
                </p>
                <Link
                  to={item.to}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-4 text-center text-[0.75rem] font-medium uppercase tracking-[0.18em] text-softwhite transition hover:-translate-y-0.5 hover:bg-warmbrown"
                >
                  {item.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-16 text-center text-ink sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-[34px] border border-warmbrown-pale bg-softwhite px-6 py-12 shadow-[0_28px_70px_rgba(20,16,13,0.08)] sm:px-10">
          <h2 className="text-balance font-display text-[2.15rem] leading-[1] sm:text-[3.6rem]">
            Ready for a website that looks as established as your business deserves?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1rem] leading-8 text-ink/66">
            Secure your project with a 50% deposit upfront, then pay the remaining 50% on completion once you are happy with the final result.
          </p>
          <div className="mt-10">
            <Link
              to="/services"
              className="inline-flex rounded-full bg-ink px-8 py-4 text-[0.76rem] font-medium uppercase tracking-[0.2em] text-softwhite transition hover:-translate-y-0.5 hover:bg-warmbrown"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
