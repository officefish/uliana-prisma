//import usePageNotifications from "@/hooks/usePageNotifications";
//import { useUpdateActions } from "@/hooks/api/actions/useUpdateActions";
//import { useUpdateRecieved } from "@/hooks/api/actions/useUpdatedRecieved";
import { useUpdateActions } from "@/hooks/api/actions/useUpdateActions";
import { useUpdateRecieved } from "@/hooks/api/actions/useUpdatedRecieved";
import usePreloadResources from "@/hooks/preload-resources";
import usePageNotifications from "@/hooks/usePageNotifications";
import { useActionsStore } from "@/providers/actions";
import { useSiteStore } from "@/providers/store";
import { apiFetch } from "@/services/api";
//import { apiFetch } from "@/services/api";

import { Page } from "@/types";
import { 
  IAction, 
  //IActionTemplate 
} from "@/types/action";
import {
  FC,
  useEffect,
  useState,
 
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
//import { useTranslation } from "react-i18next";

const FRIEND_PAGE = "friend_page"

const Friends: FC = () => {

  const { setPage, setIsEmptyPage } = useSiteStore()

  useEffect(() => {
    setIsEmptyPage(false)
    setPage(Page.FRIENDS)
  }, [])

  useEffect(() => {
    if (FRIEND_PAGE) {
      setCurrentPage(FRIEND_PAGE);
    }
  }, [FRIEND_PAGE]);

  const {
    notificationsEnabled,
    shouldShowNotification,
    closeNotification,
    setCurrentPage
  } = usePageNotifications();
  
  const handleConfirm = () => {
    closeNotification(FRIEND_PAGE)
  }

  const { updateActions } = useUpdateActions(apiFetch);
  const { updateRecieved } = useUpdateRecieved(apiFetch);

  const { 
    //reloadResources 
  } = usePreloadResources(updateActions, updateRecieved);

  const { t } = useTranslation();

  const { 
    actions, 
    received } = useActionsStore()

  const [fullActions, setFullActions] = useState<IAction[]>([])  

  useEffect(() => {
    const filteredActions = actions.filter(action => action.targetId !== undefined);
    setFullActions(filteredActions);  
  }, [actions])

  useEffect(() => {
    const bgImageUrl = "https://kubiki.io/public/bg/friends-2.webp";
    // Изменяем переменную в :root
    document.documentElement.style.setProperty("--bg-image", `url(${bgImageUrl})`);
  }, []);
  
  return (
      <>
      {notificationsEnabled && shouldShowNotification(FRIEND_PAGE) && (
        <div className="flex items-center justify-center"> 
          <div className="flex flex-col gap-3 w-full gray-glass mx-2 px-4 py-8">
          <div className="text-3xl text-bold w-full text-center">{t(`friends.title`)}</div>
          <div className="text-md w-full text-center">{t(`friends.description`)}</div>         
          <div className="btn btn-secondary m-4" onClick={() => handleConfirm()}>{t('additional.confirm').toUpperCase()}</div>
        </div>
        
      </div>
      )}

      {!notificationsEnabled || !shouldShowNotification(FRIEND_PAGE) && (
        <ActionsList outgoing={fullActions} incoming={received} />
      )}
    </>
  )}

export default Friends

interface IActionList {
  outgoing: IAction[]
  incoming: IAction[]
}

const ActionsList: FC<IActionList> = (props) => {
  
  const { outgoing, incoming } = props
  const [isRecieved, setIsReceived] = useState<boolean>(false)

  const { setFairyAction, setMode } = useActionsStore()
  
  const navigate =  useNavigate()

  const handleIncomingAction = (action: IAction) => {
    setFairyAction(action)
    setMode('incoming')
    navigate('/action')
  }

  const handleOutgoingAction = (action: IAction) => {
    setFairyAction(action)
    setMode('outgoing')
    navigate('/action')
  }

  return (
        <>
          <div className="tabs-bg w-screen absolute top-16 z-10">
            <div role="tablist" className="tabs tabs-lifted tabs-lg">    
            <div
              role="tab"
              className={`tab text-sm text-white ${ !isRecieved ? `
                tab-active
                text-[#63214b]
                [--tab-bg:#DDD] 
                [--tab-border-color:#AAA] 
                text-nowrap
                min-w-32
                ` : ''}`}
              onClick={() => setIsReceived(!isRecieved) }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 3H21V9M21 3L10 14M3 10V21H14" />
              </svg>
              <span className="ml-2">Ваши действия</span>
            </div>
            <div
              role="tab"
              className={`tab text-sm text-white ${ isRecieved ? `
                text-[#63214b]
                tab-active 
                [--tab-bg:#DDD] 
                [--tab-border-color:#AAA] 
                text-nowrap 
                min-w-32
                ` : ''}`}
              onClick={() => setIsReceived(!isRecieved) }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 21H3V15M3 21L14 10M21 14V3H10" />
              </svg>
              <span className="ml-2">Действия к вам</span>
            </div>
          </div>
        </div>  
        
        <section className="pt-2 mt-32 w-full text-center overflow-y-scroll z-0">
       
          {isRecieved ? (
              <div className="pb-36 px-4"
              >{incoming?.map((action: IAction, index) => (
                <ActionPlayer key={index} action={action} onClick={handleIncomingAction}/>
              ))}
            </div> 
            ) : (
              <ul className="pb-36 px-4">
                {outgoing?.map((action, index) => (
                  <ActionTarget key={index} action={action} onClick={handleOutgoingAction}/>
                ))}
              </ul>
            )
          }
      </section>

    </>
  )
}

interface IActionProps {
  action: IAction
  onClick: (action: IAction) => void
}

const ActionTarget:FC<IActionProps> = (props) => {

  const { action, onClick } = props;

  const { t } = useTranslation()
  const tag = action?.template?.type.toLocaleLowerCase();

  const firstName = action.target?.tgAccount?.firstName || ""
  const lastName = action.target?.tgAccount?.lastName || ""
  const fullName = `${firstName} ${lastName}`
  const username = action.target?.tgAccount?.username || ""

  return (
    <li className="bg-glass-xl shadow-xl rounded-box h-16 my-2
    grid grid-cols-4 btn-no-body select-none
    " onClick={() => onClick(action)}>
      <div className="h-full mt-1 col-span-3 text-start pl-4">
        <h2 className="text-secondary text-2xl whitespace-nowrap">
          {t(`fortunes.${tag}.action.title`)}
        </h2>
        <div className="text-secondary text-xs italic w-full whitespace-nowrap overflow-x-hidden">кому {`${fullName} aka @${username}` }</div>
      </div>
      <figure className="w-full flex items-center justify-end pr-2">
        <span className="text-4xl">{getEmodji(action?.template?.type || '')}</span>  
      </figure>
    </li>
  )
}

const ActionPlayer:FC<IActionProps> = (props) => {

  const { action, onClick } = props;

  const { t } = useTranslation()
  const tag = action?.template?.type.toLocaleLowerCase();

  const firstName = action.player?.tgAccount?.firstName || ""
  const lastName = action.player?.tgAccount?.lastName || ""
  const fullName = `${firstName} ${lastName}`
  const username = action.player?.tgAccount?.username || ""

  return (
    <li className="bg-glass-xl shadow-xl rounded-box h-16 my-2
    grid grid-cols-4 btn-no-body select-none
    " onClick={() => onClick(action)}>
      <div className="h-full mt-1 col-span-3 text-start pl-4">
        <h2 className="text-secondary text-2xl whitespace-nowrap">
          {t(`fortunes.${tag}.action.title`)}
        </h2>
        <div className="text-secondary text-xs italic w-full whitespace-nowrap overflow-x-hidden">от {`${fullName} aka @${username}` }</div>
      </div>
      <figure className="w-full flex items-center justify-end pr-2">
        <span className="text-4xl">{getEmodji(action?.template?.type || '')}</span>  
      </figure>
    </li>
  )
}

function getEmodji(type: string) {
  switch (type) {
    case 'BAWDRY':
      return '🤺';
    case 'KINDNESS':
      return '🧸';
    default:
      return '';
  }
}
