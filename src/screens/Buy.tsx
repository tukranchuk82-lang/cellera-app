import { BUY_QUALITY, LINKS, DISCLAIMER } from '../data/content'
import { SALTS } from '../data/salts'
import { TopBar, Section, IcoChevron, SaltDot, asset } from '../ui'
import { openExternal, haptic } from '../lib/tg'

export default function Buy() {
  const shifted = SALTS.filter((s) => s.inIndia !== s.n)

  return (
    <>
      <TopBar title="Где и как купить" />

      <div className="blobs" style={{ height: 260 }}>
        <div className="blob c" style={{ opacity: 0.3 }} />
      </div>

      <div className="pad" style={{ paddingTop: 6 }}>
        <div className="rise">
          <h1 style={{ fontSize: 30 }}>Где купить</h1>
          <p className="lead" style={{ marginTop: 12 }}>
            Соли BJAIN производятся в Индии по трём фармакопеям — индийской, американской и европейской — и сертифицированы по GMP.
          </p>
        </div>

        <Section>
          <div className="list">
            <div
              className="list-item"
              onClick={() => {
                haptic('light')
                openExternal(LINKS.taplink)
              }}
            >
              <div>
                <div className="li-title">Магазин солей</div>
                <div className="li-sub">Все соли, биокомбинации и наборы</div>
              </div>
              <span className="chev">
                <IcoChevron />
              </span>
            </div>
            <div className="list-item" onClick={() => openExternal(LINKS.ozon)}>
              <div>
                <div className="li-title">Ozon</div>
                <div className="li-sub">Аккаунт «Варница»</div>
              </div>
              <span className="chev">
                <IcoChevron />
              </span>
            </div>
            <div className="list-item" onClick={() => openExternal(LINKS.wb)}>
              <div>
                <div className="li-title">Wildberries</div>
                <div className="li-sub">Аккаунт «Варница»</div>
              </div>
              <span className="chev">
                <IcoChevron />
              </span>
            </div>
          </div>
          <p className="tiny" style={{ marginTop: 10, textAlign: 'center' }}>
            Ссылки на маркетплейсы будут добавлены
          </p>
        </Section>

        <img
          src={asset('img/salts-2.jpg')}
          alt=""
          style={{ width: '100%', borderRadius: 'var(--r-lg)', marginTop: 26, display: 'block', aspectRatio: '4/3', objectFit: 'cover' }}
        />

        <Section title="Как понять, что соль настоящая">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {BUY_QUALITY.map((q, i) => (
              <div className="card" key={i}>
                <div style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      flex: 'none',
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'var(--sage-wash)',
                      color: 'var(--sage-deep)',
                      display: 'grid',
                      placeItems: 'center',
                      fontFamily: 'var(--serif)',
                      fontWeight: 600,
                      fontSize: 16,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 style={{ fontSize: 19, marginBottom: 6 }}>{q.h}</h3>
                    <p className="small muted" style={{ margin: 0 }}>
                      {q.p}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Таблица соответствия номеров">
          <div className="card">
            <p className="small muted" style={{ marginBottom: 14 }}>
              По первым двум солям номера совпадают. Начиная с третьей — расходятся: у индусов перед Ferrum phosphoricum вклинивается
              Calcarea sulphurica, которая в Европе стоит на 12-м месте.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '0 12px', alignItems: 'center' }}>
              <div className="tiny" style={{ fontWeight: 700, paddingBottom: 8 }}>
                ЕВРОПА
              </div>
              <div />
              <div className="tiny" style={{ fontWeight: 700, paddingBottom: 8, textAlign: 'right' }}>
                ИНДИЯ
              </div>
              {shifted.map((s) => (
                <div key={s.n} style={{ display: 'contents' }}>
                  <SaltDot n={s.n} size="sm" />
                  <div className="small" style={{ fontStyle: 'italic', padding: '7px 0', color: 'var(--ink-soft)' }}>
                    {s.latin}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 18,
                      color: 'var(--warn)',
                      textAlign: 'right',
                      fontWeight: 600,
                    }}
                  >
                    №{s.inIndia}
                  </div>
                </div>
              ))}
            </div>
            <p className="tiny" style={{ marginTop: 14 }}>
              Такая же нумерация в Канаде и Португалии. Где бы вы ни покупали — смотрите, чтобы на баночке было и число, и латинское
              название.
            </p>
          </div>
        </Section>

        <p className="disclaimer">{DISCLAIMER}</p>
      </div>
    </>
  )
}
