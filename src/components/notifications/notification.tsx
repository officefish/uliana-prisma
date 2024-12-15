
   
import usePageNotifications from "@/hooks/usePageNotifications";

import { FC, PropsWithChildren, useEffect } from "react";
import { useTranslation } from "react-i18next";


interface INotificationProps {
    title: string
    description: string    
    key: string
    onConfirm?: () => void
}

export const WithNotification: FC<PropsWithChildren<INotificationProps>> = (props) => {
    const { children, key, title, description, onConfirm } = props
    
    const {
        notificationsEnabled,
        shouldShowNotification,
        closeNotification,
    } = usePageNotifications();
      
    const handleConfirm = (page: any) => {
        closeNotification(page)
        onConfirm && onConfirm()
    }

    const { t } = useTranslation();


        // Implement your logic to handle the confirmation action
        // Example: navigate to a new page or trigger an action
        // Example: close the notification
        // Example: update the store with the new data]

  return (
    <>{notificationsEnabled && shouldShowNotification(key) && (
        <div> 
          <div className="flex flex-col gap-3 w-full gray-glass mx-2 px-4 py-8">
          <div className="text-3xl text-bold w-full text-center">{t(`${title}`)}</div>
          <div className="text-md w-full text-center">{t(`${description}`)}</div>         
        </div>
        <button onClick={() => handleConfirm(key)}>{t('additional.confirm')}</button>
      </div>
    )}
    {!notificationsEnabled || !shouldShowNotification(key) && children}
    </>
  )
}

