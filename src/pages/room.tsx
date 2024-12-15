
import usePageNotifications from "@/hooks/usePageNotifications";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";
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

    return (
     <div className=" w-screen h-screen 
     text-[#ead4e1]
     flex  
     items-center justify-center
     room-bg">
        {/* {notificationsEnabled && shouldShowNotification(ROOM_PAGE) && (
              <div> 
                <div className="flex flex-col gap-3 w-full gray-glass mx-2 px-4 py-8">
                <div className="text-3xl text-bold w-full text-center">{t("room.title")}</div>
                <div className="text-md w-full text-center">{t("room.description")}</div>         
              </div>
              <button onClick={() => closeNotification(ROOM_PAGE)}>Close</button>
            </div>
          )} */}

      {notificationsEnabled && shouldShowNotification(ROOM_PAGE) && (
        <div> 
          <div className="flex flex-col gap-3 w-full gray-glass mx-2 px-4 py-8">
          <div className="text-3xl text-bold w-full text-center">{t(`secret.title`)}</div>
          <div className="text-md w-full text-center">{t(`secret.description`)}</div>         
          <div className="btn btn-secondary m-2" onClick={() => handleConfirm()}>{t('additional.confirm').toUpperCase()}</div>
        </div>
      </div>
      )}

      {!notificationsEnabled || !shouldShowNotification(ROOM_PAGE) && <div>
        Main content
      </div>}       
    </div>
   )
}
export default Room