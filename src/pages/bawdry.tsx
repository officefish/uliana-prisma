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

const Bawdry: FC = () => {

  // Роутинг страниц
  const { setPage } = useSiteStore();
   
  useEffect(() => {
    setPage(Page.BAWDRY);
  }, [setPage]);  

  const {
    //setIsFooterTransparent,
    //setIsEmptyPage,
  } = useSiteStore()

   const [bawdry, setBawdry] = useState<string | null>(null); 
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

  const handleCancelBawdryClick = () => {
    console.log('handleCancelBawdryClick')
    setBawdry(null);
  }

  const handleSendBawdryClick = () => {
    console.log('sendBawdryClick')
  }

  const {t} = useTranslation();

  const [checked, setChecked] = useState(false);

  const { gems } = useBalanceStore(); 

  return (
    <div className='w-full'>
      <div className="absolute h-screen w-screen bawdry-bg top-0"></div>
      { checked ? (
        <div className="w-full absolute top-56 bg-opacity-70 bg-slate-300 text-black p-2 font-semibold italic text-md px-4"
        dangerouslySetInnerHTML={{__html: t('fortunes.bawdry.legend')}} 
        >
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
              <BawdryPlayer onClaimClick={handleClaimClick} gems={gems}  />
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
}

const BawdryPlayer: FC<IBawdryPlayerProps> = (props) => {
  const {gems, onClaimClick } = props;
  const {t} = useTranslation();
  return (
    <>
      <div className="absolute -z-10 top-36 left-0 w-full flex items-center justify-center">
        <img className="w-[50%] border-4 border-[#f71fde]" src="/fortunes/bawdry.webp" alt="bawdry"></img>
      </div>
      { gems > 0 && (
               <div className="btn btn-secondary btn-xl btn-md m-4 mt-60"
               onClick={onClaimClick}
               >{t('additional.play').toUpperCase()}
                   <img className='w-8 h-8 ml-2' src="/stats/gems.png" alt="gem"/> x 1
               </div>  
            )}  

            {!gems && (
                <div className="text-center mt-4">{t('additional.no_gems')}</div>
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
       <div className="w-full shop-dialog-title">{t(`fortunes.bawdry.${bawdry}`).toUpperCase()}</div>
       <div className="flex flex-row items-center justify-center gap-4 px-2 mt-8">
         <div className="btn btn-secondary btn-xl btn-md" onClick={props.onSendClick}>
           {t('additional.send').toUpperCase()}
          </div>
          <div className="btn btn-info btn-xl btn-md" onClick={props.onCancelClick}>
           {t('additional.forget').toUpperCase()}
         </div>
       </div>
    </div>
   
  )
}
