import { INTRO_SECTIONS, DISCLAIMER } from '../data/content'
import { TopBar, Accordion, asset } from '../ui'
import { openExternal } from '../lib/tg'

export default function Intro() {
  return (
    <>
      <TopBar title="Что такое соли Шюсслера" />

      <div className="blobs">
        <div className="blob a" />
        <div className="blob c" />
      </div>

      <div className="pad" style={{ paddingTop: 8 }}>
        <div className="rise">
          <div className="eyebrow">С 1873 года</div>
          <h1 style={{ fontSize: 32, lineHeight: 1.15 }}>
            Двенадцать солей,
            <br />
            из которых построено тело
          </h1>
          <p className="lead" style={{ marginTop: 16 }}>
            Восполнение недостающих минералов, приготовленных особым образом, в малых дозах — быстро восстанавливает баланс. Шюсслер назвал
            такой подход биохимической терапией.
          </p>
        </div>

        <img
          src={asset('img/salts-1.jpg')}
          alt=""
          style={{ width: '100%', borderRadius: 'var(--r-lg)', marginTop: 22, display: 'block', aspectRatio: '4/3', objectFit: 'cover' }}
        />

        <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {INTRO_SECTIONS.map((s) => (
            <Accordion key={s.id} title={s.h} defaultOpen={s.id === 'who'}>
              {s.body?.map((t, i) => (
                <p key={i}>{t}</p>
              ))}

              {s.accent && (
                <p
                  style={{
                    background: 'var(--ochre-wash)',
                    color: 'var(--ochre-deep)',
                    padding: '13px 15px',
                    borderRadius: 'var(--r-sm)',
                    fontWeight: 600,
                    marginTop: 4,
                  }}
                >
                  {s.accent}
                </p>
              )}

              {s.table && (
                <div style={{ overflowX: 'auto', margin: '4px -4px' }}>
                  <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14, minWidth: 460 }}>
                    <tbody>
                      {s.table.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              style={{
                                padding: '10px 11px',
                                verticalAlign: 'top',
                                borderBottom: '1px solid var(--line)',
                                fontWeight: ri === 0 || ci === 0 ? 700 : 400,
                                color: ri === 0 ? 'var(--sage-deep)' : ci === 0 ? 'var(--ink)' : 'var(--ink-soft)',
                                background: ci === 1 ? 'var(--sage-wash)' : undefined,
                                width: ci === 0 ? '22%' : '39%',
                              }}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {s.myths && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {s.myths.map((m, i) => (
                    <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--warn)', fontWeight: 700, flex: 'none', marginTop: -1 }}>✕</span>
                      <span style={{ textDecoration: 'line-through', textDecorationColor: 'var(--ink-faint)' }}>{m}</span>
                    </div>
                  ))}
                  <p className="tiny" style={{ marginTop: 6 }}>
                    Ни одно из этих утверждений не соответствует действительности.
                  </p>
                </div>
              )}

              {s.steps && (
                <ol style={{ margin: '6px 0 0', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {s.steps.map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ol>
              )}

              {s.links && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 6 }}>
                  {s.links.map((l, i) => (
                    <button
                      key={i}
                      onClick={() => openExternal(l.url)}
                      style={{
                        textAlign: 'left',
                        background: 'var(--sage-wash)',
                        border: '1px solid var(--sage)',
                        color: 'var(--sage-deep)',
                        borderRadius: 'var(--r-sm)',
                        padding: '12px 14px',
                        font: 'inherit',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {l.label} →
                    </button>
                  ))}
                </div>
              )}
            </Accordion>
          ))}
        </div>

        <p className="disclaimer">{DISCLAIMER}</p>
      </div>
    </>
  )
}
