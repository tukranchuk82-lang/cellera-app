import { useState } from 'react'
import type { Nav } from '../nav'
import { GROUPS, CONDITIONS, conditionsInGroup, searchConditions } from '../data/conditions'
import { IcoSearch, IcoChevron, SaltDot, Section, TopBar } from '../ui'
import { haptic } from '../lib/tg'
import { DISCLAIMER } from '../data/content'

export default function Help({ nav }: { nav: Nav }) {
  const [q, setQ] = useState('')
  const searching = q.trim().length >= 2
  const results = searchConditions(q)

  return (
    <>
      <TopBar title="Как помогают соли" />

      <div className="pad" style={{ paddingTop: 6 }}>
        <div className="search">
          <span className="s-ico">
            <IcoSearch />
          </span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Что вас беспокоит?" aria-label="Поиск по симптомам" />
          {q && (
            <button className="s-clear" onClick={() => setQ('')} aria-label="Очистить">
              ✕
            </button>
          )}
        </div>

        {searching ? (
          <div style={{ marginTop: 16 }} className="rise">
            <p className="tiny" style={{ marginBottom: 8 }}>
              {results.length === 0 ? 'Ничего не нашлось' : `Найдено: ${results.length}`}
            </p>
            {results.length === 0 ? (
              <div className="card">
                <p className="small muted" style={{ margin: 0 }}>
                  Попробуйте другое слово — например «понос», «сон», «прыщи». Или спросите напрямую в разделе «Вопрос».
                </p>
              </div>
            ) : (
              <div className="list">
                {results.map((c) => (
                  <div
                    key={c.slug}
                    className="list-item"
                    onClick={() => {
                      haptic('light')
                      nav.push({ k: 'condition', slug: c.slug })
                    }}
                  >
                    <div style={{ display: 'flex', gap: 5 }}>
                      {c.salts.slice(0, 2).map((s, i) => (
                        <SaltDot key={i} n={s.n} size="sm" />
                      ))}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="li-title">{c.title}</div>
                    </div>
                    <span className="chev">
                      <IcoChevron />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <Section title="По направлениям">
              <div className="grid2">
                {GROUPS.map((g) => {
                  const n = conditionsInGroup(g.id).length
                  if (n === 0) return null
                  return (
                    <div
                      key={g.id}
                      className="tile tap"
                      onClick={() => {
                        haptic('light')
                        nav.push({ k: 'group', id: g.id })
                      }}
                    >
                      <div className="tile-blob" style={{ background: g.color }} />
                      <div className="tile-name">{g.name}</div>
                      <div className="tile-count">
                        {n} {n === 1 ? 'состояние' : n < 5 ? 'состояния' : 'состояний'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Section>

            <Section title="Справочники">
              <div className="list">
                <div
                  className="list-item"
                  onClick={() => {
                    haptic('light')
                    nav.push({ k: 'salts' })
                  }}
                >
                  <SaltDot n={1} size="md" />
                  <div>
                    <div className="li-title">12 солей Шюсслера</div>
                    <div className="li-sub">Показания, тропность, потенции, наружное применение</div>
                  </div>
                  <span className="chev">
                    <IcoChevron />
                  </span>
                </div>
                <div
                  className="list-item"
                  onClick={() => {
                    haptic('light')
                    nav.push({ k: 'cheats' })
                  }}
                >
                  <span className="salt-dot sz-md" style={{ background: 'var(--ochre)', color: 'var(--ochre)' }}>
                    <span style={{ color: '#fff', fontSize: 17 }}>≡</span>
                  </span>
                  <div>
                    <div className="li-title">Шпаргалки</div>
                    <div className="li-sub">Биохимические аналоги, стадии воспаления, «горячая семёрка»</div>
                  </div>
                  <span className="chev">
                    <IcoChevron />
                  </span>
                </div>
              </div>
              <p className="tiny" style={{ marginTop: 12, textAlign: 'center' }}>
                Всего в справочнике {CONDITIONS.length} состояний. Наполнение продолжается.
              </p>
            </Section>
          </>
        )}

        <p className="disclaimer">{DISCLAIMER}</p>
      </div>
    </>
  )
}
