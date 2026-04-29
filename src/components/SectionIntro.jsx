export default function SectionIntro({ label, title, copy, align = 'left' }) {
  const centered = align === 'center'

  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <div className={`mb-5 flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.26em] text-warmbrown ${centered ? 'justify-center' : ''}`}>
        <span className="h-px w-8 bg-warmbrown/70" />
        <span>{label}</span>
      </div>
      <h2 className="font-display text-[2.2rem] leading-[0.98] text-ink sm:text-[3rem] md:text-[3.35rem]">
        {title}
      </h2>
      {copy ? (
        <p className={`mt-5 text-[1rem] leading-8 text-ink/68 sm:text-[1.05rem] ${centered ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>
          {copy}
        </p>
      ) : null}
    </div>
  )
}
