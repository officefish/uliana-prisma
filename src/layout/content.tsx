import GameStats from "@/components/game.stats";
import { useBuyGems } from "@/hooks/api/useBuyGems";
import { useNewWithdrawProposal } from "@/hooks/api/useNewWithdrawProposal";
import { useSimpleBuyGems } from "@/hooks/api/useSimpleBuyGems";
import { useSiteStore } from "@/providers/store";
import { useUserStore } from "@/providers/user";
import { apiFetch } from "@/services/api";
import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ModalTutorial from "@/components/modal.tutorail.tsx";
import {useWalletStore} from "@/providers/wallet";
import {SendTransactionResponse, useTonConnectUI, useTonWallet, Wallet} from "@tonconnect/ui-react";
import {Cell} from "@ton/core";
import {useRegisterTestTransaction} from "@/hooks/api/useRegisterTestTransaction.tsx";
import {DefaultTx} from "@/const/test.transaction.tsx";

import { useTranslation } from "react-i18next";
import LocaleSwitcher from "@/i18n/LocaleSwitcher";
import usePageNotifications from "@/hooks/usePageNotifications";
import Header from "./header";
//import { useUpdateActions } from "@/hooks/api/actions/useUpdateActions";


const Content: FC <PropsWithChildren> = ({ children }) => {
  
    const { 
      gemShopOpen, 
      setGemShopOpen,
      withdrawOpen,
      setWithdrawOpen,
      menuOpen,
      setMenuOpen,
      menuTutorialOpen,
      setMenuTutorialOpen
    } = useSiteStore()
    
    const onSimpleBuyGemsSuccess = () => {
      setGemShopOpen(false)
    }
    const { simpleBuyGems } = useSimpleBuyGems(apiFetch, onSimpleBuyGemsSuccess)

    const onBuyGemsSuccess = (invoiceLink: string, numGems: number) => {
      console.log('Invoice link:', invoiceLink);
      window.Telegram.WebApp.openInvoice(invoiceLink, (status) => {
        if (status === "paid") {
          simpleBuyGems(getValueByCoast(numGems)); return
        }
      });
    } 

    const { buyGems } = useBuyGems(apiFetch, onBuyGemsSuccess) 

    const handleBuyGems = () => {
      setGemShopOpen(true)
    }

    const handleEnergy = () => {
      //updateActions()
    }

    const handleWithdraw = () => {
      setWithdrawOpen(true)
    }

    const handleMenu = () => {
      setMenuOpen(true)
    }

    const onShopItemSelect = (coast: number) => {    
      buyGems(coast)
    }

  useEffect(() => {
    if (withdrawOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [withdrawOpen]);

  /* */
  useEffect(() => {
    const timer = setInterval(async () => {
     
      // const options: RequestInit = {
      //   method: "GET",
      //   headers: {
      //     'Content-Type': 'application/json',
      //     ...(Auth.accessToken ? { 'Authorization': `Bearer ${Auth.accessToken}` } : {})
      //   },
      //   //keepalive: false // Убедитесь, что вам это действительно нужно
      // };

      // const response = await fetch(`${Config.url}/balance`, options);
      // console.log(response);
  

    }, 10_000);
    return () => clearInterval(timer);
  }, []);

  const handleCoins = () => {
    // const payload = {
    //   chat_id: chatId,
    //   text: `✨ [Открыть приложение](${url}) или [Поделиться ссылкой](${tUrl})!`,
    //   parse_mode: 'MarkdownV2'
    // };

    //const msgWish = t(`fortunes.lantern.wishes.${wish}`)
    //const message = `Фонарь Агаты пожелал тебе: ${msgWish}`
    //const url = `https://t.me/uliana_prisma_bot/uliana_prisma?startapp=action=${uuid}`
    //const tUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
    const url = `https://t.me/share/url?url=&text=%E2%9C%A8%20%D0%9E%D1%82%D0%BA%D1%80%D0%BE%D0%B9%D1%82%D0%B5%20%D0%BD%D0%B0%D1%88%D0%B5%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%2C%20%D1%87%D1%82%D0%BE%D0%B1%D1%8B%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%B5%3A%20%5B%D0%9F%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%5D(https%3A%2F%2Ft.me%2Fuliana_prisma_bot%2Fuliana_prisma%3Fstartapp%3Daction%3D12345)%20%F0%9F%9A%80%0A%0A%D0%98%D0%BB%D0%B8%20%D0%BF%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D1%82%D0%B5%D1%81%D1%8C%20%D1%8D%D1%82%D0%BE%D0%B9%20%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%BE%D0%B9%20%D1%81%20%D0%B4%D1%80%D1%83%D0%B7%D1%8C%D1%8F%D0%BC%D0%B8!`

    window.open(url, '_blank');

    //axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, payload);
  }

    
    return  (
    <>
    <Header>
      <GameStats 
      onCoins={handleCoins}
      onBuyGems={handleBuyGems}
      onEnergy={handleEnergy} 
      onWithdraw={handleWithdraw} 
      onMenu={handleMenu}/>
      </Header>
      <main className='w-screen'>
        {children}
        {/* Shop component */}
        {gemShopOpen && (
         <ForStarsShop 
         onShopItemSelect={onShopItemSelect} 
         setKeyShopOpen={setGemShopOpen} />
        )}
        {withdrawOpen && (
          <Withdraw setWithdrawOpen={setWithdrawOpen} />
        )}
        {menuOpen && (
          <Menu 
          setMenuOpen={setMenuOpen} 
          setMenuTutorialOpen={setMenuTutorialOpen} 
          setKeyShopOpen={setGemShopOpen} />
        )}
        {menuTutorialOpen && (
          <ModalTutorial 
          isOpen={menuTutorialOpen} 
          close={() => setMenuTutorialOpen(false)} 
          />
        )}
      </main>
    </>)
  
}
export default Content

interface IWithdrawProps {
  setWithdrawOpen: (isOpen: boolean) => void
}

const Withdraw:FC<IWithdrawProps> = (props) => {
  const { setWithdrawOpen } = props

  const { player } = useUserStore()

  const wallet: Wallet | null = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();

  const { registerTestTransaction } = useRegisterTestTransaction(apiFetch)

  const { isWalletInit, isTestTransaction } = useWalletStore();

  const [isValidUsdt, setIsValidUsdt] = useState(false)
  const [usdt, setUsdt] = useState(0)

  useEffect(() => {
    const value = (player?.usdt || 0) / 100
    setUsdt(value)
    setIsValidUsdt(value >= 10)
  }, [player])

  const {newWithdrawProposal} = useNewWithdrawProposal(apiFetch)

  const sendTransaction = useCallback(async () => {
    const result: SendTransactionResponse = await tonConnectUi.sendTransaction(DefaultTx)

    if (result?.boc) {
      const cell = Cell.fromBase64(result.boc)
      const buffer = cell.hash();
      const hash = buffer.toString('hex');

      registerTestTransaction(hash)
    }
  }, []);

  const handleWithdraw = () => {
    newWithdrawProposal(+(proposal || 0))
  }

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFocus = () => setIsExpanded(true);
  const handleBlur = () => setIsExpanded(false);

  const [proposal, setProposal] = useState<number | undefined>()

  const { t } = useTranslation();

  return (
    <div className="withdraw-modal fixed top-0 w-screen h-screen overflow-hidden z-50">
        
    <div className="w-full h-full bg-black opacity-70"></div>
    <div className={`absolute bottom-0 w-full task-modal ${isExpanded ? '!h-full' : ''}`}>

      <div className="absolute top-0 right-0 btn-no-body pr-4 pt-4" 
        onClick={() => setWithdrawOpen(false)}>
        <img src="/stars-shop/close.png" alt="" />
      </div>

        <div className='shop-dialog-title mt-16 uppercase px-2'>
          {t("withdraw.title")}
        </div>

        { !wallet || !isWalletInit || !isTestTransaction ? (
          <>
            <p className="shop-dialog-description mt-3 px-2">
              {t("withdraw.withdraw_steps")}
            </p>

            <div className="flex flex-col items-center gap-2 px-4 mt-6">
              <div className="flex items-center gap-4">
                <span className={`${wallet
                  ? 'airdrop-conditions-disabled'
                  : 'airdrop-conditions'}`}>
                  {t("airdrop.first_step")}
              </span>
                {wallet && <img src="/airdrop/checked.svg" alt="checked" />}
              </div>

              <div
                onClick={() => tonConnectUi.openModal()}
                className={`uppercase flex flex-row items-center justify-center gap-2 !m-0 w-full !px-2  
                ${wallet ? 'function-btn-disabled' : 'function-btn btn-no-body'} `}
              >
                {t("airdrop.connect_wallet")}
                <img className='w-8 h-8' src="/airdrop/wallet.webp" alt=""/>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 px-4 mt-6">

              <div className="flex items-center gap-4">
                <span className={`${wallet && isTestTransaction
                  ? 'airdrop-conditions-disabled'
                  : 'airdrop-conditions'}`}>
                    {t("airdrop.second_step")}
                </span>
                {wallet && isTestTransaction && <img src="/airdrop/checked.svg" alt="checked"/>}
              </div>


              <div
                onClick={sendTransaction}
                className={`uppercase flex flex-row items-center justify-center gap-2 !m-0 w-full !px-2  
                ${!wallet || (wallet && isTestTransaction)
                  ? 'function-btn-disabled'
                  : 'function-btn btn-no-body'
                }`}
              >
                {t("airdrop.make_transaction")}
                <img className='w-8 h-8' src="/airdrop/wallet.webp" alt=""/>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='shop-dialog-description mt-3 px-2'>
              {t("withdraw.false_condition")}{' '}
              <span className="text-green-300">10 USDT</span>
            </div>

            <div className="w-full mt-4 flex flex-row justify-between items-center px-4">
              <div className="withdraw-label">{t("withdraw.ammount")}</div>
              <div className="flex flex-row items-center justify-center">
                <img className="w-8 h-8" src="/stats/usdt.webp" alt=""/>
                <div className="flex flex-col items-center justify-center">
                  <div className="withdraw-amount">{usdt?.toFixed(2)}</div>
                  <div className="withdraw-currency">USDT</div>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-center px-4">
              <input className="w-full input-primary input input-xl mt-4" type="number"
                     onChange={(e) => setProposal(Number(e.target.value) || undefined)}
                     value={proposal}
                     onFocus={handleFocus}
                     onBlur={handleBlur}
              />
            </div>

            <div className="w-full flex mt-4" onClick={handleWithdraw}>
              <button
                className={`function-btn btn-no-body flex items-center justify-center w-full 
                  ${!isValidUsdt ? 'function-btn-disabled' : ''}`}
                disabled={!isValidUsdt}
              >
                {t("withdraw.title")}
              </button>
            </div>
          </>
          )
        }
      </div>
    </div>
  )
}

interface IForStarsShopProps {
  onShopItemSelect: (value: number) => void
  setKeyShopOpen: (isOpen: boolean) => void
}

const ForStarsShop: FC<IForStarsShopProps> = (props) => {

  const { t } = useTranslation();
  
  const {onShopItemSelect, setKeyShopOpen} = props
  return (
    <div className="fixed top-0 w-screen h-screen overflow-hidden z-50">

      <div className="w-full h-full bg-black opacity-70"></div>
      <div className="absolute bottom-0 w-full task-modal">

        <div className="absolute top-0 right-0 btn-no-body pr-4 pt-4" onClick={() => setKeyShopOpen(false)}>
          <img src="/stars-shop/close.png" alt=""/>
        </div>

        <div className='shop-dialog-title mt-16 uppercase px-2'>
          {t("shop.title")}
        </div>
        <div className='shop-dialog-description mt-3 px-2'>
          {t("shop.description")}
        </div>

        <div className="w-full grid grid-cols-2 grid-rows-2 px-4 gap-2 text-white">
          <StarShopItem coast={5} value={getValueByCoast(5)} onSelect={onShopItemSelect}/>
          <StarShopItem coast={13} value={getValueByCoast(13)} onSelect={onShopItemSelect}/>
          <StarShopItem coast={20} value={getValueByCoast(20)} onSelect={onShopItemSelect}/>
          <StarShopItem coast={38} value={getValueByCoast(38)} onSelect={onShopItemSelect}/>
        </div>
      </div>

    </div>
  )
}

function getValueByCoast(coast: number) {
  let value: number = 1
  switch (coast) {
    case 5:
      value = 1
      break
      case 13:
      value = 3
      break
      case 20:
        value = 5
      break
      case 38:
        value = 7
      break
  }
  return value
}

interface IStarShopItem {
  value: number
  coast: number
  onSelect: (value: number) => void
}
const StarShopItem: FC<IStarShopItem> = (props) => {
  
  const { value, coast, onSelect } = props

  const { t } = useTranslation();
  
  return (
    <div className="
    w-full shop-dialog-item
    h-16 mt-4
    flex flex-row gap-2
    btn-no-body
    " onClick={() =>onSelect(coast)}>
      <div className="shop-dialog-item-icon">
        <div className="shop-dialog-item-chip">{value}</div>
        <img className="w-full p-1 rounded-md" src="/stats/gems.png" alt="gems" />
      </div>
      <div className="flex flex-col justify-between h-full py-2">
        <div className="flex flex-row items-center gap-2 text-[#92b808] font-bold">
          <img className="w-5 h-5" src="/stars-shop/star-icon-2.png" alt="star-icon" />
          {coast}
        </div>
        <div className="shop-dialog-item-buy flex items-center">
          {t("additional.buy")}
          <img className="w-4 h-4" src="/stars-shop/chevron-right-green.svg" alt="chevron-right-green"/>
        </div>
      </div>
    </div>
  )
}

interface IMenuProps {
  setMenuOpen: (isOpen: boolean) => void
  setMenuTutorialOpen: (isOpen: boolean) => void
  setKeyShopOpen: (isOpen: boolean) => void
}

const Menu: FC<IMenuProps> = (props) => {
  const { setMenuOpen } = props

  const { t } = useTranslation();

  const handleClose = () => {
    setMenuOpen(false)
  }

  // const handleOpenTutorial = () => {
  //   setMenuOpen(false)
  //   setMenuTutorialOpen(true)
  // }

  // const handleOpenShop = () => {
  //   setMenuOpen(false)
  //   setKeyShopOpen(true)
  // }

  const {
    resetNotifications,
  } = usePageNotifications();

  const handleEnableNotifications = () => {
    // Reset notifications
    //...
//    <div className="btn btn-secondary" onClick={()=>resetNotifications()}>resetNotifications</div>
    resetNotifications()
    console.log('Reset notifications')
  }

  return (
    <div className="modal modal-open">
      <div className="modal-menu relative w-full h-full px-5 pb-8">
        <div
          className="absolute top-0 right-0 btn-no-body pr-4 pt-4 cursor-pointer"
          onClick={handleClose}
        >
          <img className="w-8 h-8" src="/stars-shop/close.png" alt="close"/>
        </div>

        <div className="modal-menu-title pt-10">{t("settings.title")}</div>
        <div className="modal-menu-list flex flex-col gap-4 w-full">

          <div className="modal-menu-item fill-unset py-2 text-[#f71fde] select-none">
            <div className="flex flex-row gap-2 items-center justify-between">
              {t("settings.language")}
              <LocaleSwitcher />
            </div>
          </div>
          <div className="divider my-0"></div>


          <div className="modal-menu-item py-2 btn-no-body cursor-pointer" onClick={handleEnableNotifications}>{t("settings.enable_notifications")}</div>
          <div className="divider my-0"></div>

          <Link to={'https://t.me/uliana_prisma_bot'} target='_blank' className="modal-menu-item py-2">{t("settings.telegram_bot")}</Link>

          <Link to={'https://t.me/+sBMy1mIxT9U3OGMy'} target='_blank' className="modal-menu-item py-2">{t("settings.telegram_chat")}</Link>


        </div>
      </div>
    </div>
  )
}