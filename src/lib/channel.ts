/**
 * Приложение открывают из разных ботов (Telegram, VK, MAX).
 * Если бот при открытии передал канал в ссылке (?channel=vk&id=123),
 * запоминаем это на устройстве, чтобы в следующий раз сразу вести туда же.
 */

export type Channel = 'telegram' | 'vk' | 'max'

type Known = { channel: Channel; id?: string }

const STORAGE_KEY = 'cellera:channel'

function isChannel(v: string | null): v is Channel {
  return v === 'telegram' || v === 'vk' || v === 'max'
}

export function captureChannelFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const channel = params.get('channel')
  if (!isChannel(channel)) return
  rememberChannel(channel, params.get('id') ?? undefined)
}

export function rememberChannel(channel: Channel, id?: string) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ channel, id } satisfies Known))
  } catch {
    /* localStorage недоступен (приватный режим и т.п.) — просто не запоминаем */
  }
}

export function getKnownChannel(): Known | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Known) : null
  } catch {
    return null
  }
}
