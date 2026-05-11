import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import FaqAccordion from '../components/FaqAccordion'
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
  ['Social media icons', 'Included', 'Included', 'Included'],
  ['Content upload', 'Included', 'Included', 'Included'],
  ['Speed optimization', 'Included', 'Included', 'Included'],
  ['Revision rounds', '2', '3', '5'],
]

const BASE_PRICES = { basic: 150, standard: 300, premium: 550 }
const RUSH_PRICES = { basic: 40, standard: 60, premium: 100 }
const CONTENT_UPLOAD_INCLUDED = new Set(['basic', 'standard', 'premium'])

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function AccordionPanel({ open, children }) {
  return (
    <div
      className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}

function AddonRow({
  title,
  priceLabel,
  note,
  open,
  onToggle,
  children,
  active = false,
  disabled = false,
}) {
  return (
    <div
      className={`rounded-[24px] border transition ${
        active || open
          ? 'border-ink bg-softwhite shadow-[0_18px_36px_rgba(26,26,26,0.05)]'
          : 'border-warmbrown-pale bg-cream'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div>
          <div className="text-[0.98rem] text-ink">{title}</div>
          {note ? <div className="mt-1 text-sm text-ink/56">{note}</div> : null}
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${disabled ? 'text-ink/38' : 'text-warmbrown'}`}>{priceLabel}</span>
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full border text-lg transition ${
              open ? 'border-ink bg-ink text-softwhite' : 'border-warmbrown-pale text-warmbrown'
            }`}
          >
            {open ? '−' : '+'}
          </span>
        </div>
      </button>
      <AccordionPanel open={open}>
        <div className="border-t border-warmbrown-pale/70 px-5 pb-5 pt-4">
          {children}
        </div>
      </AccordionPanel>
    </div>
  )
}

export default function Services() {
  const { content } = useSiteContent()
  const { packages, settings } = content
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPackage = searchParams.get('package')
  const defaultPackage = BASE_PRICES[initialPackage] ? initialPackage : 'basic'

  const [custPkg, setCustPkg] = useState(defaultPackage)
  const [customizerOpen, setCustomizerOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [openAddon, setOpenAddon] = useState('')
  const [extraPages, setExtraPages] = useState(0)
  const [ecommerce, setEcommerce] = useState(false)
  const [logoDesign, setLogoDesign] = useState(false)
  const [rushDelivery, setRushDelivery] = useState(false)
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(false)
  const [contentUpload, setContentUpload] = useState(false)

  function handlePkgSelect(key) {
    setCustPkg(key)
    setSearchParams({ package: key })
    setCustomizerOpen(true)
    setContentUpload(false)
  }

  function toggleAddon(key) {
    setOpenAddon(current => (current === key ? '' : key))
  }

  const extraPagesSubtotal = Math.max(0, extraPages) * 50
  const ecommercePrice = ecommerce ? 150 : 0
  const logoPrice = logoDesign ? 120 : 0
  const rushPrice = rushDelivery ? RUSH_PRICES[custPkg] : 0
  const contentUploadPrice = 0
  const basePrice = BASE_PRICES[custPkg]
  const total = basePrice + extraPagesSubtotal + ecommercePrice + logoPrice + rushPrice + contentUploadPrice
  const packageLabel = custPkg.charAt(0).toUpperCase() + custPkg.slice(1)

  const summaryLines = useMemo(() => {
    const lines = [
      'Configured order',
      `Package: ${packageLabel} — ${formatCurrency(basePrice)}`,
    ]

    if (extraPages > 0) lines.push(`Additional pages: ${extraPages} — ${formatCurrency(extraPagesSubtotal)}`)
    if (ecommerce) lines.push('E-commerce functionality — $150')
    if (logoDesign) lines.push('Logo design — $120')
    if (rushDelivery) lines.push(`Rush delivery — ${formatCurrency(rushPrice)}`)
    if (monthlyMaintenance) lines.push('Monthly maintenance — $60/month after free support')

    lines.push(`Final total: ${formatCurrency(total)}${monthlyMaintenance ? ' + $60/month ongoing' : ''}`)
    return lines.join('\n')
  }, [basePrice, contentUploadPrice, ecommerce, extraPages, extraPagesSubtotal, logoDesign, monthlyMaintenance, packageLabel, rushDelivery, rushPrice, total])

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
        <div className="absolute inset-0 bg-cream" />
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
                className={`btn-pill mt-8 w-full ${
                  pkg.featured
                    ? 'bg-softwhite text-ink shadow-[0_16px_30px_rgba(250,247,243,0.12)] hover:bg-warmbrown hover:text-softwhite'
                    : 'btn-pill-primary'
                }`}
              >
                Order Now
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="text-[0.72rem] uppercase tracking-[0.24em] text-warmbrown">Custom Order</div>
            <h2 className="mt-5 font-display text-[2.3rem] leading-none text-ink sm:text-[3rem]">
              Customize your order
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-8 text-ink/66">
              Choose your package first, then expand the customizer to build out your project and see the total update live.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-[30px] border border-warmbrown-pale bg-softwhite p-8 shadow-[0_24px_56px_rgba(26,26,26,0.06)] sm:p-10">
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

              <div className="mt-10 rounded-[26px] border border-warmbrown-pale bg-cream/70">
                <button
                  type="button"
                  onClick={() => setCustomizerOpen(current => !current)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  aria-expanded={customizerOpen}
                >
                  <div>
                    <div className="text-[0.72rem] uppercase tracking-[0.2em] text-warmbrown">Step 2</div>
                    <div className="mt-2 font-display text-[1.7rem] leading-none text-ink sm:text-[2rem]">
                      Customize Your Order
                    </div>
                  </div>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg transition ${customizerOpen ? 'border-ink bg-ink text-softwhite' : 'border-warmbrown-pale text-warmbrown'}`}>
                    {customizerOpen ? '−' : '+'}
                  </span>
                </button>

                <AccordionPanel open={customizerOpen}>
                  <div className="border-t border-warmbrown-pale px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
                    <div className="grid gap-3">
                      <AddonRow
                        title="Additional pages"
                        priceLabel="$50 per page"
                        note="Add as many extra pages as you need."
                        open={openAddon === 'additional-pages'}
                        onToggle={() => toggleAddon('additional-pages')}
                        active={extraPages > 0}
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <p className="max-w-lg text-sm leading-7 text-ink/62">
                            Use the buttons or type any number of extra pages. There is no maximum.
                          </p>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setExtraPages(current => Math.max(0, current - 1))}
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-warmbrown-pale text-lg text-ink transition hover:border-ink"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              min="0"
                              value={extraPages}
                              onChange={event => setExtraPages(Math.max(0, Number.parseInt(event.target.value, 10) || 0))}
                              className="w-20 rounded-[14px] border border-warmbrown-pale bg-softwhite px-3 py-2 text-center text-[1rem] text-ink outline-none transition focus:border-warmbrown"
                            />
                            <button
                              type="button"
                              onClick={() => setExtraPages(current => current + 1)}
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-warmbrown-pale text-lg text-ink transition hover:border-ink"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </AddonRow>

                      <AddonRow
                        title="E-commerce functionality"
                        priceLabel="$150"
                        note="Includes product pages, cart, and checkout setup."
                        open={openAddon === 'ecommerce'}
                        onToggle={() => toggleAddon('ecommerce')}
                        active={ecommerce}
                      >
                        <label className="flex items-center justify-between gap-4">
                          <span className="text-sm leading-7 text-ink/62">
                            Add selling functionality to your site with a complete purchase flow.
                          </span>
                          <input
                            type="checkbox"
                            checked={ecommerce}
                            onChange={event => setEcommerce(event.target.checked)}
                            className="h-5 w-5 accent-[var(--color-ink)]"
                          />
                        </label>
                      </AddonRow>

                      <AddonRow
                        title="Logo design"
                        priceLabel="$120"
                        note="Includes 2 concepts, 1 revision, PNG and SVG files."
                        open={openAddon === 'logo-design'}
                        onToggle={() => toggleAddon('logo-design')}
                        active={logoDesign}
                      >
                        <label className="flex items-center justify-between gap-4">
                          <span className="text-sm leading-7 text-ink/62">
                            Add logo creation if you need a brand mark designed alongside the website.
                          </span>
                          <input
                            type="checkbox"
                            checked={logoDesign}
                            onChange={event => setLogoDesign(event.target.checked)}
                            className="h-5 w-5 accent-[var(--color-ink)]"
                          />
                        </label>
                      </AddonRow>

                      <AddonRow
                        title="Rush delivery"
                        priceLabel={formatCurrency(RUSH_PRICES[custPkg])}
                        note="Delivery time is cut in half."
                        open={openAddon === 'rush-delivery'}
                        onToggle={() => toggleAddon('rush-delivery')}
                        active={rushDelivery}
                      >
                        <label className="flex items-center justify-between gap-4">
                          <span className="text-sm leading-7 text-ink/62">
                            Subject to availability. We prioritize your project and compress the delivery timeline.
                          </span>
                          <input
                            type="checkbox"
                            checked={rushDelivery}
                            onChange={event => setRushDelivery(event.target.checked)}
                            className="h-5 w-5 accent-[var(--color-ink)]"
                          />
                        </label>
                      </AddonRow>

                      <AddonRow
                        title="Monthly maintenance"
                        priceLabel="$60/month"
                        note="Up to 3 small changes per month, starts after the free 3 month support period ends."
                        open={openAddon === 'monthly-maintenance'}
                        onToggle={() => toggleAddon('monthly-maintenance')}
                        active={monthlyMaintenance}
                      >
                        <label className="flex items-center justify-between gap-4">
                          <span className="text-sm leading-7 text-ink/62">
                            Keep the site updated after launch with light ongoing support once the free period ends.
                          </span>
                          <input
                            type="checkbox"
                            checked={monthlyMaintenance}
                            onChange={event => setMonthlyMaintenance(event.target.checked)}
                            className="h-5 w-5 accent-[var(--color-ink)]"
                          />
                        </label>
                      </AddonRow>

                      <AddonRow
                        title="Content upload"
                        priceLabel="Included"
                        note="We upload your text, images and brand assets for you. This is included in every package."
                        open={openAddon === 'content-upload'}
                        onToggle={() => toggleAddon('content-upload')}
                        active={false}
                        disabled
                      >
                        <div className="text-sm leading-7 text-ink/62">
                          No extra selection is needed here because content upload is already part of the {packageLabel} package.
                        </div>
                      </AddonRow>
                    </div>
                  </div>
                </AccordionPanel>
              </div>
            </div>

            <aside className="rounded-[30px] border border-ink bg-ink p-8 text-softwhite shadow-[0_24px_56px_rgba(26,26,26,0.12)] lg:sticky lg:top-28">
              <div className="text-[0.72rem] uppercase tracking-[0.24em] text-warmbrown-light">Live Order Summary</div>
              <h3 className="mt-4 font-display text-[2.1rem] leading-none sm:text-[2.4rem]">
                {packageLabel}
              </h3>

              <div className="mt-8 grid gap-4 rounded-[24px] border border-softwhite/10 bg-softwhite/6 p-5">
                <div className="flex items-center justify-between gap-4 text-[0.96rem] text-softwhite/78">
                  <span>Selected package</span>
                  <span>{formatCurrency(basePrice)}</span>
                </div>
                {extraPages > 0 && (
                  <div className="flex items-center justify-between gap-4 text-[0.96rem] text-softwhite/78">
                    <span>Additional pages ({extraPages})</span>
                    <span>{formatCurrency(extraPagesSubtotal)}</span>
                  </div>
                )}
                {ecommerce && (
                  <div className="flex items-center justify-between gap-4 text-[0.96rem] text-softwhite/78">
                    <span>E-commerce functionality</span>
                    <span>$150</span>
                  </div>
                )}
                {logoDesign && (
                  <div className="flex items-center justify-between gap-4 text-[0.96rem] text-softwhite/78">
                    <span>Logo design</span>
                    <span>$120</span>
                  </div>
                )}
                {rushDelivery && (
                  <div className="flex items-center justify-between gap-4 text-[0.96rem] text-softwhite/78">
                    <span>Rush delivery</span>
                    <span>{formatCurrency(rushPrice)}</span>
                  </div>
                )}
                {monthlyMaintenance && (
                  <div className="flex items-center justify-between gap-4 text-[0.96rem] text-softwhite/62">
                    <span>Monthly maintenance</span>
                    <span>$60/month</span>
                  </div>
                )}
                <div className="border-t border-softwhite/10 pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <span className="font-display text-[1.5rem] text-softwhite">Final total</span>
                    <span className="font-display text-[2.2rem] leading-none text-warmbrown-light">{formatCurrency(total)}</span>
                  </div>
                  {monthlyMaintenance ? (
                    <div className="mt-2 text-right text-sm text-softwhite/55">
                      + $60/month after the free 3 month support period
                    </div>
                  ) : null}
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-softwhite/58">
                This summary is pre-filled into the contact form so we can review the exact package and add-ons you selected.
              </p>

              <Link
                to={`/contact?summary=${encodeURIComponent(summaryLines)}`}
                className="btn-pill mt-8 w-full bg-softwhite text-ink shadow-[0_16px_30px_rgba(250,247,243,0.12)] hover:bg-warmbrown hover:text-softwhite"
              >
                Get Started
              </Link>
            </aside>
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

      <section className="bg-softwhite px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <SectionIntro
              label="FAQs"
              title="Questions about packages, timelines, and what is included."
              copy="Everything service-related stays here so clients can compare offers and get answers in one place."
            />
          </div>
          <FaqAccordion items={content.faqs} openIndex={openFaq} onToggle={setOpenFaq} />
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
              className="btn-pill btn-pill-primary"
            >
              Start Checkout
            </Link>
            <Link
              to="/contact"
              className="btn-pill btn-pill-outline"
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
