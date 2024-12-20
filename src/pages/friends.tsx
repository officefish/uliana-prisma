//import usePageNotifications from "@/hooks/usePageNotifications";
import usePageNotifications from "@/hooks/usePageNotifications";
import { useSiteStore } from "@/providers/store";

import { Page } from "@/types";
import {
  FC,
  useEffect,
 
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

  const { t } = useTranslation();

  return (
    <div className=" w-screen h-screen 
           text-[#240919]
    flex  
    items-center justify-center
    friends-bg">
      {notificationsEnabled && shouldShowNotification(FRIEND_PAGE) && (
        <div> 
          <div className="flex flex-col gap-3 w-full gray-glass mx-2 px-4 py-8">
          <div className="text-3xl text-bold w-full text-center">{t(`friends.title`)}</div>
          <div className="text-md w-full text-center">{t(`friends.description`)}</div>         
          <div className="btn btn-secondary m-4" onClick={() => handleConfirm()}>{t('additional.confirm').toUpperCase()}</div>
        </div>
        
      </div>
      )}

      {!notificationsEnabled || !shouldShowNotification(FRIEND_PAGE) && (
        <div className="italic w-full text-center text-pink-100 px-4">
          Самый верный и едва ли не единственный способ стать счастливым — это вообразить себя таким (Василий Ключевский).
      </div>)}
    </div>
  )}

export default Friends
