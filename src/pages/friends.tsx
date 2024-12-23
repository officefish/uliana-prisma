//import usePageNotifications from "@/hooks/usePageNotifications";
import { useUpdateActions } from "@/hooks/api/actions/useUpdateActions";
import usePageNotifications from "@/hooks/usePageNotifications";
import { useActionsStore } from "@/providers/actions";
import { useSiteStore } from "@/providers/store";
import { apiFetch } from "@/services/api";

import { Page } from "@/types";
import { IAction } from "@/types/action";
import {
  FC,
  useEffect,
  useState,
 
} from "react";
import { useTranslation } from "react-i18next";
//import { useTranslation } from "react-i18next";

const FRIEND_PAGE = "friend_page"

const Friends: FC = () => {

  const { setPage} = useSiteStore()

  useEffect(() => {
      setPage(Page.FRIENDS)

  }, [setPage])

//   const {
//     referralsPage,
//     referralsTotal,
//     referralsCode,
//     getRefferals,
//     claimedAll
//   } = useUserStore()

//  const [referrals, setReferrals] = useState<IReferral[]>()
//  const [claimBlocked, setClaimBlocked] = useState<boolean>(false)

//  const { updateReferrals } = useUpdateReferrals(apiFetch, referralsPage, 10)

//   const onClaimAllSuccess = () => {
//     setClaimBlocked(true)
//     updateReferrals()
//   }

//   const [bauntyLoading, setBauntyLoading] = useState(false)

//  const { claimBauntyForAll } = useClaimBauntyForAllFriends(apiFetch, setBauntyLoading, onClaimAllSuccess)

//   useEffect(() => {

//     if (referralsTotal) {
//       setReferrals(getRefferals(referralsPage)) //
//       setIsFooterTransparent(false)
//     }

//     if (referralsCode) {
//       //console.log('code:', referralsCode)
//       const message = 'Открывай сундуки и получай классные награды: токены, новые ключи и даже криптовалюты!'
//       const url = `https://t.me/Toncases_game_bot/Toncases?startapp=referrerId=${referralsCode}`
//       setReferralUrl(url)
//       const tUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
//       setTelegramUrl(tUrl)
//     }


//   }, [referralsPage,
//     referralsTotal,
//     referralsCode,
//     getRefferals
//   ])

//   const [referralUrl, setReferralUrl] = useState("link/ref=userandranders03Hf72nf5Nfa941412")
//   const [telegramUrl, setTelegramUrl] = useState("")

//   const handleShare = () => {
//      window.open(telegramUrl, '_blank');
//   };


//   const handleCopy = () => {
//     // Using the Clipboard API to copy text
//     if (navigator.clipboard) {
//       // Use Clipboard API if available
//       navigator.clipboard.writeText(referralUrl)
//         .then(() => {
//           alert("Text copied to clipboard!");
//         })
//         .catch(err => {
//           console.error("Error copying text: ", err);
//           fallbackCopyText(referralUrl);
//         });
//     } else {
//       // Fallback method
//       fallbackCopyText(referralUrl);
//     }
//   }

//   const fallbackCopyText = useCallback((text: string) => {
//     const textArea = textAreaRef.current;
//     if (textArea) {
//       textArea.value = text;
//       textArea.select();
//       try {
//         document.execCommand('copy');
//         //alert("Text copied using fallback!");
//       } catch (err) {
//         //console.error('Fallback: Oops, unable to copy', err);
//       }
//     } else {
//       //console.error('Fallback: Text area reference is null');
//     }
//   }, [])

//   const handleClaimedAll = () => {
//     if (!bauntyLoading) claimBauntyForAll(1, 10)
//   }

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

  const { updateActions } = useUpdateActions(apiFetch)
  useEffect(() => {
    updateActions()
  }, [])

  const { t } = useTranslation();

  const { 
    actions, 
    received } = useActionsStore()

  const [fullActions, setFullActions] = useState<IAction[]>([])  

  useEffect(() => {
    const filteredActions = actions.filter(action => action.targetId !== undefined);
    setFullActions(filteredActions);  
  }, [actions])
  
  // useEffect(() => {
  //   console.log("actions:" + actions)
  //   console.log("recieved:" + received)

  // }, [actions, received ])

  const [isRecieved, setIsReceived] = useState<boolean>(false)
  
  return (
      <div
      className="absolute top-0 w-screen h-screen 
      text-[#240919]
        friends-bg
        "
      >

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
      //   <div className="italic w-full text-center text-pink-900 px-4">
      //     Самый верный и едва ли не единственный способ стать счастливым — это вообразить себя таким (Василий Ключевский).
      // </div>
      
      <div>

          <div className="tabs-bg w-full px-4">
              <div role="tablist" className="tabs tabs-lifted tabs-lg mt-16 ">    
              <div
                role="tab"
                className={`tab text-sm text-white ${ !isRecieved ? `
                  tab-active
                  text-[#63214b]
                  [--tab-bg:#DDD] 
                  [--tab-border-color:#AAA] 
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
          
          

          <section className="pt-2 w-full bg-[#DDD] text-center overflow-y-scroll">
         
            {isRecieved ? (
                <div>{received?.map((action: IAction, index) => (
                  <div key={index}><h3 className="text-lg ">{action?.template?.type}</h3></div>
                ))}
              </div> 
              ) : (
                <div>
                  {fullActions?.map((action, index) => (
                    <div key={index}><h3 className="text-lg">{action?.template?.type}</h3></div>
                  ))}
                </div>
              )
            }
        </section>

      </div>
        

    

      

    )}
    </div>
  )}

export default Friends
