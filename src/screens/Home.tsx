import { useState } from 'react'
import type { Nav } from '../nav'
import { AUTHOR, DISCLAIMER } from '../data/content'
import { CONDITIONS, groupById, searchConditions } from '../data/conditions'
import { IcoSearch, IcoChevron, SaltDot, Section, asset } from '../ui'
import { haptic } from '../lib/tg'

const QUICK = ['orvi', 'fatigue', 'insomnia', 'acne', 'digestion', 'menstrual-pain']

export default function Home({ nav }: { nav: Nav }) {
  const [q, setQ] = useState('')
  const searching = q.trim().length >= 2
  const results = searchConditions(q)

  return (
    <>
      <div className="blobs">
        <div className="blob a" />
        <div className="blob b" />
        <div className="blob c" />
      </div>

      <div className="pad" style={{ paddingTop: 'calc(18px + env(safe-area-inset-top))' }}>
        {/* ——— компактная шапка бренда ——— */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 20 }}>
          <img src={asset('img/emblem.png')} alt="" width={40} height={40} style={{ display: 'block', flex: 'none' }} />
          <div style={{ minWidth: 0 }}>
            <div className="wordmark" style={{ fontSize: 22 }}>
              Cellera
            </div>
            <div className="tagline" style={{ marginTop: 2, fontSize: 9.5 }}>
              Cellular Renewal · Natural Health
            </div>
          </div>
        </div>

        {/* ——— 1. ОБ АВТОРЕ ——— */}
        <div
          className="card tap rise"
          style={{ padding: 0, overflow: 'hidden' }}
          onClick={() => {
            haptic('light')
            nav.push({ k: 'about' })
          }}
        >
          <img
            src={asset('img/anna-2.jpg')}
            alt=""
            style={{ width: '100%', display: 'block', aspectRatio: '3/2', objectFit: 'cover', objectPosition: '50% 22%' }}
          />
          <div style={{ padding: 20 }}>
            <div className="eyebrow">Об авторе</div>
            <h2 style={{ fontSize: 28 }}>{AUTHOR.name}</h2>
            <p className="small muted" style={{ marginTop: 7 }}>
              {AUTHOR.roles}
            </p>
            <p className="quote" style={{ fontSize: 20, marginTop: 16 }}>
              {AUTHOR.motto}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 18,
                color: 'var(--sage-deep)',
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              Читать историю <IcoChevron s={16} />
            </div>
          </div>
        </div>

        {/* ——— 2. ВПЕРВЫЕ СЛЫШИТЕ ——— */}
        <Section>
          <div
            className="card tap"
            onClick={() => {
              haptic('light')
              nav.go('intro')
            }}
            style={{ background: 'var(--sage-wash)', borderColor: 'var(--sage)' }}
          >
            <div className="eyebrow" style={{ marginBottom: 6 }}>
              Впервые слышите?
            </div>
            <h3 style={{ marginBottom: 7 }}>Что такое соли Шюсслера</h3>
            <p className="small muted" style={{ margin: 0 }}>
              Открытие 1873 года, тритурация, чем отличаются от БАДов, что говорит наука и когда нужна осторожность.
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 14,
                color: 'var(--sage-deep)',
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              Читать <IcoChevron s={16} />
            </div>
          </div>
        </Section>

        {/* ——— 3. ПОИСК ——— */}
        <Section>
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

          {searching && (
            <div style={{ marginTop: 14 }} className="rise">
              {results.length === 0 ? (
                <div className="card">
                  <p className="small muted" style={{ margin: 0 }}>
                    Ничего не нашлось. Попробуйте другое слово — или спросите напрямую в разделе «Вопрос».
                  </p>
                </div>
              ) : (
                <div className="list">
                  {results.slice(0, 8).map((c) => (
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
          )}
        </Section>

        {!searching && (
          <>
            {/* ——— 4. ЧАСТЫЕ ЗАПРОСЫ — по одной в ряд ——— */}
            <Section title="Частые запросы">
              <div className="grid1">
                {QUICK.map((slug) => {
                  const c = CONDITIONS.find((x) => x.slug === slug)
                  if (!c) return null
                  const g = groupById(c.group)
                  return (
                    <div
                      key={slug}
                      className="tile wide tap"
                      onClick={() => {
                        haptic('light')
                        nav.push({ k: 'condition', slug })
                      }}
                    >
                      <div className="tile-blob" style={{ background: g.color }} />
                      <div className="tw-dots">
                        {c.salts.slice(0, 3).map((s, i) => (
                          <SaltDot key={i} n={s.n} size="sm" />
                        ))}
                      </div>
                      <div className="tw-body">
                        <div className="tile-name">{c.title}</div>
                        <div className="tile-count">{g.name}</div>
                      </div>
                      <span className="chev" style={{ color: 'var(--ink-faint)', flex: 'none' }}>
                        <IcoChevron />
                      </span>
                    </div>
                  )
                })}
              </div>
              <button className="btn btn-ghost" style={{ marginTop: 14 }} onClick={() => nav.go('help')}>
                Все состояния — {CONDITIONS.length}
              </button>
            </Section>

            {/* ——— 5. СПРАВОЧНИКИ ——— */}
            <Section>
              <div className="list">
                <div
                  className="list-item"
                  onClick={() => {
                    haptic('light')
                    nav.push({ k: 'salts' })
                  }}
                >
                  <SaltDot n={3} size="md" />
                  <div>
                    <div className="li-title">Справочник 12 солей</div>
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
            </Section>

            <p className="disclaimer">{DISCLAIMER}</p>
          </>
        )}
      </div>
    </>
  )
}
