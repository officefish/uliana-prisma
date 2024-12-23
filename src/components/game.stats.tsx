
import { FC, useEffect, useState } from "react"
import {useSiteStore} from "@/providers/store";
import { useBalanceStore } from "@/providers/balance";
import { useUpdateBalance } from "@/hooks/api/stats/useUpdateBalance";
import { apiFetch } from "@/services/api";

interface GameStatsProps {
  onCoins: () => void
  onEnergy: () => void
  onBuyGems: () => void
  onWithdraw: () => void
  onMenu: () => void
}

const GEM_GENERATION_INTERVAL = 4 * 60 * 60 * 1000; // 4 часа в миллисекундах

const GameStats:FC<GameStatsProps> = (props) => {

  const { onBuyGems, onEnergy, onMenu, onCoins } = props

  const { isEmptyPage } = useSiteStore()

  const {coins, energy, gems, crystals, lastGemReady} = useBalanceStore()

  const [remainingTime, setRemainingTime] = useState(0);

  const { updateBalance } = useUpdateBalance(apiFetch)

  useEffect(() => {
    if (lastGemReady) {
      const nextGemTime = new Date(lastGemReady).getTime() + GEM_GENERATION_INTERVAL;
      const timeUntilNextGem = nextGemTime - Date.now();
      setRemainingTime(timeUntilNextGem > 0 ? timeUntilNextGem : 0);
    }
  }, [lastGemReady]);

    // Запуск таймера обратного отсчета
    useEffect(() => {
      if (remainingTime <= 0) return;
  
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }, [remainingTime]);
  
    useEffect(() => {
      if (remainingTime <= 0) {
        updateBalance();
      }
    }, [remainingTime]);
  
  
  // Преобразуем оставшееся время в часы, минуты и секунды
    const formatTime = (time: number) => {
      const hours = Math.floor(time / (1000 * 60 * 60));
      let minutes: string | number = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      if (minutes < 10) minutes = `0${minutes}`;

      let seconds: string | number = Math.floor((time % (1000 * 60)) / 1000);
      if (seconds < 10) seconds = `0${seconds}`;

      return `0${hours} : ${minutes} : ${seconds}`;
    };

  return (
    <div className={`header fixed w-screen px-4 pt-3 pb-2 flex flex-row z-10 ${isEmptyPage ? 'hidden' : ''}`}>
      <div className="grid grid-cols-5 text-white text-xs gap-4 w-full pl-2">
        <div className="flex flex-col gap-1 w-full items-center justify-center text-gray-200 select-none	">
          <div className="flex flex-row gap-1 items-center justify-center btn-no-body" onClick={onCoins}>
            <img className="w-8 h-8" src="/stats/coins.png" alt="silver" />
            <span>X</span>
            <div className="text-md font-bold">{coins}</div>
          </div>
          <label className="h-3"></label>     
        </div>
        <div className="flex flex-col gap-1 w-full items-center justify-center text-orange-200 select-none	">
          <div className="flex flex-row gap-1 items-center justify-center btn-no-body" onClick={onEnergy}>
            <img className="w-8 h-8" src="/stats/energy.png" alt="silver" />
            <span>X</span>
            <div className="text-md font-bold">{energy}</div>
          </div>
          <label className="h-3"></label>        
        </div>
        <div className="flex flex-col gap-1 w-full items-center justify-center text-red-200 select-none	">
          <div className="flex flex-row gap-1 items-center justify-center btn-no-body" onClick={onBuyGems}>
            <img className="w-8 h-8" src="/stats/gems.png" alt="silver" />
            <span>X</span>
            <div className="text-md font-bold">{gems}</div>
          </div>
          <label className="text-[8px] text-red-200 h-3">{formatTime(remainingTime)}</label>     
        </div>
        <div className="flex flex-col gap-1 w-full items-center justify-center text-blue-200 select-none	">
          <div className="flex flex-row gap-1 items-center justify-center btn-no-body">
            <img className="w-8 h-8" src="/stats/crystalls.png" alt="crystals" />
            <span>X</span>
            <div className="text-md font-bold">{crystals}</div>
          </div>
          <label className="h-3"></label>     
        </div>
        <div className="pl-5 flex flex-col items-center justify-center cursor-pointer" onClick={onMenu}>
          <svg 
          fill="#8f0f73" 
          className="w-5 h-5" 
          version="1.1" id="Capa_1" 
          xmlns="http://www.w3.org/2000/svg" 
          xmlnsXlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 45.973 45.973" 
          xmlSpace="preserve">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M43.454,18.443h-2.437c-0.453-1.766-1.16-3.42-2.082-4.933l1.752-1.756c0.473-0.473,0.733-1.104,0.733-1.774 c0-0.669-0.262-1.301-0.733-1.773l-2.92-2.917c-0.947-0.948-2.602-0.947-3.545-0.001l-1.826,1.815 C30.9,6.232,29.296,5.56,27.529,5.128V2.52c0-1.383-1.105-2.52-2.488-2.52h-4.128c-1.383,0-2.471,1.137-2.471,2.52v2.607 c-1.766,0.431-3.38,1.104-4.878,1.977l-1.825-1.815c-0.946-0.948-2.602-0.947-3.551-0.001L5.27,8.205 C4.802,8.672,4.535,9.318,4.535,9.978c0,0.669,0.259,1.299,0.733,1.772l1.752,1.76c-0.921,1.513-1.629,3.167-2.081,4.933H2.501 C1.117,18.443,0,19.555,0,20.935v4.125c0,1.384,1.117,2.471,2.501,2.471h2.438c0.452,1.766,1.159,3.43,2.079,4.943l-1.752,1.763 c-0.474,0.473-0.734,1.106-0.734,1.776s0.261,1.303,0.734,1.776l2.92,2.919c0.474,0.473,1.103,0.733,1.772,0.733 s1.299-0.261,1.773-0.733l1.833-1.816c1.498,0.873,3.112,1.545,4.878,1.978v2.604c0,1.383,1.088,2.498,2.471,2.498h4.128 c1.383,0,2.488-1.115,2.488-2.498v-2.605c1.767-0.432,3.371-1.104,4.869-1.977l1.817,1.812c0.474,0.475,1.104,0.735,1.775,0.735 c0.67,0,1.301-0.261,1.774-0.733l2.92-2.917c0.473-0.472,0.732-1.103,0.734-1.772c0-0.67-0.262-1.299-0.734-1.773l-1.75-1.77 c0.92-1.514,1.627-3.179,2.08-4.943h2.438c1.383,0,2.52-1.087,2.52-2.471v-4.125C45.973,19.555,44.837,18.443,43.454,18.443z M22.976,30.85c-4.378,0-7.928-3.517-7.928-7.852c0-4.338,3.55-7.85,7.928-7.85c4.379,0,7.931,3.512,7.931,7.85 C30.906,27.334,27.355,30.85,22.976,30.85z"></path> </g> </g> </g></svg>
          <label className="h-3"></label>
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