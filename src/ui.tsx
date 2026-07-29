import { useState, type ReactNode } from 'react'
import { saltByN } from './data/salts'
import { haptic } from './lib/tg'

/** Путь к файлу из public/ с учётом base (GitHub Pages живёт в подпапке) */
export const asset = (p: string) => import.meta.env.BASE_URL + p.replace(/^\//, '')

/* ============================ иконки ============================ */

type IcoProps = { s?: number }

export const IcoHome = ({ s = 22 }: IcoProps) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5.5 9.5V20a1 1 0 0 0 1 1H17.5a1 1 0 0 0 1-1V9.5" />
  </svg>
)

export const IcoBook = ({ s = 22 }: IcoProps) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v18H5.5A1.5 1.5 0 0 1 4 19.5z" />
    <path d="M4 17.5A1.5 1.5 0 0 1 5.5 16H19" />
  </svg>
)

export const IcoLeaf = ({ s = 22 }: IcoProps) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 4c0 9-5.5 14-12 14a6 6 0 0 1 0-12c4.5 0 7.5-1 12-2z" />
    <path d="M4 20c3-6 7-9 12-11" />
  </svg>
)

export const IcoBag = ({ s = 22 }: IcoProps) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 7h14l1 13H4z" />
    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
  </svg>
)

export const IcoChat = ({ s = 22 }: IcoProps) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12a7.5 7.5 0 0 1-11 6.6L4 20l1.5-4.4A7.5 7.5 0 1 1 20 12z" />
  </svg>
)

export const IcoChevron = ({ s = 18 }: IcoProps) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 5 7 7-7 7" />
  </svg>
)

export const IcoBack = ({ s = 19 }: IcoProps) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 5-7 7 7 7" />
  </svg>
)

export const IcoSearch = ({ s = 19 }: IcoProps) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </svg>
)

export const IcoDrop = ({ s = 20 }: IcoProps) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3z" />
  </svg>
)

/* ============================ жетон соли ============================ */

export function SaltDot({ n, size = 'md', onClick }: { n: number; size?: 'sm' | 'md' | 'lg'; onClick?: () => void }) {
  const salt = saltByN(n)
  return (
    <span
      className={`salt-dot sz-${size}`}
      style={{ background: salt.color, color: salt.color, cursor: onClick ? 'pointer' : undefined }}
      onClick={onClick}
    >
      <span style={{ color: '#fff' }}>{n}</span>
    </span>
  )
}

/* ============================ шапка ============================ */

export function TopBar({ title, onBack, right }: { title?: string; onBack?: () => void; right?: ReactNode }) {
  return (
    <div className="topbar">
      {onBack && (
        <button
          className="iconbtn"
          onClick={() => {
            haptic('light')
            onBack()
          }}
          aria-label="Назад"
        >
          <IcoBack />
        </button>
      )}
      <div className="t-title">{title}</div>
      {right}
    </div>
  )
}

/* ============================ аккордеон ============================ */

export function Accordion({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`acc${open ? ' open' : ''}`}>
      <button
        className="acc-head"
        onClick={() => {
          haptic('select')
          setOpen((o) => !o)
        }}
      >
        <span>{title}</span>
        <span className="chev">
          <IcoChevron />
        </span>
      </button>
      {open && <div className="acc-body">{children}</div>}
    </div>
  )
}

/* ============================ блок «горячая семёрка» ============================ */

export function HotSeven({ text }: { text: string }) {
  return (
    <div
      className="card"
      style={{
        background: 'var(--ochre-wash)',
        borderColor: 'color-mix(in srgb, var(--ochre) 30%, transparent)',
      }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <span style={{ color: 'var(--ochre-deep)', flex: 'none', marginTop: 2 }}>
          <IcoDrop />
        </span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.03em', color: 'var(--ochre-deep)', marginBottom: 5 }}>
            МЕТОД «ГОРЯЧЕЙ СЕМЁРКИ»
          </div>
          <div className="small" style={{ color: 'var(--ink-soft)' }}>
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================ предупреждение ============================ */

export function WarnBox({ children }: { children: ReactNode }) {
  return (
    <div className="warnbox">
      <div className="w-title">Когда к врачу обязательно</div>
      <p>{children}</p>
    </div>
  )
}

/* ============================ секция ============================ */

export function Section({ title, children, style }: { title?: string; children: ReactNode; style?: React.CSSProperties }) {
  return (
    <section className="sec" style={style}>
      {title && <h2 className="sec-title">{title}</h2>}
      {children}
    </section>
  )
}
