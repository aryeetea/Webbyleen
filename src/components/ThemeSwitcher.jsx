import { themes } from '../theme'

const swatchStyle = color => ({
  width: 18,
  height: 18,
  borderRadius: '50%',
  background: color,
  border: '1px solid rgba(0,0,0,0.08)',
})

export default function ThemeSwitcher({ activeTheme, onThemeChange }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        padding: 16,
        border: '1px solid var(--brown-pale)',
        borderRadius: 22,
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(18px)',
        width: 'fit-content',
        boxShadow: '0 18px 38px rgba(31, 23, 38, 0.08)',
      }}
    >
      {Object.values(themes).map(theme => (
        <button
          key={theme.id}
          type="button"
          onClick={() => onThemeChange(theme.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            borderRadius: 999,
            border: theme.id === activeTheme ? '1px solid var(--brown)' : '1px solid transparent',
            background: theme.id === activeTheme ? 'var(--white)' : 'transparent',
            color: 'var(--black)',
            cursor: 'pointer',
            transition: 'transform 0.2s, border-color 0.2s, background 0.2s',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <span style={{ display: 'flex', gap: 6 }}>
            <span style={swatchStyle(theme.colors['--brown'])} />
            <span style={swatchStyle(theme.colors['--accent-strong'])} />
            <span style={swatchStyle(theme.colors['--black'])} />
          </span>
          <span style={{ fontSize: 13, letterSpacing: '0.03em' }}>{theme.name}</span>
        </button>
      ))}
    </div>
  )
}
