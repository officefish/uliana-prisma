import { useSiteStore } from "@/providers/store";

import { Page } from "@/types";
import {
  FC,
  useEffect,
 
} from "react";


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

//   const { t } = useTranslation();

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

  return (
    <div  className="w-screen h-screen text-black text-3xl flex items-center justify-center">
      Друзья       
    </div>
  )
}

export default Friends
