import { useState } from 'react'
import SectionIntro from '../components/SectionIntro'

const filters = ['All', 'Basic', 'Standard', 'Premium']

const projects = [
  ['Maison Lune', 'Fashion', 'Basic', 'from-[#221b17] via-[#8B6F4E] to-[#C4A882]'],
  ['North Atelier', 'Interior', 'Standard', 'from-[#111110] via-[#40352d] to-[#b28f6b]'],
  ['Aster Clinic', 'Wellness', 'Standard', 'from-[#201e1c] via-[#756150] to-[#EDE5D8]'],
  ['Marlow House', 'Hospitality', 'Premium', 'from-[#34261f] via-[#8f6e56] to-[#dec8ad]'],
  ['Rive Studio', 'Creative', 'Basic', 'from-[#2b2421] via-[#6f5947] to-[#cfb08f]'],
  ['Common Thread', 'Retail', 'Premium', 'from-[#1b1a19] via-[#51453b] to-[#c49f77]'],
  ['Harbor Legal', 'Professional', 'Standard', 'from-[#0f0f0f] via-[#2c2a29] to-[#91816d]'],
  ['Solenne Skin', 'Beauty', 'Premium', 'from-[#36261f] via-[#8d6851] to-[#edd9c2]'],
  ['Verve Finance', 'Business', 'Basic', 'from-[#181716] via-[#4a4037] to-[#b69979]'],
].map(([name, tag, type, gradient]) => ({ name, tag, type, gradient }))

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const visible = active === 'All' ? projects : projects.filter(project => project.type === active)

  return (
    <>
      <section className="relative overflow-hidden px-5 pb-20 pt-36 sm:px-6 sm:pt-40">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_right,rgba(196,168,130,0.18),transparent_34%),radial-gradient(circle_at_left,rgba(139,111,78,0.10),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl">
          <SectionIntro
            label="Portfolio"
            title="A portfolio of polished concepts and premium directions."
            copy="Every card here is designed to reflect the kind of composure, clarity, and confidence a modern design agency should deliver."
          />
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-wrap gap-3">
            {filters.map(filter => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`rounded-full px-5 py-3 text-[0.73rem] font-medium uppercase tracking-[0.18em] transition ${
                  active === filter
                    ? 'bg-ink text-softwhite'
                    : 'border border-warmbrown-pale bg-softwhite text-ink/58 hover:text-ink'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map(project => (
              <article
                key={project.name}
                className="group overflow-hidden rounded-[4px] border border-warmbrown-pale bg-softwhite shadow-[0_16px_34px_rgba(17,17,16,0.05)] transition duration-300 hover:-translate-y-1"
              >
                <div className={`flex h-80 items-end bg-gradient-to-br ${project.gradient} p-6`}>
                  <div className="flex w-full items-end justify-between gap-4">
                    <span className="rounded-full border border-softwhite/20 bg-softwhite/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-softwhite/85 backdrop-blur-sm">
                      {project.tag}
                    </span>
                    <span className="text-[0.68rem] uppercase tracking-[0.2em] text-softwhite/70">{project.type}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[1.8rem] text-ink">{project.name}</h3>
                  <p className="mt-3 text-[0.96rem] leading-8 text-ink/64">
                    A refined brand-forward direction with strong hierarchy, quiet confidence, and conversion-minded structure.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
