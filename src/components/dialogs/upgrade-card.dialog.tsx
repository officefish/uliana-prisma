import { 
    FC, 
    useRef, 
    useEffect,
    useState, 
} from 'react'

import { IShopCard } from '@/types'
import { getNextIncome, getUpdatePrice } from '@/services/game.service'
import { getCardName } from '@/locale'

interface DialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onUpgradeClick: () => void
  card: IShopCard | null
}

const UpgradeCardDialog: FC<DialogProps> = (props) => {
  const { card, onUpgradeClick } = props
  
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
  } = props

  function onCancel(): void {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  const [upgradePrice, setUpgradePrice] = useState(1) 
  //const [income, setIncome] = useState(1)
  const [upgradeIncome, setUpgradeIncome] = useState(1)

  useEffect(() => { 
    setUpgradePrice(getUpdatePrice(card?.price || 1, card?.level || 1))
    //setIncome(getIncome(card?.income || 1, card?.level || 1))
    setUpgradeIncome(getNextIncome(card?.income || 1, card?.level || 1))
  }, [card])

  const [description, setDescription] = useState<string>("")

  useEffect(() => {
      if (!card?.description || !card.description.length) {
          setDescription("Описание отсутствует")
          return
      }
      setDescription(card.description)
  }, [card?.description])

  return (
        <dialog className='modal overflow-hidden' ref={modalRef}>
          <div className='w-full h-screen bottom-0 absolute'>
          <div className='shop-modal relative mt-[260px]'>
            <div className='absolute top-4 right-4 cursor-pointer' onClick={onCancel}>
              <img className='w-6 h-6' src="/shop/close.png" alt="close" />
            </div>
            <div className='w-full flex flex-col justify-center items-center pt-8'>
              <div className='flex items-center justify-center w-full p-4'>
                <img className='w-[200px] h-[200px]' src={card?.imageUrl} alt="" />
              </div>
                <div className='shop-dialog-title mt-2'>{getCardName(card?.name || '')}</div>
                <div className='shop-dialog-description mt-2'>{description}</div>
                <div className='h-6 flex flex-row items-center justify-center mt-4 shop-dialog-income'>
                  Прибыль в час: 
                  <span className='ml-8 mr-2'>+{upgradeIncome}</span>
                  <img className='w-[16px] h-[16px] ml-1' src="/home/coin.png" alt="" />
                </div>
                <div className="w-full flex flex-row items-center justify-center gap-2 pt-3">
                  <img className="w-10 h-10" src="/home/coin.png" alt="balance" />
                  <span className="balance-label">{upgradePrice}</span>
                </div>
             </div>
          </div>
        </div>
        <div className='absolute bottom-4 w-screen pl-6'>
              <div className='function-btn btn-no-body pt-6'
                onClick={onUpgradeClick}
                >Улучшить
              </div>
            </div>
    </dialog>
  )
}
export default UpgradeCardDialog