export default function FaqAccordion({ items, openIndex, onToggle, compact = false }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-warmbrown/12 bg-softwhite/92 shadow-[0_24px_56px_rgba(17,17,16,0.06)] backdrop-blur-sm">
      {items.map((item, index) => {
        const active = openIndex === index

        return (
          <div key={item.q} className="border-b border-warmbrown-pale/60 px-5 last:border-b-0 sm:px-7">
            <button
              type="button"
              onClick={() => onToggle(active ? -1 : index)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className={`font-display text-[1.35rem] leading-[1.15] text-ink sm:text-[1.55rem] ${compact ? 'sm:text-[1.35rem]' : ''}`}>
                {item.q}
              </span>
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg transition-all ${
                  active
                    ? 'border-ink bg-ink text-softwhite shadow-[0_12px_24px_rgba(23,20,17,0.18)]'
                    : 'border-warmbrown/14 bg-warmbrown-pale/20 text-warmbrown'
                }`}
              >
                {active ? '−' : '+'}
              </span>
            </button>
            {active && (
              <p className="max-w-3xl pb-6 text-[0.98rem] leading-8 text-ink/65 animate-fade-up">
                {item.a}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
