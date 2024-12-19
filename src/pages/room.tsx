import usePageNotifications from "@/hooks/usePageNotifications";
//import { useLocationStore } from "@/providers/location";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ROOM_PAGE = "room";

const Room: FC = () => {

  const { setPage } = useSiteStore();
 
  useEffect(() => {
    setPage(Page.ROOM);
  }, [setPage]);

    const { t } = useTranslation();

    const {
      notificationsEnabled,
      shouldShowNotification,
      closeNotification,
      setCurrentPage
    } = usePageNotifications();
  
    useEffect(() => {
      // Set the current page dynamically
      if (ROOM_PAGE) {
        setCurrentPage(ROOM_PAGE);
      }
    }, [ROOM_PAGE]);
  
    const handleConfirm = () => {
      closeNotification(ROOM_PAGE)
    }

    const [ checked, setChecked ] = useState(false);    
    const [ selected, setSelected ] = useState<null | string>(null)

    return (


      <div className=" w-screen h-screen 
       text-[#240919]
     flex  
     items-center justify-center
     room-bg">
      {/* Высшее счастье жизни состоит в осознании, что тебя любят (Виктор Гюго). */}

      {notificationsEnabled && shouldShowNotification(ROOM_PAGE) && (
        <div> 
          <div className="flex flex-col gap-3 w-full gray-glass mx-2 px-4 py-8">
          <div className="text-3xl text-bold w-full text-center">{t(`room.title`)}</div>
          <div className="text-md w-full text-center">{t(`room.description`)}</div>         
          <div className="btn btn-secondary m-2" onClick={() => handleConfirm()}>{t('additional.confirm').toUpperCase()}</div>
        </div>
      </div>
      )}

      {!notificationsEnabled || !shouldShowNotification(ROOM_PAGE) && (

        <>{checked ? (
          <div className="grid grid-cols-2 w-full absolute top-16 h-screen overflow-y-hidden">
             <div className="
                w-full bg-[#ecbde7] bg-opacity-80 
                text-black 
                font-semibold italic text-xs px-4 py-4
                ">
                  <hr id="hr-fancy"></hr>
                  <div dangerouslySetInnerHTML={{__html: t('room.markus.legend')}} ></div>
                  <hr id="hr-fancy"></hr>

                </div>

                <div className="
                w-full bg-[#bdecc7] bg-opacity-80 
                text-black 
                font-semibold italic text-xs px-4 py-4
                ">
                  <hr id="hr-fancy"></hr>
                  <div dangerouslySetInnerHTML={{__html: t('room.agata.legend')}} ></div>
                  <hr id="hr-fancy"></hr>

                </div>
          </div> 
        ) : (
          <div className="w-screen h-screen bg-black bg-opacity-70 vignette">

          {selected? (
            <div>
              <div className="italic w-full text-center shop-dialog-title mt-20">Вы уверены?</div>
              <div className="shop-dialog-description mt-4 px-8">Сделайте правильный выбор! Этот выбор повлияет на вашу судьбу!</div>
              
              <div className="mt-12">
              {selected == 'markus' ? (
                <div className="flex flex-col items-center justify-center">
                   <img className="w-36 h-36" 
                src="https://kubiki.io/public/locations/marcus-house.webp" 
                alt="" />
                <div className="shop-dialog-description mt-4">{t('room.markus.tag')}</div>
                </div>
               
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <img className="w-36 h-36" 
                    src="https://kubiki.io/public/locations/agata-house.webp" 
                    alt="" />
                <div className="shop-dialog-description mt-4">{t('room.agata.tag')}</div>

                </div>
             
              )}</div>
              <div className="flex flex-row justify-center gap-4 items-center mt-8">
                <div className="btn btn-secondary btn-md">
                  {t('additional.choose')}
                  <img className="w-6 h-6" src="/additional/select-white.svg" alt="confirm" />
                </div>
                <div className="btn btn-info btn-md"
                onClick={() => setSelected(null)}
                >{t('additional.cancel')}
                <img className="w-6 h-6" src="/additional/cancel.svg" alt="telegram" />                
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="italic w-full text-center shop-dialog-title mt-20">
                {t("additional.choose_question")}
              </div>

             <div className="italic w-full text-center shop-dialog-description mt-4">
                <div className="grid grid-cols-2">
                  <div className="px-2">{t("room.markus.short")}</div>
                  <div className="px-2">{t("room.agata.short")}</div>
                </div>
              </div>

            <div className="grid grid-cols-2 w-full cursor-pointer text-white">
              <div className="w-full text-center flex flex-col">
               <div className="
                  marcus-house-bg 
                  scale-75 hover:scale-110 
                  hover:-brightness-[110%]
                text-gray-400 hover:text-[#f5d7f2]
                border-gray-400 border-4 hover:border-[#f71fde]
                 transition-transform duration-500">
                  <div className="mt-72 text-md text-center p-2 italic select-none">{t('room.markus.tag')}</div>
                </div>
                <div className="btn btn-secondary btn-xs -mt-8 mx-8"
                   onClick={() => setSelected('markus')}
              >{t('additional.choose')}</div>
            </div>
            <div className="w-full text-center flex flex-col">
              <div className="
                agata-house-bg 
                scale-75 hover:scale-110 
                hover:-brightness-[110%]
              text-gray-400 hover:text-[#f5d7f2]
              border-gray-400 border-4 hover:border-[#f71fde]
                transition-transform duration-500">
                  <div className="mt-72 text-md text-center p-2 italic select-none">{t('room.agata.tag')}</div>
              </div>
              <div className="btn btn-secondary btn-xs -mt-8 mx-8"
              onClick={() => setSelected("agata")}
              >{t('additional.choose')}</div>
            </div>
          </div>     
            </>
          )}
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
        </>

        )}
           
    </div>
   )
}
export default Room