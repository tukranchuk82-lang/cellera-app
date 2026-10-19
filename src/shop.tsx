import { openExternal, haptic } from './lib/tg'
import { productById, productsMentioned, ozonUrl, wbUrl, type ProductId } from './data/shop'

/** Две кнопки «Ozon» и «Wildberries» для одного товара */
export function BuyChips({ id, label, caption }: { id: ProductId; label?: string; caption?: string }) {
  const p = productById(id)
  if (!p) return null
  const go = (url: string) => {
    haptic('light')
    openExternal(url)
  }
  return (
    <div className="buy-row">
      {label && <span className="buy-label">{label}</span>}
      <button className="buy-chip" onClick={() => go(ozonUrl(p.ozon))}>
        Ozon
      </button>
      <button className="buy-chip" onClick={() => go(wbUrl(p.wb))}>
        Wildberries
      </button>
      {caption && <span className="buy-caption">{caption}</span>}
    </div>
  )
}

/** Кнопки «купить» для биокомбинаций, которые упомянуты в тексте абзаца */
export function MentionedBuy({ text, skipIn }: { text: string; skipIn?: string }) {
  const skip = skipIn ? productsMentioned(skipIn) : []
  return (
    <>
      {productsMentioned(text)
        .filter((id) => !skip.includes(id))
        .map((id) => (
        <BuyChips key={id} id={id} label={productById(id)!.title.replace('Биокомбинация ', '№').replace('№FIVE', 'FIVE')} />
      ))}
    </>
  )
}
