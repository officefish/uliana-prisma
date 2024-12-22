//import {apiFetch} from "@/services/api";
//import { apiFetch } from "@/services/api";
import {FC, useEffect, useState} from "react";
//import {useNavigate} from "react-router-dom";
import {useSiteStore} from "@/providers/store";
import {useTranslation} from "react-i18next";
import { Page } from "@/types";
import { apiFetch } from "@/services/api";
import { useOneRoundBawdry } from "@/hooks/api/fortunes/useOneRoundBawdry";
import { useBalanceStore } from "@/providers/balance";
import { useFortuneStore } from "@/providers/fortunes";
import { useDeleteAction } from "@/hooks/api/actions/useDeleteAction";
import { useNavigate } from "react-router-dom";

const Bawdry: FC = () => {

  // Роутинг страниц
  const { setPage } = useSiteStore();
   
  useEffect(() => {
    setPage(Page.BAWDRY);
  }, [setPage]);  

  const { setGemShopOpen } = useSiteStore()

  const {
    //setIsFooterTransparent,
    //setIsEmptyPage,
  } = useSiteStore()

  const { fortuneAction, setFortuneAction } = useFortuneStore();

  const [bawdry, setBawdry] = useState<string | null>(null); 
   //const [bawdry, setBawdry] = useState<string | null>('pig'); 

//   const navigate = useNavigate()

  const onSuccessBawdryRound = (newBawdry: string) => {
    setBlocked(false);
    console.log('Bawdry round claimed:', newBawdry);
    setBawdry(newBawdry);
  }

  const onErrorBawdryRound = () => { 
    setBlocked(false)
  }

  const { oneRoundBawdry } = useOneRoundBawdry(apiFetch, onSuccessBawdryRound, onErrorBawdryRound);


  const [blocked, setBlocked] = useState(false);

  const handleClaimClick = () => {
    if (blocked) return;
    setBlocked(true);
    oneRoundBawdry();
  }

  const onSuccessDelete = () => {
    setFortuneAction(null)
  }

  const { deleteAction } = useDeleteAction(apiFetch, onSuccessDelete)

  const handleCancelBawdryClick = () => {
    if (fortuneAction?.id) {
      deleteAction(fortuneAction?.id)
    }
    setBawdry(null);
  }

  const [telegramUrl, setTelegramUrl] = useState("")

  useEffect(() => {
    const uuid = fortuneAction?.uuid || 0
    const msgBawdry = t(`fortunes.bawdry.${bawdry}`)
    const message = `Обзывашка Маркуса сказала мне что ты: ${msgBawdry}`
    const url = `https://t.me/uliana_prisma_bot/uliana_prisma?startapp=action=${uuid}`
    const tUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
    setTelegramUrl(tUrl)
  }, [bawdry, fortuneAction
  ])

  const handleSendBawdryClick = () => {
    //console.log('sendBawdryClick')
    window.open(telegramUrl, '_blank');
    setBawdry(null); 
  }

  const {t} = useTranslation();

  const [checked, setChecked] = useState(false);

  const { gems } = useBalanceStore(); 

  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/');
  }

  return (
    <div className='w-full'>
      <div className="absolute h-screen w-screen bawdry-bg top-0 vignette"></div>


      <div className="absolute top-20 right-8 z-10 btn-no-body opacity-40 hover:opacity-90"
      onClick={handleClose}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" 
          fill="#f71fde"/>
        </svg>
      </div>

      { checked ? (
        <div className="
        w-full absolute top-32 bg-[#ecbde7] bg-opacity-80 
        text-black 
        font-semibold italic text-md px-4
        ">
          <hr id="hr-fancy"></hr>
          <div dangerouslySetInnerHTML={{__html: t('fortunes.bawdry.legend')}} ></div>
          <hr id="hr-fancy"></hr>

        </div>
      ) : (
         <div className="w-full h-screen bg-glass-xl p-4">
         <div className='shop-dialog-title mt-12 uppercase px-2'>{t('fortunes.bawdry.title')}</div>
         <div className='shop-dialog-description mt-2 uppercase px-2'>{t('fortunes.bawdry.short')}</div>
         <div className="flex flex-col justify-center items-center">

            { bawdry ? (
              <BawdryResult bawdry={bawdry} 
              onCancelClick={handleCancelBawdryClick} 
              onSendClick={handleSendBawdryClick}
              />
            ) : (
              <BawdryPlayer 
              onClaimClick={handleClaimClick} 
              onMarketCLick={() => setGemShopOpen(true)}
              isLoading={blocked}
              gems={gems}  />
            )}

         </div>
       </div>
      )}  
     
        <div className="absolute bottom-28 w-full flex flex-col items-center justify-center">
            <div className="form-control w-36 text-center">
                <label className="label cursor-pointer">
                    <span className="shop-dialog-legend">{t('additional.legend')}</span>
                    <input type="checkbox" className="toggle toggle-secondary toggle-sm opacity-60"
                    defaultChecked={checked}
                    onChange={() => setChecked(!checked)}
                    />
                </label>
            </div>
        </div>
    </div>
  )
}
export default Bawdry

interface IBawdryPlayerProps {
  gems: number,
  onClaimClick: () => void,
  onMarketCLick: () => void,
  isLoading: boolean
}

const BawdryPlayer: FC<IBawdryPlayerProps> = (props) => {
  const {gems, onClaimClick, onMarketCLick, isLoading } = props;
  const {t} = useTranslation();
  return (
    <>
      <div className="absolute -z-10 top-36 left-0 w-full flex items-center justify-center">
        <img className="w-[50%] border-4 border-[#f71fde]" src="/fortunes/bawdry.webp" alt="bawdry"></img>
      </div>
      { gems > 0 && (
        <div className="m-4 mt-60 flex flex-col items-center justify-center">
        <div className="text-[#bd8cb7] w-full text-center text-sm">
          {t('fortunes.bawdry.description')}
        </div>
        <div className="btn btn-secondary btn-xl btn-md mt-5"
          onClick={onClaimClick}
          >{t('additional.play').toUpperCase()}
            <img className='w-8 h-8 ml-2' src="/stats/gems.png" alt="gem"/> x 1
        </div>
        {isLoading && (
        <div className="w-full flex items-center justify-center mt-8">
          <div className="moon-loader w-6 h-6"></div>
        </div>
        )}  
        </div>
        
      )}  

      {!gems && (
        <div className="m-4 mt-60 text-center">
          <div className="text-[#f71fde] text-sm">{t('additional.no_gems')}</div>
          <div className="btn btn-secondary btn-xl btn-md mt-2" onClick={onMarketCLick}>
            {t('additional.market').toUpperCase()}
            <img className='w-8 h-8 ml-2' src="/stats/gems.png" alt="gem"/>
          </div>
        </div>
      )}
    </>
    
  )
}

interface IBawdryResultProps {
  bawdry: string
  onCancelClick: () => void,
  onSendClick: () => void,
}

const BawdryResult: FC<IBawdryResultProps> = (props) => {
  const {bawdry} = props;
  const {t} = useTranslation();
  return (
    <div className="w-full mt-12">
       <div className="absolute -z-10 top-36 left-0 w-full flex items-center justify-center">
          <img className="w-[50%] border-4 border-[#f71fde]" src="/fortunes/bawdry.webp" alt="bawdry"></img>
        </div>
       {/* <div className="polygon right-10 -z-10"></div> */}
       <div className="h-32 flex items-center justify-center breathe-animation w-full mt-12"><span>{bawdry}</span></div>
       <div className="w-full shop-dialog-title mt-4">{t(`fortunes.bawdry.${bawdry}`).toUpperCase()}</div>
       <div className="text-[#bd8cb7] w-full text-center text-sm mt-2">
          {t('fortunes.bawdry.sudjestion')}
        </div>
       <div className="flex flex-row items-center justify-center gap-4 px-2 mt-4">
         <div className="btn btn-secondary btn-md flex flex-row gap-2" onClick={props.onSendClick}>
           {t('additional.send').toUpperCase()}
           <img className="w-6 h-6" src="/additional/telegram-white.svg" alt="telegram" />
          </div>
          <div className="btn btn-info btn-md flex flex-row gap-2" onClick={props.onCancelClick}>
           {t('additional.forget').toUpperCase()}
           <img className="w-4 h-4" src="/additional/garbage.svg" alt="telegram" />
         </div>
       </div>
    </div>
   
  )
}
