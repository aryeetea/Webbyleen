import { useState } from 'react'
import { Link } from 'react-router-dom'

const projects = [
  {
    name: 'Lumora Studio',
    desc: 'Minimal editorial website for a London-based photography studio. Built to let the work breathe — generous whitespace, clean grid, and subtle hover reveals.',
    tag: 'Photography',
    type: 'Basic',
    bg: 'linear-gradient(135deg,#2C2C2A,#444441)',
    initial: 'L',
  },
  {
    name: 'Terroir Co.',
    desc: 'Landing page for an artisan coffee brand. Warm tones, confident typography, and a seamless order flow that converts visitors into customers.',
    tag: 'E-Commerce',
    type: 'Standard',
    bg: 'linear-gradient(135deg,#3B2A1A,#8B6F4E)',
    initial: 'T',
  },
  {
    name: 'Kova Legal',
    desc: 'Trust-focused site for a boutique law firm. Clean structure, authoritative feel, and strong calls to action without being cold or intimidating.',
    tag: 'Professional Services',
    type: 'Standard',
    bg: 'linear-gradient(135deg,#1a2535,#2d4a6e)',
    initial: 'K',
  },
  {
    name: 'Vera Botanicals',
    desc: 'Product showcase for a plant-based skincare brand. Soft palette, gentle motion, and a sophisticated layout that feels as refined as the products.',
    tag: 'Beauty & Wellness',
    type: 'Premium',
    bg: 'linear-gradient(135deg,#1e3a2f,#2d6644)',
    initial: 'V',
  },
  {
    name: 'Arlo Creative',
    desc: 'Portfolio site for a graphic designer. Bold hero section, smooth page transitions, and a grid layout that lets the work do the talking.',
    tag: 'Creative Portfolio',
    type: 'Basic',
    bg: 'linear-gradient(135deg,#3a1a2e,#6e2d5a)',
    initial: 'A',
  },
  {
    name: 'Maison Interiors',
    desc: 'Luxury interior design studio site. Full-bleed imagery, refined spacing, and a seamless inquiry experience built for a high-end clientele.',
    tag: 'Interior Design',
    type: 'Premium',
    bg: 'linear-gradient(135deg,#251818,#5a2d2d)',
    initial: 'M',
  },
  {
    name: 'Drift Coffee',
    desc: 'One-page site for a specialty coffee shop. Stripped back, warm, and conversion-focused — with an embedded menu and Google Maps integration.',
    tag: 'Food & Beverage',
    type: 'Basic',
    bg: 'linear-gradient(135deg,#2a1f0f,#6b4c2a)',
    initial: 'D',
  },
  {
    name: 'Nova Consulting',
    desc: 'Multi-page site for a business consulting firm. Professional, data-backed, and built to generate leads with a clear value proposition on every page.',
    tag: 'Business',
    type: 'Standard',
    bg: 'linear-gradient(135deg,#0f1f2e,#1a4060)',
    initial: 'N',
  },
  {
    name: 'Soleil Wellness',
    desc: 'Holistic wellness brand site with online booking, team profiles, and a calming aesthetic that builds trust before the first appointment.',
    tag: 'Health & Wellness',
    type: 'Premium',
    bg: 'linear-gradient(135deg,#2e1f0e,#7a5c3a)',
    initial: 'S',
  },
]

const filters = ['All', 'Basic', 'Standard', 'Premium']

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const [hovered, setHovered] = useState(null)

  const filtered = active === 'All' ? projects : projects.filter(p => p.type === active)

  return (
    <>
      {/* HERO */}
      <div style={{ padding: '140px 5% 80px', background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', right: '-8%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, var(--brown-pale) 0%, transparent 70%)', opacity: 0.4, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-label fade-in delay-1">Portfolio</div>
          <h1 className="fade-in delay-2" style={{ fontSize: 'clamp(40px,5.5vw,76px)', maxWidth: 680, lineHeight: 1.08, marginBottom: 28 }}>
            Work I'm<br />
            <em style={{ fontStyle: 'italic', color: 'var(--brown)' }}>genuinely proud of</em>
          </h1>
          <p className="fade-in delay-3" style={{ fontSize: 18, color: 'var(--gray)', maxWidth: 520, fontWeight: 300, lineHeight: 1.85 }}>
            Every project here was built from scratch — unique, intentional, and crafted to serve the brand it represents.
          </p>
        </div>
      </div>

      {/* GRID */}
      <section style={{ padding: '80px 5% 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* FILTER TABS */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 52, flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                  background: active === f ? 'var(--black)' : 'transparent',
                  color: active === f ? '#fff' : 'var(--gray)',
                  border: `1px solid ${active === f ? 'var(--black)' : 'var(--brown-pale)'}`,
                  padding: '8px 22px',
                  borderRadius: 2,
                  fontSize: 13,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* PROJECT CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {filtered.map(p => (
              <div
                key={p.name}
                onMouseEnter={() => setHovered(p.name)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--brown-pale)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  transform: hovered === p.name ? 'translateY(-4px)' : 'none',
                  boxShadow: hovered === p.name ? '0 20px 40px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {/* Thumbnail */}
                <div style={{ height: 220, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 80, color: 'rgba(255,255,255,0.12)', userSelect: 'none', lineHeight: 1 }}>
                    {p.initial}
                  </span>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px', background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>
                      {p.tag}
                    </span>
                    <span style={{ fontSize: 11, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.25)', padding: '3px 10px', borderRadius: 20 }}>
                      {p.type}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '22px 24px' }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: 'var(--black)', marginBottom: 8, fontWeight: 400 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.7, fontWeight: 300 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontSize: 17, color: 'var(--gray)' }}>No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <div style={{ background: 'var(--black)', padding: '80px 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 20 }}>
            <span style={{ width: 24, height: 1, background: 'var(--brown)', display: 'block' }} />
            <span style={{ fontSize: 12, letterSpacing: '0.14em', color: 'var(--brown)', textTransform: 'uppercase' }}>Your Turn</span>
            <span style={{ width: 24, height: 1, background: 'var(--brown)', display: 'block' }} />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(30px,4vw,56px)', color: '#fff', marginBottom: 20, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.15 }}>
            Ready to be next?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, marginBottom: 40, fontWeight: 300 }}>
            Every project starts with a conversation. Tell me about yours.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary">Start Your Project</Link>
            <Link
              to="/services"
              className="btn-outline"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--black)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
            >
              View Packages
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}