import { Link } from 'react-router-dom'

const team = [
  ['Aileen', 'Web Development'],
  ['Cynthia', 'UI/UX Design'],
  ['Edwina', 'Art Direction'],
]

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
          <div className="surface-subtle rounded-[30px] px-6 py-6 sm:px-8 sm:py-8">
            <div className="grid gap-3 sm:grid-cols-3">
              {team.map(([name, role]) => (
                <div key={name} className="rounded-[24px] border border-warmbrown/10 bg-softwhite/86 px-4 py-5 text-center shadow-[0_16px_30px_rgba(17,17,16,0.04)]">
                  <div className="font-display text-[1.8rem] leading-none text-ink">{name}</div>
                  <div className="mt-2 text-[0.72rem] uppercase tracking-[0.16em] text-ink/55">{role}</div>
                </div>
              ))}
            </div>

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
