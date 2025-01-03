import { FortuneItem } from "@/components/items/item";
import usePageNotifications from "@/hooks/usePageNotifications";
import { useActionsStore } from "@/providers/actions";
import { useFortuneStore } from "@/providers/fortunes";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MAGIC_BALL_PAGE = "mg_page";

const MagicBall: FC = () => {

  // Роутинг страниц
  const { setPage, setIsEmptyPage } = useSiteStore();
 
  useEffect(() => {
    setIsEmptyPage(false)
    setPage(Page.MAGIC_BALL);
  }, []);

  // Уведомления локального хранилиша
  const {
    notificationsEnabled,
    shouldShowNotification,
    closeNotification,
    setCurrentPage
  } = usePageNotifications();

  useEffect(() => {
    // Set the current page dynamically
    if (MAGIC_BALL_PAGE) {
      setCurrentPage(MAGIC_BALL_PAGE);
    }
  }, [MAGIC_BALL_PAGE]);

    const handleNoteConfirm = () => {
      closeNotification(MAGIC_BALL_PAGE)
    }

    const { entryAction } = useActionsStore();

    return (
     <div className=" w-screen h-screen 
        text-[#240919]
     flex flex-col gap-2 
     items-center justify-center
     magic-ball-bg">

      {entryAction ? (
        <div className="text-purple-400 2xl text-bold">
          Action component
        </div>
      ) : (
        <>{notificationsEnabled && shouldShowNotification(MAGIC_BALL_PAGE) && (
          <FortuneNotification onConfirm={handleNoteConfirm}  /> 
        )}  
        {!notificationsEnabled || !shouldShowNotification(MAGIC_BALL_PAGE) && (
          <FortunesList />
        )}</>
      )}

    </div>
   )
}
export default MagicBall

interface IFotruneNoteProps {
  onConfirm: () => void
}

const FortuneNotification:FC<IFotruneNoteProps> = (props) => {

  const { onConfirm } = props;
  // Поддержка нескольких языков
  const { t } = useTranslation();

  return (
    <div> 
      <div className="flex flex-col gap-3 w-full gray-glass mx-2 px-4 py-8">
        <div className="text-3xl text-bold w-full text-center">{t(`prisma.title`)}</div>
        <div className="text-md w-full text-center">{t(`prisma.description`)}</div>         
        <div className="btn btn-secondary m-2" onClick={onConfirm}>{t('additional.confirm').toUpperCase()}</div>
      </div>
    </div>
  )
}

const FortunesList:FC = () => {

  // Поддержка нескольких языков
  const { t } = useTranslation();

 // list of fortunes id exists 
  const { fortunes } = useFortuneStore(); 
    
  const navigate = useNavigate()
 
  const handleSelectFortune = (id: string, key: string) => {
    console.log(id, key)
    navigate(`/fortunes/${key}`)
  }

  return(
    <div className="m-4 bg-glass absolute top-16 pb-8">
      <div className="text-center shop-dialog-description mt-2">{t('prisma.fortunes_list_title').toUpperCase()}</div>
      <div className="w-full px-4 grid grid-cols-2 gap-2 mt-2">
        {fortunes.length > 0 && fortunes.map( (fortune, index) => (
          <FortuneItem key={index} itemKey={fortune.key} price={fortune.price} onClick={handleSelectFortune}  />
        ))}
      </div>
    </div>
  )
}