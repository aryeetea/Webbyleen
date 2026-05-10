import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionIntro from '../components/SectionIntro'
import { useSiteContent } from '../hooks/useSiteContent'

const comparisons = [
  ['Pages', '1', '3 to 5', '6 to 10'],
  ['Price', '$150', '$300', '$550'],
  ['Delivery', '2 weeks', '3 weeks', '4 to 5 weeks'],
  ['Mobile responsive', 'Included', 'Included', 'Included'],
  ['Contact form', 'Included', 'Included', 'Included'],
  ['Design mockup first', 'Included', 'Included', 'Included'],
  ['Hosting & deployment', 'Included', 'Included', 'Included'],
  ['3 months free support', 'Included', 'Included', 'Included'],
  ['Social media icons', '—', 'Included', 'Included'],
  ['Content upload', '—', 'Included', 'Included'],
  ['Speed optimization', '—', '—', 'Included'],
  ['Revision rounds', '2', '3', '5'],
]

const BASE_PRICES = { basic: 150, standard: 300, premium: 550 }
const RUSH_PRICES = { basic: 40, standard: 60, premium: 100 }
const CONTENT_UPLOAD_INCLUDED = new Set(['standard', 'premium'])

function AddonToggle({ checked, onChange, label, price, note }) {
  return (
    <label
      className={`flex cursor-pointer flex-col gap-3 rounded-[22px] border px-5 py-4 transition sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
        checked
          ? 'border-ink bg-softwhite'
          : 'border-warmbrown-pale bg-cream hover:border-warmbrown'
      }`}
    >
      <div className="flex gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-ink)]"
        />
        <div>
          <div className="text-[0.96rem] text-ink">{label}</div>
          {note && <div className="mt-0.5 text-sm text-ink/55">{note}</div>}
        </div>
      </div>
      <div className={`shrink-0 text-sm font-medium ${checked ? 'text-warmbrown' : 'text-ink/45'}`}>{price}</div>
    </label>
  )
}

export default function Services() {
  const { content } = useSiteContent()
  const { packages, settings } = content

  const [custPkg, setCustPkg] = useState('basic')
  const [extraPages, setExtraPages] = useState(0)
  const [ecommerce, setEcommerce] = useState(false)
  const [logoDesign, setLogoDesign] = useState(false)
  const [rushDelivery, setRushDelivery] = useState(false)
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(false)
  const [contentUpload, setContentUpload] = useState(false)

  function calcTotal() {
    let total = BASE_PRICES[custPkg]
    total += Math.max(0, extraPages) * 50
    if (ecommerce) total += 150
    if (logoDesign) total += 120
    if (rushDelivery) total += RUSH_PRICES[custPkg]
    if (contentUpload && !CONTENT_UPLOAD_INCLUDED.has(custPkg)) total += 30
    return total
  }

  function buildSummary() {
    const pkgLabel = custPkg.charAt(0).toUpperCase() + custPkg.slice(1)
    const lines = [`Package: ${pkgLabel} — $${BASE_PRICES[custPkg]}`]
    if (extraPages > 0) lines.push(`Additional pages: ${extraPages} — +$${extraPages * 50}`)
    if (ecommerce) lines.push('E-commerce functionality — +$150')
    if (logoDesign) lines.push('Logo design — +$120')
    if (rushDelivery) lines.push(`Rush delivery — +$${RUSH_PRICES[custPkg]}`)
    if (monthlyMaintenance) lines.push('Monthly maintenance — +$60/mo (after free support period)')
    if (contentUpload && !CONTENT_UPLOAD_INCLUDED.has(custPkg)) lines.push('Content upload — +$30')
    lines.push(`Estimated total: $${calcTotal()}${monthlyMaintenance ? ' + $60/mo maintenance' : ''}`)
    return lines.join('\n')
  }

  function handlePkgSelect(key) {
    setCustPkg(key)
    setContentUpload(false)
  }

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_right,rgba(201,168,124,0.22),transparent_36%),radial-gradient(circle_at_left,rgba(184,149,106,0.10),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl">
          <SectionIntro
            label="Services"
            title={settings.servicesIntro.title}
            copy={settings.servicesIntro.copy}
          />
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {packages.map(pkg => (
            <article
              key={pkg.slug}
              className={`rounded-[30px] border p-8 shadow-[0_24px_56px_rgba(26,26,26,0.06)] ${
                pkg.featured ? 'border-ink bg-ink text-softwhite' : 'border-warmbrown-pale bg-softwhite'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className={`text-[0.7rem] uppercase tracking-[0.22em] ${pkg.featured ? 'text-warmbrown-light' : 'text-warmbrown'}`}>
                    {pkg.tier}
                  </div>
                  <h2 className="text-balance mt-4 font-display text-[2rem] leading-none sm:text-[2.2rem]">{pkg.name}</h2>
                </div>
                {pkg.featured && (
                  <span className="rounded-full border border-softwhite/10 bg-softwhite/8 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-softwhite/80">
                    Recommended
                  </span>
                )}
              </div>

              <div className="mt-8 font-display text-[2.8rem] leading-none">{pkg.price}</div>
              <p className={`mt-5 text-[0.96rem] leading-8 ${pkg.featured ? 'text-softwhite/65' : 'text-ink/64'}`}>
                {pkg.who}
              </p>

              <div className={`mt-8 rounded-[22px] border px-4 py-4 text-sm uppercase tracking-[0.16em] ${
                pkg.featured ? 'border-softwhite/10 text-softwhite/75' : 'border-warmbrown-pale text-ink/58'
              }`}>
                Turnaround: {pkg.turnaround}
              </div>

              <div className="mt-8">
                <div className={`text-[0.72rem] uppercase tracking-[0.2em] ${pkg.featured ? 'text-warmbrown-light' : 'text-warmbrown'}`}>
                  Included
                </div>
                <ul className={`mt-4 grid gap-3 text-[0.95rem] leading-7 ${pkg.featured ? 'text-softwhite/78' : 'text-ink/68'}`}>
                  {pkg.includes.map(item => (
                    <li key={item} className="flex gap-3">
                      <span className={pkg.featured ? 'text-warmbrown-light' : 'text-warmbrown'}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`mt-8 rounded-[24px] px-5 py-5 ${pkg.featured ? 'bg-softwhite/6' : 'bg-cream'}`}>
                <div className={`text-[0.72rem] uppercase tracking-[0.2em] ${pkg.featured ? 'text-softwhite/58' : 'text-ink/55'}`}>
                  Add-ons
                </div>
                <div className="mt-4 grid gap-3">
                  {pkg.addons.map(addon => (
                    <div key={addon.id} className={`flex flex-col items-start gap-1 text-sm sm:flex-row sm:items-start sm:justify-between sm:gap-4 ${pkg.featured ? 'text-softwhite/72' : 'text-ink/62'}`}>
                      <span>{addon.label}</span>
                      <span className={pkg.featured ? 'text-warmbrown-light' : 'text-warmbrown'}>{addon.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={`/checkout?package=${pkg.slug}`}
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-center text-[0.75rem] font-medium uppercase tracking-[0.18em] transition hover:-translate-y-0.5 ${
                  pkg.featured
                    ? 'bg-softwhite text-ink hover:bg-warmbrown hover:text-softwhite'
                    : 'bg-ink text-softwhite hover:bg-warmbrown'
                }`}
              >
                Order {pkg.name}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Order Customizer */}
      <section className="bg-cream px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <div className="text-[0.72rem] uppercase tracking-[0.24em] text-warmbrown">Custom Order</div>
            <h2 className="mt-5 font-display text-[2.3rem] leading-none text-ink sm:text-[3rem]">
              Build your quote
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-8 text-ink/66">
              Select a package and add what you need. Your total updates as you configure.
            </p>
          </div>

          <div className="rounded-[30px] border border-warmbrown-pale bg-softwhite p-8 shadow-[0_24px_56px_rgba(26,26,26,0.06)] sm:p-10">

            {/* Step 1 — Package selector */}
            <div>
              <div className="mb-4 text-[0.72rem] uppercase tracking-[0.2em] text-warmbrown">Step 1 — Select your base package</div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { key: 'basic', num: '01', label: 'Basic', price: '$150' },
                  { key: 'standard', num: '02', label: 'Standard', price: '$300' },
                  { key: 'premium', num: '03', label: 'Premium', price: '$550' },
                ].map(option => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => handlePkgSelect(option.key)}
                    className={`rounded-[22px] border px-5 py-5 text-left transition ${
                      custPkg === option.key
                        ? 'border-ink bg-ink text-softwhite'
                        : 'border-warmbrown-pale bg-cream hover:border-warmbrown'
                    }`}
                  >
                    <div className={`text-[0.68rem] uppercase tracking-[0.18em] ${custPkg === option.key ? 'text-warmbrown-light' : 'text-warmbrown'}`}>
                      {option.num}
                    </div>
                    <div className="mt-2 font-display text-[1.4rem] leading-none">{option.label}</div>
                    <div className={`mt-1.5 text-[0.96rem] font-medium ${custPkg === option.key ? 'text-warmbrown-light' : 'text-warmbrown'}`}>
                      {option.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 — Add-ons */}
            <div className="mt-10">
              <div className="mb-4 text-[0.72rem] uppercase tracking-[0.2em] text-warmbrown">Step 2 — Optional add-ons</div>
              <div className="grid gap-3">

                {/* Additional pages — number input */}
                <div className={`flex flex-col gap-4 rounded-[22px] border px-5 py-4 transition sm:flex-row sm:items-center sm:justify-between ${
                  extraPages > 0 ? 'border-ink bg-softwhite' : 'border-warmbrown-pale bg-cream'
                }`}>
                  <div>
                    <div className="text-[0.96rem] text-ink">Additional pages</div>
                    <div className="mt-0.5 text-sm text-ink/55">$50 per extra page</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setExtraPages(p => Math.max(0, p - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-warmbrown-pale text-ink transition hover:border-ink"
                    >−</button>
                    <input
                      type="number"
                      min="0"
                      value={extraPages}
                      onChange={e => setExtraPages(Math.max(0, Number.parseInt(e.target.value, 10) || 0))}
                      className="w-12 rounded-[8px] border border-warmbrown-pale bg-softwhite px-2 py-1 text-center text-[0.96rem] text-ink outline-none transition focus:border-warmbrown"
                    />
                    <button
                      type="button"
                      onClick={() => setExtraPages(p => p + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-warmbrown-pale text-ink transition hover:border-ink"
                    >+</button>
                    {extraPages > 0 && (
                      <span className="min-w-[3rem] text-right text-sm font-medium text-warmbrown">+${extraPages * 50}</span>
                    )}
                  </div>
                </div>

                <AddonToggle
                  checked={ecommerce}
                  onChange={setEcommerce}
                  label="E-commerce functionality"
                  price="+$200"
                  note="Includes product pages, cart, and checkout setup"
                />

                <AddonToggle
                  checked={logoDesign}
                  onChange={setLogoDesign}
                  label="Logo design"
                  price="+$120"
                />

                <AddonToggle
                  checked={rushDelivery}
                  onChange={setRushDelivery}
                  label="Rush delivery"
                  price={`+$${RUSH_PRICES[custPkg]}`}
                />

                <AddonToggle
                  checked={monthlyMaintenance}
                  onChange={setMonthlyMaintenance}
                  label="Monthly maintenance"
                  price="+$80/mo"
                  note="Starts after the free 3 month support period ends"
                />

                {CONTENT_UPLOAD_INCLUDED.has(custPkg) ? (
                  <div className="flex items-center justify-between rounded-[22px] border border-warmbrown-pale/60 bg-cream/60 px-5 py-4">
                    <div>
                      <div className="text-[0.96rem] text-ink/60">Content upload</div>
                      <div className="mt-0.5 text-sm text-warmbrown">Already included in your package</div>
                    </div>
                  </div>
                ) : (
                  <AddonToggle
                    checked={contentUpload}
                    onChange={setContentUpload}
                    label="Content upload"
                    price="+$50"
                  />
                )}
              </div>
            </div>

            {/* Live total */}
            <div className="mt-10 rounded-[24px] border border-warmbrown-pale bg-cream px-6 py-6">
              <div className="mb-4 text-[0.72rem] uppercase tracking-[0.2em] text-warmbrown">Your estimate</div>
              <div className="grid gap-2">
                <div className="flex justify-between text-[0.96rem] text-ink/65">
                  <span>{custPkg.charAt(0).toUpperCase() + custPkg.slice(1)} package</span>
                  <span>${BASE_PRICES[custPkg]}</span>
                </div>
                {extraPages > 0 && (
                  <div className="flex justify-between text-[0.96rem] text-ink/65">
                    <span>Additional pages ({extraPages})</span>
                    <span>+${extraPages * 80}</span>
                  </div>
                )}
                {ecommerce && (
                  <div className="flex justify-between text-[0.96rem] text-ink/65">
                    <span>E-commerce functionality</span>
                    <span>+$200</span>
                  </div>
                )}
                {logoDesign && (
                  <div className="flex justify-between text-[0.96rem] text-ink/65">
                    <span>Logo design</span>
                    <span>+$120</span>
                  </div>
                )}
                {rushDelivery && (
                  <div className="flex justify-between text-[0.96rem] text-ink/65">
                    <span>Rush delivery</span>
                    <span>+${RUSH_PRICES[custPkg]}</span>
                  </div>
                )}
                {contentUpload && !CONTENT_UPLOAD_INCLUDED.has(custPkg) && (
                  <div className="flex justify-between text-[0.96rem] text-ink/65">
                    <span>Content upload</span>
                    <span>+$30</span>
                  </div>
                )}
                {monthlyMaintenance && (
                  <div className="flex justify-between text-[0.96rem] text-ink/55">
                    <span>Monthly maintenance (after 3 mo)</span>
                    <span>+$60/mo</span>
                  </div>
                )}
                <div className="mt-2 flex items-baseline justify-between border-t border-warmbrown-pale pt-4">
                  <span className="font-display text-[1.5rem] text-ink">Total</span>
                  <span className="font-display text-[2rem] text-warmbrown">${calcTotal()}</span>
                </div>
                {monthlyMaintenance && (
                  <div className="text-right text-sm text-ink/45">+ $60/mo after free support ends</div>
                )}
              </div>
            </div>

            {/* Get Started */}
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-7 text-ink/50">
                This is an estimate only. Final pricing is confirmed once we review your project details.
              </p>
              <Link
                to={`/contact?summary=${encodeURIComponent(buildSummary())}`}
                className="shrink-0 rounded-full bg-ink px-8 py-4 text-center text-[0.75rem] font-medium uppercase tracking-[0.18em] text-softwhite transition hover:-translate-y-0.5 hover:bg-warmbrown"
              >
                Get Started
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl rounded-[4px] border border-warmbrown-pale bg-softwhite p-8 shadow-[0_18px_40px_rgba(26,26,26,0.05)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <div className="text-[0.72rem] uppercase tracking-[0.24em] text-warmbrown">All Packages Include</div>
              <h2 className="mt-5 font-display text-[2.3rem] leading-none text-ink sm:text-[2.8rem]">
                Everything needed for a professional website launch.
              </h2>
            </div>
            <div className="grid gap-3">
              {[
                'Design mockup before any code is written',
                'Mobile responsive on every device',
                'Contact form',
                'Hosting and deployment',
                '3 months free minor support after launch',
              ].map(item => (
                <div key={item} className="rounded-[4px] border border-warmbrown-pale bg-cream px-4 py-4 text-[0.96rem] leading-7 text-ink/72">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-softwhite px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[30px] border border-warmbrown-pale shadow-[0_24px_56px_rgba(26,26,26,0.06)]">
          <div className="border-b border-warmbrown-pale bg-cream px-6 py-5 sm:px-8">
            <h2 className="font-display text-[2rem] text-ink sm:text-[2.3rem]">Package Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-warmbrown-pale bg-softwhite">
                  <th className="px-6 py-4 text-[0.7rem] uppercase tracking-[0.2em] text-ink/50 sm:px-8">Feature</th>
                  {['Basic', 'Standard', 'Premium'].map(head => (
                    <th key={head} className={`px-6 py-4 text-[0.7rem] uppercase tracking-[0.2em] sm:px-8 ${head === 'Standard' ? 'text-warmbrown' : 'text-ink/50'}`}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisons.map(row => (
                  <tr key={row[0]} className="border-b border-warmbrown-pale/80">
                    <td className="px-6 py-4 text-[0.95rem] text-ink/65 sm:px-8">{row[0]}</td>
                    <td className="px-6 py-4 text-[0.95rem] text-ink sm:px-8">{row[1]}</td>
                    <td className="px-6 py-4 text-[0.95rem] text-ink sm:px-8">{row[2]}</td>
                    <td className="px-6 py-4 text-[0.95rem] text-ink sm:px-8">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl rounded-[30px] border border-warmbrown/12 bg-cream px-6 py-14 text-center shadow-[0_24px_56px_rgba(26,26,26,0.06)] sm:px-10">
          <div className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-warmbrown">Monthly Maintenance</div>
          <h2 className="text-balance mt-5 font-display text-[2.15rem] leading-[1] text-ink sm:text-[3.1rem]">
            $60 per month after the first 3 months of free support.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1rem] leading-8 text-ink/66">
            Monthly maintenance includes up to 3 small changes per month, text updates, image swaps, minor layout tweaks, and security checks. No contracts. Cancel anytime.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/checkout"
              className="rounded-full bg-ink px-8 py-4 text-center text-[0.76rem] font-medium uppercase tracking-[0.2em] text-softwhite transition hover:-translate-y-0.5 hover:bg-warmbrown"
            >
              Start Checkout
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-ink px-8 py-4 text-center text-[0.76rem] font-medium uppercase tracking-[0.2em] text-ink transition hover:bg-ink hover:text-softwhite"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-softwhite px-4 pb-20 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-4xl rounded-[30px] border border-warmbrown/12 bg-softwhite px-6 py-14 text-center shadow-[0_24px_56px_rgba(26,26,26,0.06)] sm:px-10">
          <div className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-warmbrown">How Payment Works</div>
          <h2 className="text-balance mt-5 font-display text-[2.15rem] leading-[1] text-ink sm:text-[3.1rem]">
            50% deposit upfront. 50% on completion.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1rem] leading-8 text-ink/66">
            A 50% deposit secures your project slot and allows work to begin. The remaining 50% is due on completion when you are happy with the final result.
          </p>
        </div>
      </section>
    </>
  )
}
