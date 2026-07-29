import { useCallback, useEffect, useRef, useState, type JSX } from 'react'
import { TABS, type Nav, type TabId, type View } from './nav'
import { IcoHome, IcoBook, IcoLeaf, IcoBag, IcoChat } from './ui'
import { initTelegram, setBackButton, haptic, inTelegram } from './lib/tg'

import Home from './screens/Home'
import About from './screens/About'
import Intro from './screens/Intro'
import Help from './screens/Help'
import Buy from './screens/Buy'
import Consult from './screens/Consult'
import { GroupScreen, ConditionScreen, SaltsScreen, SaltScreen, CheatsScreen } from './screens/Detail'

const TAB_ICON: Record<TabId, (p: { s?: number }) => JSX.Element> = {
  home: IcoHome,
  intro: IcoBook,
  help: IcoLeaf,
  buy: IcoBag,
  consult: IcoChat,
}

export default function App() {
  const [tab, setTab] = useState<TabId>('home')
  const [stack, setStack] = useState<View[]>([])
  const shellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initTelegram()
    document.body.classList.add('paper-grain')
  }, [])

  const pop = useCallback(() => {
    setStack((s) => s.slice(0, -1))
  }, [])

  const push = useCallback((v: View) => {
    setStack((s) => [...s, v])
    history.pushState({ t: Date.now() }, '')
  }, [])

  const go = useCallback((t: TabId) => {
    haptic('select')
    setStack([])
    setTab(t)
  }, [])

  const nav: Nav = { push, pop, go }

  /* аппаратная кнопка «назад» браузера */
  useEffect(() => {
    const onPop = () => setStack((s) => (s.length ? s.slice(0, -1) : s))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  /* кнопка «назад» Telegram */
  useEffect(() => {
    const cleanup = setBackButton(stack.length > 0, pop)
    return typeof cleanup === 'function' ? cleanup : undefined
  }, [stack.length, pop])

  /* прокрутка вверх при смене экрана */
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [tab, stack.length])

  const top = stack[stack.length - 1]

  let screen: JSX.Element
  if (top) {
    switch (top.k) {
      case 'about':
        screen = <About onBack={pop} />
        break
      case 'group':
        screen = <GroupScreen id={top.id} nav={nav} onBack={pop} />
        break
      case 'condition':
        screen = <ConditionScreen slug={top.slug} nav={nav} onBack={pop} />
        break
      case 'salts':
        screen = <SaltsScreen nav={nav} onBack={pop} />
        break
      case 'salt':
        screen = <SaltScreen n={top.n} nav={nav} onBack={pop} />
        break
      case 'cheats':
        screen = <CheatsScreen nav={nav} onBack={pop} />
        break
      default:
        screen = <Home nav={nav} />
    }
  } else {
    switch (tab) {
      case 'intro':
        screen = <Intro />
        break
      case 'help':
        screen = <Help nav={nav} />
        break
      case 'buy':
        screen = <Buy />
        break
      case 'consult':
        screen = <Consult />
        break
      default:
        screen = <Home nav={nav} />
    }
  }

  const key = top ? `${top.k}-${JSON.stringify(top)}` : tab

  return (
    <div className="shell" ref={shellRef}>
      <div className="scroll" key={key}>
        {screen}
      </div>

      <nav className="tabbar" aria-label="Основная навигация">
        {TABS.map((t) => {
          const Icon = TAB_ICON[t.id]
          const on = tab === t.id && stack.length === 0
          return (
            <button key={t.id} className={`tabbtn${on ? ' on' : ''}`} onClick={() => go(t.id)}>
              <span className="ti">
                <Icon s={21} />
              </span>
              {t.label}
            </button>
          )
        })}
      </nav>

      {!inTelegram && (
        <div
          style={{
            position: 'fixed',
            top: 10,
            right: 10,
            zIndex: 60,
            fontSize: 10,
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            color: 'var(--ink-faint)',
            background: 'var(--card)',
            border: '1px solid var(--line)',
            padding: '4px 9px',
            borderRadius: 100,
            pointerEvents: 'none',
          }}
        >
          web
        </div>
      )}
    </div>
  )
}
