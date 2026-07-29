import { AUTHOR, LINKS, DISCLAIMER } from '../data/content'
import { TopBar, IcoChevron } from '../ui'
import { openBot, openExternal, haptic } from '../lib/tg'

const PHOTOS = ['/img/anna-1.jpg', '/img/anna-3.jpg']

export default function About({ onBack }: { onBack: () => void }) {
  return (
    <>
      <TopBar title="Об авторе" onBack={onBack} />

      <div className="pad">
        <img className="hero-photo rise" src={PHOTOS[0]} alt={AUTHOR.name} />

        <div style={{ marginTop: 22 }}>
          <h1>{AUTHOR.name}</h1>
          <p className="small muted" style={{ marginTop: 8, letterSpacing: '.01em' }}>
            {AUTHOR.roles}
          </p>
        </div>

        <p className="quote" style={{ marginTop: 20 }}>
          {AUTHOR.motto}
        </p>

        <div style={{ marginTop: 22 }}>
          {AUTHOR.credentials.map((c, i) => (
            <div className="credential" key={i}>
              <span className="cd-dot" />
              <span>{c}</span>
            </div>
          ))}
        </div>

        <hr className="rule" />

        <div className="story">
          {AUTHOR.story.map((block, i) => (
            <section key={i} style={{ marginBottom: 34 }}>
              <h2 className="story-h">{block.h}</h2>
              {block.p?.map((t, j) => (
                <p key={j}>{t}</p>
              ))}
              {block.hl && <p className="hl">{block.hl}</p>}
              {block.after?.map((t, j) => (
                <p key={`a${j}`}>{t}</p>
              ))}
              {i === 2 && <img className="hero-photo" style={{ aspectRatio: '3/2', marginTop: 6 }} src={PHOTOS[1]} alt="" />}
            </section>
          ))}
        </div>

        <hr className="rule" />

        <div className="list">
          <div
            className="list-item"
            onClick={() => {
              haptic('light')
              openBot(LINKS.bot, 'about')
            }}
          >
            <div>
              <div className="li-title">Задать вопрос</div>
              <div className="li-sub">Telegram-бот с ИИ-помощником</div>
            </div>
            <span className="chev">
              <IcoChevron />
            </span>
          </div>
          <div className="list-item" onClick={() => openExternal(LINKS.taplink)}>
            <div>
              <div className="li-title">Записаться на консультацию</div>
              <div className="li-sub">Личный приём у Анны</div>
            </div>
            <span className="chev">
              <IcoChevron />
            </span>
          </div>
          <div className="list-item" onClick={() => openExternal(LINKS.vk)}>
            <div>
              <div className="li-title">Сообщество ВКонтакте</div>
            </div>
            <span className="chev">
              <IcoChevron />
            </span>
          </div>
          <div className="list-item" onClick={() => openExternal(LINKS.tg)}>
            <div>
              <div className="li-title">Канал в Телеграме</div>
            </div>
            <span className="chev">
              <IcoChevron />
            </span>
          </div>
        </div>

        <p className="disclaimer">{DISCLAIMER}</p>
      </div>
    </>
  )
}
