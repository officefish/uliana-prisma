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
          
          <div className="italic w-full text-center shop-dialog-title mt-20">
            {t("additional.choose")}
          </div>

          <div className="italic w-full text-center shop-dialog-description mt-4">
            <div className="grid grid-cols-2">
              <div className="px-2">{t("room.markus.short")}</div>
              <div className="px-2">{t("room.agata.short")}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 w-full cursor-pointer text-white -mt-4 px-4">
            <div className="
              marcus-house-bg 
              scale-75 hover:scale-110 
              hover:-brightness-[110%]
              text-gray-400 hover:text-[#f5d7f2]
               border-gray-400 border-4 hover:border-[#f71fde]
              transition-transform duration-500">
                <div className="mt-72 text-md text-center p-2 italic select-none">{t('room.markus.tag')}</div>
              </div>
            <div className="
              agata-house-bg 
              scale-75 hover:scale-110 
              hover:-brightness-[110%]
            text-gray-400 hover:text-[#f5d7f2]
              border-gray-400 border-4 hover:border-[#f71fde]
              transition-transform duration-500">
                <div className="mt-72 text-md text-center p-2 italic select-none">{t('room.agata.tag')}</div>
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
        </>

       
       
        )}
           
    </div>
   )
}
export default Room