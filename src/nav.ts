export type TabId = 'home' | 'intro' | 'help' | 'buy' | 'consult'

export type View =
  | { k: 'tab'; tab: TabId }
  | { k: 'group'; id: string }
  | { k: 'condition'; slug: string }
  | { k: 'salts' }
  | { k: 'salt'; n: number }
  | { k: 'cheats' }
  | { k: 'about' }

export type Nav = {
  push: (v: View) => void
  pop: () => void
  go: (tab: TabId) => void
}

export const TABS: { id: TabId; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'intro', label: 'О солях' },
  { id: 'help', label: 'Помощь' },
  { id: 'buy', label: 'Купить' },
  // { id: 'consult', label: 'Вопрос' }, // скрыто: пока не показываем ИИ-консультации
]
