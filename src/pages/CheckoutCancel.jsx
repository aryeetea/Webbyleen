import { Link, useSearchParams } from 'react-router-dom'
import SectionIntro from '../components/SectionIntro'

export default function CheckoutCancel() {
  const [searchParams] = useSearchParams()
  const selectedPackage = searchParams.get('package') || ''

  return (
    <>
      <section className="relative overflow-hidden px-5 pb-20 pt-36 sm:px-6 sm:pt-40">
        <div className="absolute inset-0 bg-cream" />
        <div className="relative mx-auto max-w-6xl">
          <SectionIntro
            label="Checkout Paused"
            title="Your payment was not completed."
            copy="No worries. Your order was not finalized, and you can return to checkout whenever you are ready."
          />
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-[30px] border border-warmbrown/12 bg-softwhite p-8 text-center shadow-[0_24px_56px_rgba(17,17,16,0.06)]">
          <h2 className="font-display text-[2.5rem] text-ink">Want to continue your order?</h2>
          <p className="mt-5 text-[1rem] leading-8 text-ink/65">
            Head back to services to review the packages again, then return here when you are ready to finish the secure payment.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to={selectedPackage ? `/services?package=${selectedPackage}` : '/services'}
              className="btn-pill btn-pill-primary"
            >
              Return to Services
            </Link>
            <Link
              to="/contact"
              className="btn-pill btn-pill-outline"
            >
              Contact Instead
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
