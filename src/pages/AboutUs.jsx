
import styles from './Team.module.css'

const team = [
  {
    name: 'Aileen Aryeetey',
    role: 'Web Developer',
    image: '/aileen-team.jpeg',
    imageAlt: 'Aileen Aryeetey, Web Developer at AC Web Studio',
    imagePosition: 'center 22%',
    blurb: 'Turns strategy and ideas into polished websites that feel solid, custom, and easy to trust.'
  },
  {
    name: 'Cynthia Owusu-Forkuo',
    role: 'UI/UX Designer',
    image: '/cynthia-team.jpeg',
    imageAlt: 'Cynthia Owusu-Forkuo, UI UX Designer at AC Web Studio',
    imagePosition: 'center 20%',
    blurb: 'Shapes the visual personality of each project so the finished website feels thoughtful from the first glance.'
  },
]


export default function AboutUs() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, var(--cream), var(--white))', padding: '120px 5% 80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: 48, maxWidth: 1100, width: '100%', justifyContent: 'center' }}>
        {team.map(member => (
          <div key={member.name} style={{ flex: 1, background: '#fff', borderRadius: 24, boxShadow: '0 4px 32px rgba(31,23,38,0.07)', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0 }}>
            <div style={{ width: '100%', aspectRatio: '1/1', background: '#eee', position: 'relative' }}>
              <img
                src={member.image}
                alt={member.imageAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: member.imagePosition, display: 'block' }}
              />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '44%', background: 'linear-gradient(0deg, rgba(31,23,38,0.82) 0%, transparent 100%)' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '32px 28px 24px', color: '#fff', zIndex: 2 }}>
                <div style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brown-light)', marginBottom: 6 }}>{member.role}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, marginBottom: 8 }}>{member.name}</div>
                <div style={{ fontSize: 16, fontWeight: 300, color: '#fff', opacity: 0.92 }}>{member.blurb}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
