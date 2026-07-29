import type { Nav } from '../nav'
import { CONDITIONS, conditionBySlug, conditionsInGroup, groupById } from '../data/conditions'
import { SALTS, saltByN, CHEATSHEET, INFLAMMATION_STAGES } from '../data/salts'
import { LINKS, HOT_SEVEN_TEXT, DISCLAIMER } from '../data/content'
import { TopBar, SaltDot, IcoChevron, HotSeven, WarnBox, Section, Accordion } from '../ui'
import { openBot, haptic } from '../lib/tg'

/* ==================== экран группы ==================== */

export function GroupScreen({ id, nav, onBack }: { id: string; nav: Nav; onBack: () => void }) {
  const g = groupById(id)
  const items = conditionsInGroup(id)
  return (
    <>
      <TopBar title={g.name} onBack={onBack} />
      <div className="pad" style={{ paddingTop: 8 }}>
        <div className="list">
          {items.map((c) => (
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
        <p className="disclaimer">{DISCLAIMER}</p>
      </div>
    </>
  )
}

/* ==================== экран состояния ==================== */

export function ConditionScreen({ slug, nav, onBack }: { slug: string; nav: Nav; onBack: () => void }) {
  const c = conditionBySlug(slug)
  if (!c) return null
  const g = groupById(c.group)

  return (
    <>
      <TopBar title={c.title} onBack={onBack} />

      <div className="blobs" style={{ height: 300 }}>
        <div className="blob a" style={{ background: g.color }} />
        <div className="blob b" style={{ background: g.color, opacity: 0.2 }} />
      </div>

      <div className="pad" style={{ paddingTop: 6 }}>
        <div className="rise">
          <div className="eyebrow">{g.name}</div>
          <h1 style={{ fontSize: 31 }}>{c.title}</h1>
          <p className="lead" style={{ marginTop: 14 }}>
            {c.summary}
          </p>
        </div>

        <Section title="Какие соли">
          <div className="card">
            {c.salts.map((use, i) => {
              const salt = saltByN(use.n)
              return (
                <div className="salt-row" key={i}>
                  <SaltDot n={use.n} size="md" onClick={() => nav.push({ k: 'salt', n: use.n })} />
                  <div style={{ minWidth: 0 }}>
                    <div>
                      <span className="sr-name" onClick={() => nav.push({ k: 'salt', n: use.n })} style={{ cursor: 'pointer' }}>
                        {salt.ru}
                      </span>
                      {use.potency && <span className="sr-pot">{use.potency}</span>}
                    </div>
                    <div className="tiny" style={{ marginTop: 1, fontStyle: 'italic' }}>
                      {salt.latin}
                    </div>
                    <div className="sr-note">{use.note}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </Section>

        {c.hotSeven && (
          <Section>
            <HotSeven text={c.hotSeven} />
          </Section>
        )}

        {c.tips && c.tips.length > 0 && (
          <Section title="Что ещё поможет">
            <div className="card">
              {c.tips.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '9px 0' }}>
                  <span
                    style={{ flex: 'none', width: 6, height: 6, borderRadius: '50%', background: 'var(--sage)', marginTop: 9 }}
                  />
                  <span className="small">{t}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {c.warning && (
          <Section>
            <WarnBox>{c.warning}</WarnBox>
          </Section>
        )}

        <Section>
          <button
            className="btn btn-primary"
            onClick={() => {
              haptic('medium')
              openBot(LINKS.bot, `q_${c.slug}`)
            }}
          >
            Задать вопрос эксперту
          </button>
          <p className="tiny" style={{ textAlign: 'center', marginTop: 10 }}>
            Откроется бот — он уже будет знать, что вы читали про «{c.title.toLowerCase()}»
          </p>
        </Section>

        <p className="disclaimer">{DISCLAIMER}</p>
      </div>
    </>
  )
}

/* ==================== список 12 солей ==================== */

export function SaltsScreen({ nav, onBack }: { nav: Nav; onBack: () => void }) {
  return (
    <>
      <TopBar title="12 солей Шюсслера" onBack={onBack} />
      <div className="pad" style={{ paddingTop: 8 }}>
        <div className="list">
          {SALTS.map((s) => (
            <div
              key={s.n}
              className="list-item"
              onClick={() => {
                haptic('light')
                nav.push({ k: 'salt', n: s.n })
              }}
            >
              <SaltDot n={s.n} size="md" />
              <div style={{ minWidth: 0 }}>
                <div className="li-title" style={{ fontFamily: 'var(--serif)', fontSize: 19 }}>
                  {s.ru}
                </div>
                <div className="li-sub" style={{ fontStyle: 'italic' }}>
                  {s.latin} · {s.potency}
                </div>
              </div>
              <span className="chev">
                <IcoChevron />
              </span>
            </div>
          ))}
        </div>
        <p className="disclaimer">{DISCLAIMER}</p>
      </div>
    </>
  )
}

/* ==================== карточка соли ==================== */

export function SaltScreen({ n, nav, onBack }: { n: number; nav: Nav; onBack: () => void }) {
  const s = saltByN(n)
  const used = conditionsWithSalt(n)

  return (
    <>
      <TopBar title={s.ru} onBack={onBack} />

      <div className="blobs" style={{ height: 280 }}>
        <div className="blob a" style={{ background: s.color }} />
        <div className="blob b" style={{ background: s.color, opacity: 0.22 }} />
      </div>

      <div className="pad" style={{ paddingTop: 10 }}>
        <div className="rise" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <SaltDot n={s.n} size="lg" />
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontSize: 28 }}>{s.ru}</h1>
            <p className="small muted" style={{ fontStyle: 'italic', marginTop: 2 }}>
              {s.latin}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
          <span className="sr-pot" style={{ marginLeft: 0, fontSize: 13, padding: '5px 12px' }}>
            {s.potency}
          </span>
          {s.nickname && (
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--sage-deep)',
                background: 'var(--sage-wash)',
                padding: '5px 12px',
                borderRadius: 100,
              }}
            >
              биохимический «{s.nickname}»
            </span>
          )}
        </div>

        <Section title="Тропность">
          <div className="card">
            <p className="small" style={{ margin: 0 }}>
              {s.tropism}
            </p>
            <p className="tiny" style={{ marginTop: 8 }}>
              Тропность — преимущественное влияние соли на определённые ткани и органы.
            </p>
          </div>
        </Section>

        <Section title="Показания внутрь">
          <div className="card">
            <p className="small" style={{ margin: 0 }}>
              {s.indications}
            </p>
          </div>
        </Section>

        <Section title="Наружное применение">
          <div className="card">
            <p className="small" style={{ margin: 0 }}>
              {s.external}
            </p>
            <p className="tiny" style={{ marginTop: 10 }}>
              Для мази таблетки измельчают и размешивают в немедицинском увлажняющем лосьоне без контакта с металлом — одна таблетка на
              несколько капель лосьона.
            </p>
          </div>
        </Section>

        {s.inIndia !== s.n && (
          <Section>
            <div className="warnbox">
              <div className="w-title">Внимание при покупке</div>
              <p>
                В Индии, Канаде и Португалии эта соль идёт под номером <b>№{s.inIndia}</b>, а не №{s.n}. Нумерация там сдвинута. Смотрите
                на баночке не только номер, но и латинское название — <i>{s.latin}</i>.
              </p>
            </div>
          </Section>
        )}

        {used.length > 0 && (
          <Section title="Где применяется">
            <div className="list">
              {used.map((c) => (
                <div
                  key={c.slug}
                  className="list-item"
                  onClick={() => {
                    haptic('light')
                    nav.push({ k: 'condition', slug: c.slug })
                  }}
                >
                  <div className="li-title">{c.title}</div>
                  <span className="chev">
                    <IcoChevron />
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}

        <p className="disclaimer">{DISCLAIMER}</p>
      </div>
    </>
  )
}

function conditionsWithSalt(n: number) {
  return CONDITIONS.filter((c) => c.salts.some((s) => s.n === n))
}

/* ==================== шпаргалки ==================== */

export function CheatsScreen({ nav, onBack }: { nav: Nav; onBack: () => void }) {
  return (
    <>
      <TopBar title="Шпаргалки" onBack={onBack} />
      <div className="pad" style={{ paddingTop: 8 }}>
        <Section title="Биохимические аналоги">
          <div className="card">
            {CHEATSHEET.map((c) => (
              <div className="cheat" key={c.n}>
                <span className="ch-l">{c.label}</span>
                <SaltDot n={c.n} size="sm" onClick={() => nav.push({ k: 'salt', n: c.n })} />
              </div>
            ))}
          </div>
          <p className="tiny" style={{ marginTop: 10 }}>
            Это метафоры, помогающие запомнить действие соли, а не заявление о равной силе с лекарством.
          </p>
        </Section>

        <Section title="Стадии воспаления">
          <div className="card">
            {INFLAMMATION_STAGES.map((st, i) => (
              <div key={i} style={{ padding: '14px 0', borderBottom: i < INFLAMMATION_STAGES.length - 1 ? '1px solid var(--line)' : 0 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  {st.salts.map((n) => (
                    <SaltDot key={n} n={n} size="sm" onClick={() => nav.push({ k: 'salt', n })} />
                  ))}
                  <span style={{ fontFamily: 'var(--serif)', fontSize: 18 }}>{st.stage}</span>
                </div>
                <div className="small muted">{st.sign}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Дренажи — как отличить">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Accordion title="Natrium — №8, 9, 10">
              Показаны для очищения крови и лимфы. Натрий преимущественно содержится в межклеточной жидкости.
            </Accordion>
            <Accordion title="Kalium — №4, 5, 6">
              Полезны для поддержки нервов, желёз и слизистых оболочек. Калий преимущественно содержится внутри клеток.
            </Accordion>
            <Accordion title="Muriaticum — №4, 8">Показаны при дефиците хлора — часто это состояние сопровождается кашлем.</Accordion>
            <Accordion title="Phosphoricum — №2, 3, 5, 7, 9">
              Показаны при дефиците фосфора — это состояния физической и психической слабости.
            </Accordion>
            <Accordion title="Sulphuricum — №6, 10, 12">
              Показаны при дефиците серы — признаками будут интоксикация и появление жёлтых выделений.
            </Accordion>
          </div>
        </Section>

        <Section title={HOT_SEVEN_TEXT.title}>
          <div className="card" style={{ background: 'var(--ochre-wash)', borderColor: 'color-mix(in srgb, var(--ochre) 30%, transparent)' }}>
            {HOT_SEVEN_TEXT.body.map((t, i) => (
              <p key={i} className="small" style={{ color: 'var(--ink-soft)' }}>
                {t}
              </p>
            ))}
          </div>
        </Section>

        <p className="disclaimer">{DISCLAIMER}</p>
      </div>
    </>
  )
}
