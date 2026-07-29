import { LINKS, AUTHOR, DISCLAIMER } from '../data/content'
import { TopBar, Section, IcoChat, IcoChevron } from '../ui'
import { openBot, openExternal, haptic } from '../lib/tg'

const CAN = [
  'Подобрать соль или биокомбинацию под ваши симптомы',
  'Объяснить схему приёма и дозировку',
  'Подсказать, как сочетать соли с назначенным лечением',
  'Ответить на вопросы о качестве, нумерации и покупке',
]

const CANNOT = [
  'Поставить диагноз',
  'Отменить или заменить назначения вашего врача',
  'Помочь в неотложной ситуации — тут нужна Скорая',
]

export default function Consult() {
  return (
    <>
      <TopBar title="Получить консультацию" />

      <div className="blobs" style={{ height: 320 }}>
        <div className="blob a" />
        <div className="blob b" />
      </div>

      <div className="pad" style={{ paddingTop: 6 }}>
        <div className="rise" style={{ textAlign: 'center', paddingTop: 12 }}>
          <span
            style={{
              display: 'inline-grid',
              placeItems: 'center',
              width: 68,
              height: 68,
              borderRadius: '50%',
              background: 'var(--sage-wash)',
              color: 'var(--sage-deep)',
              marginBottom: 18,
            }}
          >
            <IcoChat s={30} />
          </span>
          <h1 style={{ fontSize: 30 }}>Спросите — ответим</h1>
          <p className="lead" style={{ marginTop: 12 }}>
            В боте вас встретит ИИ-помощник, обученный на материалах Анны. Он знает все 12 солей, 30 биокомбинаций и схемы приёма.
          </p>
        </div>

        <Section>
          <button
            className="btn btn-primary"
            onClick={() => {
              haptic('medium')
              openBot(LINKS.bot, 'consult')
            }}
          >
            Открыть чат с помощником
          </button>
        </Section>

        <Section title="С чем поможет">
          <div className="card">
            {CAN.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '9px 0' }}>
                <span style={{ color: 'var(--sage-deep)', fontWeight: 700, flex: 'none' }}>✓</span>
                <span className="small">{t}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Чего не сделает">
          <div className="card">
            {CANNOT.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '9px 0' }}>
                <span style={{ color: 'var(--warn)', fontWeight: 700, flex: 'none' }}>✕</span>
                <span className="small">{t}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Нужен живой врач?">
          <div className="list">
            <div
              className="list-item"
              onClick={() => {
                haptic('light')
                openExternal(LINKS.taplink)
              }}
            >
              <div>
                <div className="li-title">Записаться к {AUTHOR.name.split(' ')[0]}е</div>
                <div className="li-sub">Личная консультация гомеопата</div>
              </div>
              <span className="chev">
                <IcoChevron />
              </span>
            </div>
          </div>
        </Section>

        <Section>
          <div className="warnbox">
            <div className="w-title">Важно</div>
            <p>
              При острых и жизнеугрожающих состояниях — высокая температура у младенца, сильная боль в животе, затруднение дыхания,
              нарушение речи или зрения — вызывайте Скорую помощь. Соли не заменяют неотложную медицину.
            </p>
          </div>
        </Section>

        <p className="disclaimer">{DISCLAIMER}</p>
      </div>
    </>
  )
}
