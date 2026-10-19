/** Карточки товаров на Ozon и Wildberries — единая точка правки */

export type ProductId = string // 's1'…'s12' соли, 'b1'…'b28' биокомбинации, 'five3', 'five6', 'set12'

export type Product = {
  id: ProductId
  title: string
  /** потенция товара в продаже, если указана в названии карточки */
  potency?: string
  ozon: number
  wb: number
}

export const ozonUrl = (id: number) =>
  `https://www.ozon.ru/product/${id}/?utm_source=cellera_bot&utm_campaign=vendor_org_2279634_bot`
export const wbUrl = (id: number) => `https://www.wildberries.ru/catalog/${id}/detail.aspx?utm_source=cellera_bot&utm_campaign=bot`

const SALT_ROWS: [number, string | undefined, number, number][] = [
  [1, '12X', 3824629719, 280083070],
  [2, undefined, 3824534055, 281112110],
  [3, '12X', 4180223206, 281112105],
  [4, '6X', 3824611538, 281112113],
  [5, '6X', 3824725965, 281112107],
  [6, '6X', 4180299332, 281112106],
  [7, '6X', 3824648937, 281112108],
  [8, undefined, 3824577719, 281112114],
  [9, '6X', 3824653953, 281112109],
  [10, '6X', 4180304536, 281112104],
  [11, undefined, 3824558703, 281112111],
  [12, '6X', 4180292512, 281112112],
]

const SALT_LATIN = [
  'Calcarea fluorica',
  'Calcarea phosphorica',
  'Ferrum phosphoricum',
  'Kali muriaticum',
  'Kali phosphoricum',
  'Kali sulphuricum',
  'Magnesium phosphoricum',
  'Natrum muriaticum',
  'Natrum phosphoricum',
  'Natrum sulphuricum',
  'Silicea',
  'Calcarea sulphurica',
]

const BIO_ROWS: [number, string, number, number][] = [
  [1, 'Анемия', 2937265961, 556230278],
  [2, 'Астма', 2937265920, 556230316],
  [3, 'Колики', 2937265979, 556230282],
  [4, 'Запор', 2937265862, 556230311],
  [5, 'Насморк', 2937265734, 556230276],
  [6, 'Кашель, простуда, катар', 2937265717, 556230284],
  [7, 'Диабет', 2937266006, 556230325],
  [8, 'Диарея', 2937266002, 556230279],
  [9, 'Дизентерия', 2937265752, 556230272],
  [10, 'Гипертрофия миндалин', 2937265695, 556230310],
  [11, 'Лихорадка', 2937265849, 556230273],
  [12, 'Головная боль', 2937265700, 556230283],
  [13, 'Бели, лейкорея', 2937265917, 556230302],
  [14, 'Корь', 2937265628, 556230327],
  [15, 'Нарушения менструального цикла', 2937265947, 556230317],
  [16, 'Нервно-психическое истощение', 2937265618, 556230275],
  [17, 'Геморрой', 2937265975, 556230304],
  [18, 'Пародонтит', 2937266008, 556230285],
  [19, 'Боли в суставах', 2937265874, 556230305],
  [20, 'Болезни кожи', 2937265557, 556230274],
  [21, 'Проблемы с зубами', 2937265637, 556230281],
  [22, 'Скрофулез', 2937265728, 556230319],
  [23, 'Зубная боль', 2937265720, 556230313],
  [24, 'Тоник для нервов и мозга', 2937266011, 556230271],
  [25, 'Кислотность, вздутие, несварение', 2937265732, 556230322],
  [26, 'Легкие роды', 2937265749, 556230277],
  [27, 'Недостаток энергии', 2937265675, 556230280],
  [28, 'Тоник здоровья, Биоплазма', 2937265745, 556230320],
]

export const PRODUCTS: Product[] = [
  ...SALT_ROWS.map(([n, potency, ozon, wb]) => ({
    id: `s${n}`,
    title: `Соль Шюсслера №${n} ${SALT_LATIN[n - 1]}${potency ? ` ${potency}` : ''}`,
    potency,
    ozon,
    wb,
  })),
  ...BIO_ROWS.map(([n, name, ozon, wb]) => ({ id: `b${n}`, title: `Биокомбинация №${n} ${name}`, ozon, wb })),
  { id: 'five3', title: 'Биокомбинация FIVE PHOS 3X', ozon: 2937265832, wb: 556230324 },
  { id: 'five6', title: 'Биокомбинация FIVE PHOS 6X', ozon: 2937265685, wb: 556230306 },
  { id: 'set12', title: 'Набор солей Шюсслера 12 шт', ozon: 3824587651, wb: 281112103 },
]

export const productById = (id: ProductId) => PRODUCTS.find((p) => p.id === id)

/** Какие биокомбинации и FIVE PHOS упомянуты в тексте (для ссылок «купить» под абзацем) */
export function productsMentioned(text: string): ProductId[] {
  const found: ProductId[] = []
  const add = (id: ProductId) => {
    if (productById(id) && !found.includes(id)) found.push(id)
  }
  for (const m of text.matchAll(/[Бб]иокомбинаци\S*\s*[—-]?\s*№\s*(\d{1,2})/g)) add(`b${m[1]}`)
  if (/FIVE PHOS\s*3X/i.test(text)) add('five3')
  if (/FIVE PHOS[^.]*6X/i.test(text)) add('five6')
  return found
}
