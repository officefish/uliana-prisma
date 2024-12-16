import { FC } from "react"
import { useTranslation } from "react-i18next"

interface IItemFragmentProps {
    title: string
    short: string
    itemKey: string
    url: string
    handleClick: (id: string, key: string) => void
}

interface IItemProps {
    key: string | number
    itemKey: string
    price: { value: number, type: string }
    onClick: (id: string, key: string) => void
}

export const ItemFragment: FC<IItemFragmentProps> = (props) => {
  const { title, short, itemKey, url, handleClick } = props

    return (
    <div className="bg-fuchsia-200 rounded-md cursor-pointer btn-no-body
     border-purple-500
    hover:border-pink-700 border-2 select-none" 
        onClick={() => handleClick('someId', itemKey)}>
        <div className="w-full flex items-center justify-center p-2"><img className="w-24 h-24 rounded-md" src={url} alt={title} /></div>
        <div className="text-center w-full px-2">
          <div className="text-lg font-bold mb-1">{title}</div>
          <div className="text-xs mb-2">{short}</div>
        </div>
        
    </div>
  )
}

export const FortuneItem: FC<IItemProps> = (props) => {
    const { itemKey, onClick } = props

    console.log('FortuneItem props:', props)

    const {t} = useTranslation()

    return (
    <ItemFragment 
    title={t(`fortunes.${itemKey}.title`)} 
    short={t(`fortunes.${itemKey}.short`)}
    itemKey={itemKey}
    url={`/fortunes/${itemKey}.webp`}
    handleClick={onClick} 
    />
  )
}

