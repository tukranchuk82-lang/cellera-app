/**
 * Тонкая обёртка над Telegram WebApp.
 * Приложение работает и внутри Telegram, и как обычный сайт —
 * снаружи все методы просто ничего не делают.
 */

type TgWebApp = {
  ready: () => void
  expand: () => void
  close: () => void
  colorScheme: 'light' | 'dark'
  BackButton: { show: () => void; hide: () => void; onClick: (cb: () => void) => void; offClick: (cb: () => void) => void }
  HapticFeedback?: { impactOccurred: (s: string) => void; selectionChanged: () => void }
  openTelegramLink: (url: string) => void
  openLink: (url: string) => void
  setHeaderColor?: (c: string) => void
  platform?: string
}

const tg: TgWebApp | undefined = (window as any).Telegram?.WebApp

/** Мы действительно внутри Telegram, а не просто скрипт загрузился */
export const inTelegram = Boolean(tg && tg.platform && tg.platform !== 'unknown')

export function initTelegram() {
  if (!inTelegram || !tg) return
  tg.ready()
  tg.expand()
  tg.setHeaderColor?.('#F7F4EF')
}

export function setBackButton(visible: boolean, onBack: () => void) {
  if (!inTelegram || !tg) return
  const b = tg.BackButton
  if (visible) {
    b.onClick(onBack)
    b.show()
    return () => b.offClick(onBack)
  }
  b.hide()
}

export function haptic(kind: 'light' | 'medium' | 'select' = 'light') {
  if (!inTelegram || !tg?.HapticFeedback) return
  if (kind === 'select') tg.HapticFeedback.selectionChanged()
  else tg.HapticFeedback.impactOccurred(kind)
}

/** Уйти в бота с контекстом: из какого раздела пришёл человек */
export function openBot(botUrl: string, payload?: string) {
  const url = payload ? `${botUrl}?start=${encodeURIComponent(payload)}` : botUrl
  if (inTelegram && tg) tg.openTelegramLink(url)
  else window.open(url, '_blank', 'noopener')
}

export function openExternal(url: string) {
  if (inTelegram && tg) tg.openLink(url)
  else window.open(url, '_blank', 'noopener')
}
