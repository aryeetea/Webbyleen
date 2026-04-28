import { useState } from 'react'

const faqs = [
  { q: 'How long does a website take?', a: 'Basic sites take 3–5 days. Standard packages take 7–14 days. Premium builds are 2–4 weeks. Rush delivery is available as an add-on for all packages.' },
  { q: 'Do you offer revisions?', a: 'Yes — Basic includes 2, Standard includes 3, and Premium includes 5 revision rounds. Additional rounds can be purchased as an add-on.' },
  { q: 'Do I need to provide content?', a: 'For the best results, yes. Providing your own copy, images, and brand assets ensures the site is truly yours. Placeholder content can be used initially.' },
  { q: 'How does payment work?', a: 'A 50% deposit is required to begin. The remaining 50% is due upon completion before final files are handed over. Payments accepted via Fiverr, PayPal, or bank transfer.' },
  { q: 'What do you need from me to get started?', a: 'Just a brief description of your project, your budget range, and any inspiration or references you love. We\'ll take it from there.' },
  { q: 'Can you host my website too?', a: 'I deliver clean, deployment-ready files. I can guide you through hosting on Netlify, Vercel, or any provider — it\'s simpler than you think and usually free.' },
]

const inputStyle = {
  width: '100%',
  background: 'var(--white)',
  border: '1px solid var(--brown-pale)',
  borderRadius: 2,
  padding: '13px 16px',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 15,
  color: 'var(--black)',
  outline: 'none',
  transition: 'border-color 0.2s',
}

const labelStyle = {
  display: 'block',
  fontSize: 12,
  letterSpacing: '0.08em',
  color: 'var(--gray)',
  textTransform: 'uppercase',
  marginBottom: 8,
}

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    package: '',
    message: '',
  })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setForm({ firstName: '', lastName: '', email: '', package: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <>
      {/* HERO */}
      <div style={{ padding: '140px 5% 80px', background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, var(--brown-pale) 0%, transparent 70%)', opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-label fade-in delay-1">Get in Touch</div>
          <h1 className="fade-in delay-2" style={{ fontSize: 'clamp(40px,5.5vw,76px)', maxWidth: 680, lineHeight: 1.08, marginBottom: 28 }}>
            Tell me about<br />
            <em style={{ fontStyle: 'italic', color: 'var(--brown)' }}>your project</em>
          </h1>
          <p className="fade-in delay-3" style={{ fontSize: 18, color: 'var(--gray)', maxWidth: 520, fontWeight: 300, lineHeight: 1.85 }}>
            Whether you have a clear brief or just an idea, I'd love to hear from you. Fill in the form and I'll get back to you within 24 hours.
          </p>
        </div>
      </div>

      {/* CONTACT LAYOUT */}
      <section style={{ padding: '100px 5%', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>

          {/* LEFT — Info */}
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px,3vw,40px)', color: 'var(--black)', lineHeight: 1.2, marginBottom: 20 }}>
              Let's build something great together
            </h2>
            <p style={{ fontSize: 16, color: 'var(--gray)', lineHeight: 1.85, fontWeight: 300, marginBottom: 36 }}>
              I work with brands of all sizes — from solo freelancers to growing businesses. Every project gets my full attention and care.
            </p>

            {/* Contact details */}
            {[
              { icon: '✉', label: 'Email', value: 'hello@webbyleen.com' },
              { icon: '⏱', label: 'Response Time', value: 'Within 24 hours' },
              { icon: '🌍', label: 'Availability', value: 'Open to clients worldwide' },
            ].map(d => (
              <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, padding: '16px 20px', background: 'var(--cream)', border: '1px solid var(--brown-pale)', borderRadius: 4 }}>
                <div style={{ width: 40, height: 40, background: 'var(--brown-pale)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                  {d.icon}
                </div>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: 3 }}>{d.label}</div>
                  <div style={{ fontSize: 14, color: 'var(--black)', fontWeight: 400 }}>{d.value}</div>
                </div>
              </div>
            ))}

            {/* Fiverr button */}
            <a
              href="https://fiverr.com/yourprofile"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#1DBF73', color: '#fff', padding: '14px 24px', borderRadius: 2, fontSize: 14, fontWeight: 500, marginTop: 24, transition: 'opacity 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-1.44c-1.594 0-2.053-.576-2.053-2.136V7.19h3.49V5.067h-3.49V2h-2.7v3.067H7.044c-.462 0-.854.067-1.144.362-.17.17-.29.385-.383.654-.08.24-.08.462-.08.462V5.067h-2.7v1.984H4.87c.504 0 .708.338.708.732v1.636H2v12.511h2.7v-9.85h3.49v9.85h2.7v-9.85h3.49v9.85h2.7v-9.85h2.03c.504 0 .708.338.708.732v9.118h2.7v-9.85h1.44v-1.982z"/>
              </svg>
              Find Me on Fiverr
            </a>
          </div>

          {/* RIGHT — Form */}
          <div style={{ background: 'var(--cream)', border: '1px solid var(--brown-pale)', borderRadius: 4, padding: '44px 40px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 64, color: 'var(--brown)', marginBottom: 16, lineHeight: 1 }}>✓</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: 'var(--black)', marginBottom: 12 }}>Message sent!</h3>
                <p style={{ fontSize: 15, color: 'var(--gray)', fontWeight: 300, lineHeight: 1.7 }}>
                  Thanks for reaching out. I'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Name row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  {[['firstName', 'First Name', 'Jane'], ['lastName', 'Last Name', 'Smith']].map(([name, label, ph]) => (
                    <div key={name}>
                      <label style={labelStyle}>{label}</label>
                      <input
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={ph}
                        required
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'var(--brown)'}
                        onBlur={e => e.target.style.borderColor = 'var(--brown-pale)'}
                      />
                    </div>
                  ))}
                </div>

                {/* Email */}
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    required
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--brown)'}
                    onBlur={e => e.target.style.borderColor = 'var(--brown-pale)'}
                  />
                </div>

                {/* Package */}
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Package Interest</label>
                  <select
                    name="package"
                    value={form.package}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = 'var(--brown)'}
                    onBlur={e => e.target.style.borderColor = 'var(--brown-pale)'}
                  >
                    <option value="">Select a package...</option>
                    <option>Basic — $150–$250</option>
                    <option>Standard — $400–$700</option>
                    <option>Premium — $800–$1300</option>
                    <option>Not sure yet</option>
                  </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Project Details</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project — what you do, what you need, and any ideas you have..."
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 130 }}
                    onFocus={e => e.target.style.borderColor = 'var(--brown)'}
                    onBlur={e => e.target.style.borderColor = 'var(--brown-pale)'}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  style={{ width: '100%', background: 'var(--black)', color: '#fff', border: 'none', padding: 16, borderRadius: 2, fontFamily: "'DM Sans', sans-serif", fontSize: 15, letterSpacing: '0.06em', cursor: 'pointer', transition: 'background 0.25s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--brown)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--black)'}
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-label">Before You Reach Out</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(30px,4vw,50px)', color: 'var(--black)', marginBottom: 16 }}>
            Frequently asked questions
          </h2>
          <p style={{ fontSize: 16, color: 'var(--gray)', fontWeight: 300, maxWidth: 520, marginBottom: 56, lineHeight: 1.8 }}>
            Here are answers to the questions I get asked most often.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '0 60px' }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--brown-pale)' }}>
                <div
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 0', cursor: 'pointer', gap: 20 }}
                >
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: 'var(--black)', fontWeight: 400 }}>
                    {f.q}
                  </h3>
                  <span style={{
                    width: 28, height: 28,
                    border: '1px solid var(--brown-pale)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16,
                    color: openFaq === i ? '#fff' : 'var(--brown)',
                    background: openFaq === i ? 'var(--black)' : 'transparent',
                    flexShrink: 0,
                    transition: 'all 0.2s',
                  }}>
                    {openFaq === i ? '−' : '+'}
                  </span>
                </div>
                {openFaq === i && (
                  <p style={{ fontSize: 15, color: 'var(--gray)', fontWeight: 300, lineHeight: 1.8, paddingBottom: 24 }}>
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <div style={{ background: 'var(--black)', padding: '80px 5%', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,4vw,52px)', color: '#fff', marginBottom: 20, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.15 }}>
          Still not sure? Let's just talk.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, marginBottom: 40, fontWeight: 300 }}>
          No commitment, no pressure — just a conversation about your project.
        </p>
        <a
          href="https://fiverr.com/yourprofile"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#1DBF73', color: '#fff', padding: '15px 32px', borderRadius: 2, fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Message Me on Fiverr
        </a>
      </div>
    </>
  )
}
