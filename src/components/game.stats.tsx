//import useUpdateTotalBalance from "@/hooks/api/useUpdateTotalBalance"
//import { useUserStore } from "@/providers/user"
//import { apiFetch } from "@/services/api"
import { FC, useEffect } from "react"
//import { useTranslation } from "react-i18next";
import {useSiteStore} from "@/providers/store";

interface GameStatsProps {
  onBuyKeys: () => void
  onWithdraw: () => void
  onMenu: () => void
}

const GameStats:FC<GameStatsProps> = (props) => {

  console.log(props)
  const { onBuyKeys } = props

  //const { player, isAuth } = useUserStore()
  const { isEmptyPage } = useSiteStore()

  //const balance = player?.balance || 0
  //const usdt = player?.usdt || 0
  //const numKeys = player?.numKeys || 0

  //const { updateTotalBalance } = useUpdateTotalBalance(apiFetch)

  useEffect(() => {
    //if (isAuth) updateTotalBalance()
  }, [
    //isAuth
  ])

  //const { t } = useTranslation();

  return (
    <div className={`header fixed w-screen p-4 flex flex-row z-10 ${isEmptyPage ? 'hidden' : ''}`}>
      <div className="grid grid-cols-4 text-white text-xs">
        <div className="">
          <label htmlFor="">Серебряные монеты</label>
          <img src="" alt="silver" />
          <div>500</div>
        </div>
        <div className="flex flex-col gap-1 w-full items-center justify-center text-orange-200 select-none	">
          <div className="flex flex-row gap-1 items-center justify-center btn-no-body">
            <img className="w-10 h-10" src="nav/energy.png" alt="silver" />
            <span>X</span>
            <div className="text-lg font-bold">400</div>
          </div>
          {/* <label htmlFor="">Самоцветы</label>      */}
        </div>
        <div className="flex flex-col gap-1 w-full items-center justify-center text-red-200 select-none	">
          <div className="flex flex-row gap-1 items-center justify-center btn-no-body" onClick={onBuyKeys}>
            <img className="w-10 h-10" src="nav/gems.png" alt="silver" />
            <span>X</span>
            <div className="text-lg font-bold">12</div>
          </div>
          {/* <label htmlFor="">Самоцветы</label>      */}
        </div>
        <div className="flex flex-col gap-1 w-full items-center justify-center text-blue-200 select-none	">
          <div className="flex flex-row gap-1 items-center justify-center btn-no-body">
            <img className="w-10 h-10" src="nav/crystalls.png" alt="crystals" />
            <span>X</span>
            <div className="text-lg font-bold">3</div>
          </div>
          {/* <label htmlFor="">Самоцветы</label>      */}
        </div>
      </div>
    </div>  
  )
}

export default GameStats

/*
return (
    <div className={`header fixed w-screen p-4 flex flex-row z-10 ${isEmptyPage ? 'hidden' : ''}`}>
      <div className="w-[24%] flex flex-row gap-1 items-center">
        <img className="w-8 h-8" src="/stats/coin.webp" alt="coin" />
        <div className="flex flex-col items-start justify-evenly stats-item pl-1">
          <div className="stats-value">
            {balance > 1000
              ? `${(balance/1000).toFixed(1)}K`
              : balance
            }</div>
          <div className="stats-type uppercase">{t("navigation.coins")}</div>
        </div>
      </div>
      <div className="stats-spacer mx-1 my-2 opacity-60"></div>
      <div className="w-[31%] flex flex-row gap-2 items-center">
        <img className="w-8 h-8" src="/stats/usdt.webp" alt="coin" />
        <div className="flex flex-col items-start justify-evenly stats-item pl-1">
          <div className="stats-value">{(usdt/100).toFixed(2)}</div>
          <div className="stats-type uppercase">{t("navigation.usdt")}</div>
        </div>
        <div className="btn-no-body" onClick={onWithdraw}>
          <img className="w-6 h-6" src="/stats/wallet.svg" alt="plus usdt" />
        </div>
      </div>
      <div className="stats-spacer mx-1 my-2 opacity-60"></div>
      <div className="w-[31%] flex flex-row gap-2 items-center">
        <img className="w-8 h-8" src="/stats/farm.webp" alt="coin" />
        <div className="flex flex-col items-start justify-evenly stats-item pl-1">
          <div className="stats-value">{numKeys}</div>
          <div className="stats-type uppercase">{t("navigation.keys")}</div>
        </div>
        <div className="btn-no-body" onClick={onBuyKeys}>
          <img className="w-6 h-6" src="/stats/plus.svg" alt="plus coin" />
        </div>
      </div>
      <img className="w-8 h-8" src="/stats/menu.svg" alt="plus coin" onClick={onMenu} />
    </div>
  )
*/