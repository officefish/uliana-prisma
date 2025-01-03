// import { FortuneItem } from "@/components/items/item";
// import usePageNotifications from "@/hooks/usePageNotifications";
// import { useActionsStore } from "@/providers/actions";
// import { useFortuneStore } from "@/providers/fortunes";
import { useActionsStore } from "@/providers/actions"
import { useSiteStore } from "@/providers/store"
import { Page } from "@/types"
import { FC, useEffect, useState } from "react"
import { getActionBgSrcByKey } from "@/services/action.service"
import SolarSystem from "@/components/fortunes/solar-system"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import DetailsSelect from "@/components/additional/details.select"

const Action: FC = () => {

  const { setPage, setIsEmptyPage } = useSiteStore()
  useEffect(() => {    
    setPage(Page.ACTION)
    setIsEmptyPage(true)
    return () => {
        setIsEmptyPage(false)
    }
  }, [])

  const [
    actionType
    , setActionType ] = useState<string>('')
  const [element, setElement] = useState<string>('') 

  const { fairyAction, mode} = useActionsStore()
  useEffect(() => {
    //console.log(fairyAction)

    // Parse action key here and load ation content depends on action 

    if (fairyAction) {

      const fragments = fairyAction.key?.split(':') || []
      const type = fragments[0]

      if (type) {
        setActionType(type)
      }

      const element = fragments[1]
      if (element) {
        setElement(element)
      }
  
      const bgImageUrl = getActionBgSrcByKey(fairyAction.key || ""); //
      //"/fortunes/lantern/venus.jpg"
      // Изменяем переменную в :root
      document.documentElement.style.setProperty("--bg-image", `url(${bgImageUrl})`)
    }

  }, [fairyAction])

  const [player, setPlayer] = useState<string>("")

  useEffect(() => { 

    if (!fairyAction) return

    if (mode === "incoming") {
      const firstName = fairyAction.player?.tgAccount?.firstName || ""
      const lastName = fairyAction.player?.tgAccount?.lastName || ""
      const fullName = `${firstName} ${lastName}`
      const username = fairyAction.player?.tgAccount?.username || ""

      setPlayer(`${fullName} aka ${username}`)

    } else if (mode === "outgoing") {

      const firstName = fairyAction.target?.tgAccount?.firstName || ""
      const lastName = fairyAction.target?.tgAccount?.lastName || ""
      const fullName = `${firstName} ${lastName}`
      const username = fairyAction.target?.tgAccount?.username || ""

      setPlayer(`${fullName} aka ${username}`)

    }
  }, [mode, fairyAction])

  const { t } = useTranslation()

  const navigate = useNavigate()

  const handleClose = () => {
    navigate(-1)
  }

  const onCancelClick = () => {
    navigate(-1)
  }

  const [
    checked, 
    setChecked
  ] = useState(false);

 
  return (

    <>

    {/* Close button */}
      <div className="absolute top-5 right-5 z-10 btn-no-body opacity-40 hover:opacity-90"
        onClick={handleClose}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" 
          fill="#1ff7ba"/>
          </svg>
      </div>

     { checked ? (
      <div className="
      w-full absolute top-32 bg-[#a1e9d4] bg-opacity-80 
      text-black 
      font-semibold italic text-md px-4
      ">
        <hr id="hr-fancy"></hr>
        <div dangerouslySetInnerHTML={{__html: t(`fortunes.${actionType}.${element}`)}} ></div>
        <hr id="hr-fancy"></hr>

      </div>
    ) : (
      <div className="w-screen h-screen bg-glass-xl">
        <div className='shop-dialog-title mt-16 uppercase px-2 select-none'>
          {t('fortunes.lantern.title')}</div>
        <div className='shop-dialog-description mt-2 uppercase px-2 select-none'>
          {t('fortunes.lantern.short')}</div>
         <div className="w-full mt-32">
            <div className="absolute 
              top-44 left-0 
              w-full flex items-center justify-center -z-10">
              <img className="w-[50%] border-4 border-[#1ff7ba]" src="/fortunes/lantern.webp" alt="bawdry"></img>
            </div>
            <SolarSystem />
            <div className="
              h-32 flex items-center justify-center 
              green-breathe-animation 
              w-full mt-12 select-none
              ">
              <span>{element}</span>
            </div>
            <div className="text-[#8cbda6] w-full text-center text-sm mt-2">
              { mode === 'incoming' ? (
                <span>Игрок {player} пожелал(а) вам</span>
              ) : (
                <span>Вы пожелали игроку {player}</span>
              )}
            </div>
            <div className="
              w-full shop-dialog-description italic mt-4">{t(`fortunes.lantern.wishes.${element}`).toUpperCase()}</div>
            </div>
            <div className="flex flex-row items-center justify-center gap-4 px-2 mt-4">
            <div className="btn btn-accent bg-[#1ff7ba] btn-xl btn-md flex flex-row gap-2" 
            //onClick={onSendClick}
          >
          {t('additional.response').toUpperCase()}
          <img className="w-6 h-6" src="/additional/telegram-white.svg" alt="telegram" />
          </div>
          <div className="btn btn-info btn-xl btn-md flex flex-row gap-2" 
            onClick={onCancelClick}
          >{t('additional.forget').toUpperCase()}
          <img className="w-4 h-4" src="/additional/garbage.svg" alt="telegram" />
        </div>
      </div>
    </div>    
    )}

    <DetailsSelect checked={checked} setChecked={setChecked} />
   
  </>     
      
   )
}
export default Action
