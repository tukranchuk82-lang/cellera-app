/**
 * Тонкая обёртка над мини-аппами Telegram, MAX и ВКонтакте.
 * Приложение работает и внутри мессенджеров, и как обычный сайт —
 * снаружи все методы просто ничего не делают или открывают ссылки в новой вкладке.
 */

type BackButton = { show: () => void; hide: () => void; onClick: (cb: () => void) => void; offClick: (cb: () => void) => void }

type TgWebApp = {
  ready: () => void
  expand: () => void
  close: () => void
  colorScheme: 'light' | 'dark'
  BackButton: BackButton
  HapticFeedback?: { impactOccurred: (s: string) => void; selectionChanged: () => void }
  openTelegramLink: (url: string) => void
  openLink: (url: string) => void
  setHeaderColor?: (c: string) => void
  platform?: string
}

type MaxWebApp = {
  initData?: string
  platform?: string
  BackButton?: BackButton
  openLink: (url: string) => void
  openMaxLink: (url: string) => void
}

type VkBridge = { send: (method: string, params?: Record<string, unknown>) => Promise<unknown> }

export type Platform = 'telegram' | 'max' | 'vk' | 'web'

const tg: TgWebApp | undefined = (window as any).Telegram?.WebApp
const max: MaxWebApp | undefined = (window as any).WebApp
const vk: VkBridge | undefined = (window as any).vkBridge

/** Мы действительно внутри Telegram, а не просто скрипт загрузился */
export const inTelegram = Boolean(tg && tg.platform && tg.platform !== 'unknown')

/** Внутри MAX: скрипт-мост создаёт window.WebApp, но с данными запуска — только в самом мессенджере */
export const inMax = !inTelegram && Boolean(max && max.initData)

/** Внутри ВКонтакте: ВК добавляет в адрес параметры запуска (vk_app_id, vk_platform, sign) */
const vkParams = new URLSearchParams(window.location.search)
export const inVk = !inTelegram && !inMax && Boolean(vk && vkParams.get('vk_app_id'))

export const platform: Platform = inTelegram ? 'telegram' : inMax ? 'max' : inVk ? 'vk' : 'web'

export function initTelegram() {
  if (inVk) vk?.send('VKWebAppInit').catch(() => {})
  if (!inTelegram || !tg) return
  tg.ready()
  tg.expand()
  tg.setHeaderColor?.('#F7F4EF')
}

export function setBackButton(visible: boolean, onBack: () => void) {
  const b = inTelegram ? tg?.BackButton : inMax ? max?.BackButton : undefined
  if (!b) return
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

function host(url: string) {
  try {
    return new URL(url).hostname
  } catch {
    return ''
  }
}

/** Уйти в бота. Ссылка уже содержит метку запуска, поэтому ничего не дописываем */
export function openBot(botUrl: string) {
  const h = host(botUrl)
  if (inTelegram && tg && (h === 't.me' || h === 'telegram.me')) tg.openTelegramLink(botUrl)
  else if (inMax && max && h === 'max.ru') max.openMaxLink(botUrl)
  else openExternal(botUrl)
}

export function openExternal(url: string) {
  if (inTelegram && tg) tg.openLink(url)
  else if (inMax && max) max.openLink(url)
  else window.open(url, '_blank', 'noopener')
}
