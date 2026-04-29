export default function PortraitCard() {
  return (
    <div className="relative mx-auto w-full max-w-[430px]">
      <div className="animate-float-soft absolute -bottom-6 -left-5 h-[62%] w-[58%] rounded-[32px] bg-[radial-gradient(circle,rgba(196,168,130,0.28),transparent_68%)] blur-xl" />

      <div className="relative overflow-hidden rounded-[4px] border border-warmbrown-pale/70 bg-ink shadow-[0_30px_70px_rgba(17,17,16,0.18)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,168,130,0.22),transparent_38%),linear-gradient(180deg,rgba(17,17,16,0.1),rgba(17,17,16,0.85))]" />

        <div className="relative grid h-full min-h-[540px] grid-cols-[1fr_0.84fr] gap-4 p-4">
          <div className="overflow-hidden rounded-[4px] shadow-[0_18px_40px_rgba(17,17,16,0.18)]">
            <img
              src="/aileen-team.jpeg"
              alt="Aileen Aryeetey"
              className="h-full w-full object-cover object-[center_18%]"
            />
          </div>

          <div className="grid gap-4">
            <div className="overflow-hidden rounded-[4px] shadow-[0_18px_40px_rgba(17,17,16,0.18)]">
              <img
                src="/cynthia-team.jpeg"
                alt="Cynthia Owusu-Forkuo"
                className="h-full w-full object-cover object-[center_18%]"
              />
            </div>

            <div className="flex flex-col justify-between rounded-[4px] border border-softwhite/10 bg-softwhite/8 p-5 backdrop-blur-sm">
              <div className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-softwhite/58">
                Design + Build
              </div>
              <div className="font-display text-[2rem] leading-[0.92] text-softwhite">
                Small Team.
                <br />
                Sharp Taste.
              </div>
              <p className="mt-4 text-[0.92rem] leading-7 text-softwhite/70">
                Creative thinking, clear systems, and custom execution.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 max-w-[250px] rounded-[4px] border border-softwhite/10 bg-ink/55 px-4 py-4 backdrop-blur-md">
          <div className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-softwhite/60">
            Meet Us
          </div>
          <div className="mt-2 font-display text-[1.45rem] leading-tight text-softwhite">
            Professional, refined, and still full of life.
          </div>
        </div>
      </div>
    </div>
  )
}
