
import usePageNotifications from "@/hooks/usePageNotifications";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";

const SECRET_PAGE = "secret_page";

const Secret: FC = () => {

  const { setPage } = useSiteStore();
 
  useEffect(() => {
    setPage(Page.SECRET);
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
      if (SECRET_PAGE) {
        setCurrentPage(SECRET_PAGE);
      }
    }, [SECRET_PAGE]);

    const handleConfirm = () => {
      closeNotification(SECRET_PAGE)
    }

    return (
      <div className=" w-screen h-screen 
         text-[#240919]
      flex  
      items-center justify-center
      secret-bg">
         {/* {notificationsEnabled && shouldShowNotification(SECRET_PAGE) && (
              <div> 
                <div className="flex flex-col gap-3 w-full gray-glass mx-2 px-4 py-8">
                <div className="text-3xl text-bold w-full text-center">{t("secret.title")}</div>
                <div className="text-md w-full text-center">{t("secret.description")}</div>         
              </div>
              <button onClick={() => closeNotification(SECRET_PAGE)}>Close</button>
            </div>
          )} */}

      {notificationsEnabled && shouldShowNotification(SECRET_PAGE) && (
        <div> 
          <div className="flex flex-col gap-3 w-full gray-glass mx-2 px-4 py-8">
          <div className="text-3xl text-bold w-full text-center">{t(`secret.title`)}</div>
          <div className="text-md w-full text-center">{t(`secret.description`)}</div>         
          <div className="btn btn-secondary m-2" onClick={() => handleConfirm()}>{t('additional.confirm').toUpperCase()}</div>
        </div>
        
      </div>
      )}

      {!notificationsEnabled || !shouldShowNotification(SECRET_PAGE) && (
        <div className="italic w-full text-center text-pink-100 px-4">
        Снежинки — одна из самых хрупких вещей в природе, но только посмотрите, что они могут сделать, когда склеиваются (Веста Кел).
      </div>)}
       
     </div>
   )
}
export default Secret