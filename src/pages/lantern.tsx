import "@/assets/css/solar.css"

import {FC, useEffect, useState} from "react";
import {useSiteStore} from "@/providers/store";
import {useTranslation} from "react-i18next";
import { Page } from "@/types";
import { useBalanceStore } from "@/providers/balance";
import DetailsSelect from "@/components/additional/details.select";
import { useOneRoundMidnightWish } from "@/hooks/api/fortunes/useOneRoundWish";
import { apiFetch } from "@/services/api";
import { useFortuneStore } from "@/providers/fortunes";
import { useDeleteAction } from "@/hooks/api/actions/useDeleteAction";
import { useNavigate } from "react-router-dom";

const Lantern: FC = () => {

  // Роутинг страниц
  const { setPage } = useSiteStore();
   
  useEffect(() => {
    setPage(Page.LANTERN);
  }, [setPage]);  

  const { setGemShopOpen } = useSiteStore()

  const {
    //setIsFooterTransparent,
    //setIsEmptyPage,
  } = useSiteStore()

  const { fortuneAction, setFortuneAction } = useFortuneStore();

  const [wish, setWish] = useState<string | null>(null); 

  const [tags, setTags] = useState<any>([])

  const onSuccessRound = (newWish: string) => {
    setBlocked(false);
    console.log('Wish round claimed:', newWish);
    setWish(newWish);

    let newTags = getTagsByPlanet(newWish)
    setTags(newTags)
    //console.log(tags);
  }

  const onErrorRound = () => { 
    setBlocked(false)
  }
  
  const { oneRoundMidnightWish } = useOneRoundMidnightWish(apiFetch, onSuccessRound, onErrorRound);

  const [blocked, setBlocked] = useState(false);

  const handleClaimClick = () => {
    if (blocked) return;
    setBlocked(true);
    oneRoundMidnightWish() 
  }

  const onSuccessDelete = () => {
    setFortuneAction(null)
  }

  const { deleteAction } = useDeleteAction(apiFetch, onSuccessDelete)

  const handleCancel = () => {
    if (fortuneAction?.id) {
     deleteAction(fortuneAction?.id)
    }
    setWish(null);
  }

  const [telegramUrl, setTelegramUrl] = useState("")

  useEffect(() => {
    const uuid = fortuneAction?.uuid || 0
    const msgWish = t(`fortunes.lantern.wishes.${wish}`)
    const message = `Фонарь Агаты пожелал тебе: ${msgWish}`
    const url = `https://t.me/uliana_prisma_bot/uliana_prisma?startapp=action=${uuid}`
    const tUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
    setTelegramUrl(tUrl)
  }, [wish, fortuneAction
  ])

  const handleSend = () => {
    //console.log('sendBawdryClick')
    window.open(telegramUrl, '_blank');
    setWish(null); 
  }

  const navigate = useNavigate()
  const handleClose = () => {
    navigate('/')
  }

  const {t} = useTranslation();

  const [
    checked, 
    setChecked
    ] = useState(false);

  const { gems } = useBalanceStore(); 

  return (
    <div className='w-full'>
      <div className="absolute w-full h-screen lantern-bg top-0 vignette overflow-hidden"></div>

      {/* Close button */}
      <div className="absolute top-20 right-8 z-10 btn-no-body opacity-40 hover:opacity-90"
      onClick={handleClose}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" 
          fill="#1ff7ba"/>
        </svg>
      </div>

      { checked ? (
        <div className="
        w-full absolute top-32 bg-[#a1e9d4] bg-opacity-80 
        text-black 
        font-semibold italic text-md px-4
        ">
          <hr id="hr-fancy"></hr>
          <div dangerouslySetInnerHTML={{__html: t('fortunes.lantern.legend')}} ></div>
          <hr id="hr-fancy"></hr>

        </div>
      ) : (
         <div className="w-full h-screen bg-glass-xl p-4">
          <div className='shop-dialog-title mt-12 uppercase px-2 select-none'>{t('fortunes.lantern.title')}</div>
          <div className='shop-dialog-description mt-2 uppercase px-2 select-none'>{t('fortunes.lantern.short')}</div>
         <div className="flex flex-col justify-center items-center">

            { wish ? (
              <WishResult wish={wish} 
              onCancelClick={handleCancel} 
              onSendClick={handleSend}
              tags={tags}
              />
            ) : (
              <WishPlayer 
              onClaimClick={handleClaimClick} 
              onMarketCLick={() => setGemShopOpen(true)}
              isLoading={blocked}
              gems={gems}  
            />
            )}

            

         </div>
       </div>
      )}  
     
     <DetailsSelect checked={checked} setChecked={setChecked} />
    </div>
  )
}
export default Lantern

interface IWishPlayerProps {
  gems: number,
  onClaimClick: () => void,
  onMarketCLick: () => void,
  isLoading: boolean
}

const WishPlayer: FC<IWishPlayerProps> = (props) => {
  const {gems, onClaimClick, isLoading, onMarketCLick } = props;
  //console.log('LanternPlayer', gems)
  const {t} = useTranslation();
  return (
    <>
      <div className="absolute -z-10 top-36 left-0 w-full flex items-center justify-center">
        <img className="w-[50%] border-4 border-[#1ff7ba]" src="/fortunes/lantern.webp" alt="lantern"></img>
      </div> 

      { gems > 0 && (
        <div className="m-4 mt-60 flex flex-col items-center justify-center">
        <div className="text-[#8cbda8] w-full text-center text-sm">
          {t('fortunes.lantern.description')}
        </div>
        <div className="btn btn-accent bg-[#1ff7ba] btn-xl btn-md mt-5"
          onClick={onClaimClick}
          >{t('additional.play').toUpperCase()}
            <img className='w-8 h-8 ml-2' src="/stats/gems.png" alt="gem"/> x 1
        </div>
        {isLoading && (
        <div className="w-full flex items-center justify-center mt-8">
          <div className="green-moon-loader w-6 h-6"></div>
        </div>
        )}  
        </div>
        
      )}  

      {!gems && (
        <div className="m-4 mt-60 text-center">
          <div className="text-[#1ff7ba] text-sm">{t('additional.no_gems')}</div>
          <div className="btn btn-accent bg-[#1ff7ba] btn-xl btn-md mt-2" onClick={onMarketCLick}>
            {t('additional.market').toUpperCase()}
            <img className='w-8 h-8 ml-2' src="/stats/gems.png" alt="gem"/>
          </div>
        </div>
      )} 
    </>
    
  )
}

interface IWishResultProps {
  wish: string
  tags: any[]
  onCancelClick: () => void,
  onSendClick: () => void,
}

const WishResult: FC<IWishResultProps> = (props) => {
  const {wish, tags} = props;
  const {t} = useTranslation();
  return (
    <div className="w-full mt-12">
       <div className="absolute -z-10 
       top-36 left-0 
       w-full flex items-center justify-center">
          <img className="w-[50%] border-4 border-[#1ff7ba]" src="/fortunes/lantern.webp" alt="bawdry"></img>
        </div>
        <SolarSystem />
        <div className="h-32 flex items-center justify-center green-breathe-animation w-full mt-12 select-none">
          <span>{wish}</span>
        </div>
        <div className="flex with-full flex-row items-center justify-center gap-1 text-white select-none relative -top-8">
          {tags?.map((tag, index) => (
            <div key={index}>
              {/* change bag color */}
              <div className={`
                badge 
                badge-xs 
                bg-accent
                ]`} >{tag.title}</div>
            </div>
          ))}
        </div>
       {/* <div className="h-32 flex items-center justify-center midnight w-full mt-12">{wish}</div> */}
       <div className="
       w-full shop-dialog-description italic">{t(`fortunes.lantern.wishes.${wish}`).toUpperCase()}</div>
       <div className="text-[#8cbda6] w-full text-center text-sm mt-2">
          {t('fortunes.lantern.sudjestion')}
        </div>
       <div className="flex flex-row items-center justify-center gap-4 px-2 mt-4">
         <div className="btn btn-accent bg-[#1ff7ba] btn-xl btn-md flex flex-row gap-2" onClick={props.onSendClick}>
           {t('additional.send').toUpperCase()}
           <img className="w-6 h-6" src="/additional/telegram-white.svg" alt="telegram" />
          </div>
          <div className="btn btn-info btn-xl btn-md flex flex-row gap-2" onClick={props.onCancelClick}>
           {t('additional.forget').toUpperCase()}
           <img className="w-4 h-4" src="/additional/garbage.svg" alt="telegram" />
         </div>
       </div>
    </div>
   
  )
}

const SolarSystem: FC = () => {

return (  
  <section className="universe">

    <ul className="solarsystem">
      <li className="sun"><span></span></li>
      <li className="mercury"><span>Mercury</span></li>
      <li className="venus"><span>Venus</span></li>
      <li className="earth"><span>Earth<span className="moon"> &amp; Moon</span></span></li>
      <li className="mars"><span>Mars</span></li>
      <li className="asteroids_meteorids"><span>Asteroids &amp; Meteorids</span></li>
      <li className="jupiter"><span>Jupiter</span></li>
      <li className="saturn"><span>Saturn &amp; <span className="ring">Ring</span></span></li>
      <li className="uranus"><span>Uranus</span></li>
      <li className="neptune"><span>Neptune</span></li>
      <li className="pluto"><span>Pluto</span></li>
    </ul>

  </section>)
}

const getTagsByPlanet = (planet: string) => {

  switch (planet) {
    case "mercury": { 
      return [{
        title: "communication",
        color: "#1ff7ba",
        },
        {
      title: "intelligence",
      color: "#1ff7ba",
      },
      {
      title: "adaptability",
      color: "#1ff7ba",
      },
    ] }
    case "venus": { 
    return [{
      title: "love",
      color: "#1ff7ba",
      },
      {
      title: "beauty",
      color: "#1ff7ba",
      },
      {
      title: "harmony",
      color: "#1ff7ba",
      },
    ]}
    case "earth": {
    return [{
      title: "stability",
      color: "#1ff7ba",
      },
      {
      title: "nurturing",
      color: "#1ff7ba",
      },
      {
      title: "growth",
      color: "#1ff7ba",
      },
    ]}
  case 'mars': {
    return [{
    title: "action",
    color: "#1ff7ba",
    },
    {
    title: "energy",
    color: "#1ff7ba",
    },
    {
    title: "courage",
    color: "#1ff7ba",
    },
  ]}
  case 'jupiter': {
    return [{
    title: "luck",
    color: "#1ff7ba",
    },
    {
    title: "expansion",
    color: "#1ff7ba",
    },
    {
    title: "wisdom",
    color: "#1ff7ba",
    },
  ]}
  case "saturn": {
    return [{
    title: "discipline",
    color: "#1ff7ba",
    },
    {
    title: "structure",
    color: "#1ff7ba",
    },
    {
    title: "pations",
    color: "#1ff7ba",
    },
  ]}
  case "uranus": {
  return  [{
    title: "innovation",
    color: "#1ff7ba",
    },
    {
    title: "rebellion",
    color: "#1ff7ba",
    },
    {
    title: "originality",
    color: "#1ff7ba",
    },
  ]}
  case "neptune": {
    return [{
    title: "dreams",
    color: "#1ff7ba",
    },
    {
    title: "intuition",
    color: "#1ff7ba",
    },
    {
    title: "spritality",
    color: "#1ff7ba",
    },
  ]}   
  case "pluto": {
  return [{
    title: "transformation",
    color: "#1ff7ba",
    },
    {
    title: "power",
    color: "#1ff7ba",
    },
    {
    title: "rebirth",
    color: "#1ff7ba",
    },
  ]}
  default: {
    return [];
    }
  }
}