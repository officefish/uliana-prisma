//import {apiFetch} from "@/services/api";
//import { apiFetch } from "@/services/api";
import {FC, useEffect, useState} from "react";
//import {useNavigate} from "react-router-dom";
import {useSiteStore} from "@/providers/store";
import {useTranslation} from "react-i18next";
import { Page } from "@/types";
import { apiFetch } from "@/services/api";
import { useOneRoundBawdry } from "@/hooks/api/fortunes/useOneRoundBawdry";

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


//   const navigate = useNavigate()

  const onSuccessBawdryRound = (bawdry: string) => {
    setBlocked(false);
    console.log('Bawdry round claimed:', bawdry);
  }

  const onErrorBawdryRound = () => { 
    setBlocked(false)
  }

  const { oneRoundBawdry } = useOneRoundBawdry(apiFetch, onSuccessBawdryRound, onErrorBawdryRound);


  const [blocked, setBlocked] = useState(false);

  const handleClaimClick = () => {
    console.log('handleClaimClick')
    if (blocked) return;
    setBlocked(true);
    oneRoundBawdry();
  }

  const {t} = useTranslation();

  const [checked, setChecked] = useState(false);

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
             <div className="w-[90%] max-w-64 mt-4 border-4 border-gray-700">
                 <img className="w-full" src="/fortunes/bawdry.webp" alt="bawdry"></img>
             </div>
             
             <div className="btn btn-secondary btn-xl btn-md m-4"
             onClick={handleClaimClick}
             >{t('additional.play').toUpperCase()}
                 <img className='w-8 h-8 ml-2' src="/stats/gems.png" alt="gem"/> x 1
             </div>
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
