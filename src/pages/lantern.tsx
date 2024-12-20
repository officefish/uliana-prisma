//import {apiFetch} from "@/services/api";
//import { apiFetch } from "@/services/api";
import {FC, useEffect, useState} from "react";
//import {useNavigate} from "react-router-dom";
import {useSiteStore} from "@/providers/store";
import {useTranslation} from "react-i18next";
import { Page } from "@/types";
import { useBalanceStore } from "@/providers/balance";
import DetailsSelect from "@/components/additional/details.select";
// import { apiFetch } from "@/services/api";
// import { useOneRoundBawdry } from "@/hooks/api/fortunes/useOneRoundBawdry";
// import { useBalanceStore } from "@/providers/balance";
// import { useFortuneStore } from "@/providers/fortunes";
// import { useDeleteAction } from "@/hooks/api/actions/useDeleteAction";

const Lantern: FC = () => {

  // Роутинг страниц
  const { setPage } = useSiteStore();
   
  useEffect(() => {
    setPage(Page.LANTERN);
  }, [setPage]);  

  //const { setGemShopOpen } = useSiteStore()

  const {
    //setIsFooterTransparent,
    //setIsEmptyPage,
  } = useSiteStore()

  //const { fortuneAction, setFortuneAction } = useFortuneStore();

  //const [bawdry, setBawdry] = useState<string | null>(null); 
   //const [bawdry, setBawdry] = useState<string | null>('pig'); 

//   const navigate = useNavigate()

//   const onSuccessBawdryRound = (newBawdry: string) => {
//     setBlocked(false);
//     console.log('Bawdry round claimed:', newBawdry);
//     setBawdry(newBawdry);
//   }

//   const onErrorBawdryRound = () => { 
//     setBlocked(false)
//   }

//   const { oneRoundBawdry } = useOneRoundBawdry(apiFetch, onSuccessBawdryRound, onErrorBawdryRound);


//   const [blocked, setBlocked] = useState(false);

//   const handleClaimClick = () => {
//     if (blocked) return;
//     setBlocked(true);
//     oneRoundBawdry();
//   }

//   const onSuccessDelete = () => {
//     setFortuneAction(null)
//   }

  //const { deleteAction } = useDeleteAction(apiFetch, onSuccessDelete)

//   const handleCancelBawdryClick = () => {
//     if (fortuneAction?.id) {
//       deleteAction(fortuneAction?.id)
//     }
//     setBawdry(null);
//   }

//   const [telegramUrl, setTelegramUrl] = useState("")

//   useEffect(() => {
//     const uuid = fortuneAction?.uuid || 0
//     const msgBawdry = t(`fortunes.bawdry.${bawdry}`)
//     const message = `Обзывашка Маркуса сказала мне что ты: ${msgBawdry}`
//     const url = `https://t.me/uliana_prisma_bot/uliana_prisma?startapp=action=${uuid}`
//     const tUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
//     setTelegramUrl(tUrl)
//   }, [bawdry, fortuneAction
//   ])

//   const handleSendWishlick = () => {
//     //console.log('sendBawdryClick')
//     window.open(telegramUrl, '_blank');
//     setBawdry(null); 
//   }

  const {t} = useTranslation();

  const [
    checked, 
    setChecked
    ] = useState(false);

  const { gems } = useBalanceStore(); 

  return (
    <div className='w-full'>
      <div className="absolute w-full h-screen lantern-bg top-0 vignette overflow-hidden"></div>
      { checked ? (
        <div></div>
        // <div className="
        // w-full absolute top-32 bg-[#ecbde7] bg-opacity-80 
        // text-black 
        // font-semibold italic text-md px-4
        // ">
        //   <hr id="hr-fancy"></hr>
        //   <div dangerouslySetInnerHTML={{__html: t('fortunes.bawdry.legend')}} ></div>
        //   <hr id="hr-fancy"></hr>

        // </div>
      ) : (
         <div className="w-full h-[90%] bg-glass-xl p-4">
          <div className='shop-dialog-title mt-12 uppercase px-2'>{t('fortunes.lantern.title')}</div>
          <div className='shop-dialog-description mt-2 uppercase px-2'>{t('fortunes.lantern.short')}</div>
         <div className="flex flex-col justify-center items-center">

            {/* { bawdry ? (
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
            )} */}

            <LanternPlayer 
              //onClaimClick={handleClaimClick} 
              //onMarketCLick={() => setGemShopOpen(true)}
              //isLoading={blocked}
              gems={gems}  
            />

         </div>
       </div>
      )}  
     
     <DetailsSelect checked={checked} setChecked={setChecked} />
    </div>
  )
}
export default Lantern

interface ILanternPlayerProps {
  gems: number,
  //onClaimClick: () => void,
  //onMarketCLick: () => void,
  //isLoading: boolean
}

const LanternPlayer: FC<ILanternPlayerProps> = (props) => {
  const {gems } = props;
  console.log('LanternPlayer', gems)
  //const {t} = useTranslation();
  return (
    <>
      <div className="absolute -z-10 top-36 left-0 w-full flex items-center justify-center">
        <img className="w-[50%] border-4 border-[#f71fde]" src="/fortunes/lantern.webp" alt="lantern"></img>
      </div>
      
      <div className="m-4 mt-60 text-center shop-dialog-description">
        Вы заинтригованы?! 
      </div>  

      {/* { gems > 0 && (
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
      )} */}
    </>
    
  )
}

// interface IBawdryResultProps {
//   bawdry: string
//   onCancelClick: () => void,
//   onSendClick: () => void,
// }

// const BawdryResult: FC<IBawdryResultProps> = (props) => {
//   const {bawdry} = props;
//   const {t} = useTranslation();
//   return (
//     <div className="w-full mt-12">
//        <div className="absolute -z-10 top-36 left-0 w-full flex items-center justify-center">
//           <img className="w-[50%] border-4 border-[#f71fde]" src="/fortunes/bawdry.webp" alt="bawdry"></img>
//         </div>
//        {/* <div className="polygon right-10 -z-10"></div> */}
//        <div className="h-32 flex items-center justify-center breathe-animation w-full mt-12"><span>{bawdry}</span></div>
//        <div className="w-full shop-dialog-title mt-4">{t(`fortunes.bawdry.${bawdry}`).toUpperCase()}</div>
//        <div className="text-[#bd8cb7] w-full text-center text-sm mt-2">
//           {t('fortunes.bawdry.sudjestion')}
//         </div>
//        <div className="flex flex-row items-center justify-center gap-4 px-2 mt-4">
//          <div className="btn btn-secondary btn-xl btn-md flex flex-row gap-2" onClick={props.onSendClick}>
//            {t('additional.send').toUpperCase()}
//            <img className="w-6 h-6" src="/additional/telegram-white.svg" alt="telegram" />
//           </div>
//           <div className="btn btn-info btn-xl btn-md flex flex-row gap-2" onClick={props.onCancelClick}>
//            {t('additional.forget').toUpperCase()}
//            <img className="w-4 h-4" src="/additional/garbage.svg" alt="telegram" />
//          </div>
//        </div>
//     </div>
   
//   )
// }
