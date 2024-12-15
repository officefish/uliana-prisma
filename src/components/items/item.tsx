import { FC } from "react"
import { useTranslation } from "react-i18next"

interface IItemFragmentProps {
    title: string
    short: string
    path: string
    url: string
    handleClick: (id: string, key: string) => void
}

interface IItemProps {
    itemKey: string
    price: { value: number, type: string }
    onClick: (id: string, key: string) => void
}

export const ItemFragment: FC<IItemFragmentProps> = (props) => {
  const { title, short, path, url, handleClick } = props

    return (
    <div className="bg-purple-300 rounded-md h-56 cursor-pointer" 
        onClick={() => handleClick('someId', path)}>
        <div className="w-full flex items-center justify-center p-4"><img className="w-24 h-24 rounded-md" src={url} alt={title} /></div>
        <div className="text-center w-full px-2">
          <div className="text-xl font-bold">{title}</div>
          <div className="text-xs mt-2">{short}</div>
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
    path={`/fortunes/${itemKey}`}
    url={`/fortunes/${itemKey}.webp`}
    handleClick={onClick} 
    />
  )
}

