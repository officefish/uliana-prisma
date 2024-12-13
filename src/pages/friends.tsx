import { useSiteStore } from "@/providers/store";
import { useUserStore } from "@/providers/user";
import { apiFetch } from "@/services/api";
import { useClaimBauntyForFriend } from "@/hooks/api/useClaimBauntyForFriend";
import { useClaimBauntyForAllFriends } from "@/hooks/api/useClaimBauntyForAllFriends";
import { IReferral, Page } from "@/types";
import {
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import useUpdateReferrals from "@/hooks/api/useUpdateReferrals";
import { useTranslation } from "react-i18next";


const Friends: FC = () => {

  const { setPage, setIsFooterTransparent, pageNotifications, setPageNotifications } = useSiteStore()
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
      setPage(Page.FRIENDS)

      setPageNotifications(pageNotifications.filter((value) => value !== Page.FRIENDS))
  }, [setPage])

  useEffect(() => {
    setIsFooterTransparent(true);
  }, [setIsFooterTransparent]);

  const {
    referralsPage,
    referralsTotal,
    referralsCode,
    getRefferals,
    claimedAll
  } = useUserStore()

 const [referrals, setReferrals] = useState<IReferral[]>()
 const [claimBlocked, setClaimBlocked] = useState<boolean>(false)

 const { updateReferrals } = useUpdateReferrals(apiFetch, referralsPage, 10)

  const onClaimAllSuccess = () => {
    setClaimBlocked(true)
    updateReferrals()
  }

  const [bauntyLoading, setBauntyLoading] = useState(false)

 const { claimBauntyForAll } = useClaimBauntyForAllFriends(apiFetch, setBauntyLoading, onClaimAllSuccess)

  useEffect(() => {

    if (referralsTotal) {
      setReferrals(getRefferals(referralsPage)) //
      setIsFooterTransparent(false)
    }

    if (referralsCode) {
      //console.log('code:', referralsCode)
      const message = 'Открывай сундуки и получай классные награды: токены, новые ключи и даже криптовалюты!'
      const url = `https://t.me/Toncases_game_bot/Toncases?startapp=referrerId=${referralsCode}`
      setReferralUrl(url)
      const tUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
      setTelegramUrl(tUrl)
    }


  }, [referralsPage,
    referralsTotal,
    referralsCode,
    getRefferals
  ])

  const [referralUrl, setReferralUrl] = useState("link/ref=userandranders03Hf72nf5Nfa941412")
  const [telegramUrl, setTelegramUrl] = useState("")

  const handleShare = () => {
     window.open(telegramUrl, '_blank');
  };

  const { t } = useTranslation();

  const handleCopy = () => {
    // Using the Clipboard API to copy text
    if (navigator.clipboard) {
      // Use Clipboard API if available
      navigator.clipboard.writeText(referralUrl)
        .then(() => {
          alert("Text copied to clipboard!");
        })
        .catch(err => {
          console.error("Error copying text: ", err);
          fallbackCopyText(referralUrl);
        });
    } else {
      // Fallback method
      fallbackCopyText(referralUrl);
    }
  }

  const fallbackCopyText = useCallback((text: string) => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.value = text;
      textArea.select();
      try {
        document.execCommand('copy');
        //alert("Text copied using fallback!");
      } catch (err) {
        //console.error('Fallback: Oops, unable to copy', err);
      }
    } else {
      //console.error('Fallback: Text area reference is null');
    }
  }, [])

  const handleClaimedAll = () => {
    if (!bauntyLoading) claimBauntyForAll(1, 10)
  }

  return (
    <div  className="overflow-x-hidden pb-48 tasks-list z-0 pt-1.5">
        {/* Friends header */}
        <div className='shop-dialog-title mt-8 uppercase px-2'>{t('friends.title')}</div>
        <div className='mt-3 shop-dialog-description px-2'>
        {t('friends.description')}
        </div>
        {/* Friends banner */}
        <div className="pt-4 mx-1 px-3">
          <div className="friends-banner flex flex-row items-center justify-between py-2">
            <div className="flex flex-col items-center w-full gap-1.5">
              <div className="
              w-full text-center friends-banner-title px-4">{t('friends.telegram')}</div>
              <div className="friend-banner-baunty flex flex-row
              items-center justify-center gap-1">
                <img className="w-6 h-6" src="/stats/coin.webp" alt="" />
                +1 250
              </div>
              <div className="friend-banner-description w-full">{t('friends.complex_baunty')}</div>
            </div>
            <div className="flex flex-col items-center w-full gap-1.5">
              <div className="w-full text-center friends-banner-title px-4">{t('friends.telegram_premium')}</div>
              <div className="friend-banner-baunty flex flex-row
              items-center justify-center gap-1">
                <img className="w-6 h-6" src="/stats/coin.webp" alt="" />
                +3 200
              </div>
              <div className="friend-banner-description w-full">{t('friends.complex_baunty')}</div>
            </div>
          </div>
        </div>
        {/* Friends list */}
        <div className="w-full px-4 pt-6 friends-list-label flex flex-row items-center justify-between">
          <div>{t('friends.friends_list_label')}</div>
          <div>{referrals?.length && !claimedAll && <div className="
          invite-friends-btn
          btn-no-body
          w-24 flex flex-row gap-1 items-center justify-center
          px-3 py-2
          claim-all-btn
          "
            onClick={handleClaimedAll}
            >{t('additional.claim_all')}
              <img className="w-4 h-4" src="/friends/claim-check.svg" alt="claim" />
            </div>}
          </div>
        </div>
        {referrals
          ? <><FriendsList friends={referrals} claimBlocked={claimBlocked} /></>
          : <div className="mx-1 mt-4 flex items-center justify-center gap-2 h-16 no-friends-slot">
            {t('friends.no_friends')} 😔
            </div>
        }
         <div className='friends-btns fixed bottom-28 mb-1 w-screen px-3 flex flex-row justify-between gap-3'>
        <div className='
        invite-friends-btn
        w-full btn-no-body
        flex flex-row items-center justify-center
        gap-2 text-nowrap
        px-5 py-4
        '
          onClick={handleShare}
          >{t('friends.invite')}
        </div>
        <div className='
        invite-friends-btn btn-no-body
        w-20 flex items-center justify-center
        px-5 py-4
        '
           onClick={handleCopy}
           >
          <img className="w-8 h-8" src="/friends/copy.svg" alt="copy" />
        </div>
      </div>
    </div>
  )
}

export default Friends

interface UserItemProps {
  player: IReferral
  index: number
  onClaimClick: (referralId: string) => void
  claimBlocked: boolean
}

interface FriendsListProps {
  friends: IReferral[]
  claimBlocked: boolean
}

const FriendsList: FC<FriendsListProps> = (props) => {
  const { friends } = props

  const [bauntyLoading, setBauntyLoading] = useState(false)

  const { claimBaunty } = useClaimBauntyForFriend(apiFetch, setBauntyLoading) //
  const handleClaim = (referralId: string) => {
    if (!bauntyLoading) {
      console.log(referralId)
      claimBaunty(referralId)
    }
  }

  const { t } = useTranslation();

  return <div className="mx-1 mt-4 px-3 z-0">
    <div className="friends-list flex flex-col">
    <div className="overflow-x-auto">
      <table className="table">
      <thead>
      <tr>
        <th className="w-[5%]">№</th>
        <th className="w-[50%]">{t('friends.player')}</th>
        <th className="w-[20%] text-center">{t('friends.bonus')}</th>
        <th className="w-[25%]"></th>
      </tr>
      </thead>
      <tbody>
        {friends.map((friend, i) => <UserItem
        key={i}
        player={friend}
        index={i}
        onClaimClick={handleClaim}
        claimBlocked={props.claimBlocked}
        />)}
      </tbody>
      </table>
    </div>
    </div>
  </div>
}

const UserItem: FC<UserItemProps> = (props) => {
  const { player, index, onClaimClick } = props

  const [fullName, setFullName] = useState<string>("")
  useEffect(() => {
    const firstName = player.firstName || ""
    const lastName = player.lastName || ""
    setFullName(firstName + " " + lastName)
  }, [player.firstName, player.lastName])

  const { t } = useTranslation();

  return  (
  <tr className="friends-slot">
    <th>{index + 1}</th>
    <th>
     <div>{fullName}</div>
    </th>
    <th className="flex flex-row gap-1 items-center justify-end">
      <img className="w-5 h-5" src="/stats/coin.webp" alt="" />
      <div className="friend-slot-baunty">7.4K</div>
    </th>
    <th>
      {player.referrerRewarded || props.claimBlocked ? null
      : <div
          className="claim-btn btn-no-body"
          onClick={() => onClaimClick(player.id || "")}>
          {t('additional.claim')}
          <img className="w-3 h-3" src="/friends/claim-check.svg" alt="claim"/>
        </div>
      }
    </th>
  </tr>)
}

