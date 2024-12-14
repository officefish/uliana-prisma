import NavButton from "@/components/nav.button";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import {FC} from "react";
import { useTranslation } from "react-i18next";

const Navigation: FC = () => {

  const { page, isEmptyPage, pageNotifications } = useSiteStore()
  const { t } = useTranslation();

  const getIsNotification = (page: Page) => !!pageNotifications.find((value) => value === page)

    return <div className={`
    ${isEmptyPage ? 'hidden' : ''}
    grid grid-cols-5 gap-2.5
    text-xs
    mx-2 
    pb-7 pt-2
    text-purple-950
    z-40`}>
      <NavButton notification={getIsNotification(Page.SECRET)} selected={page === Page.SECRET} to={'/secret'} title={t('navigation.secret')} index={0}/>
      <NavButton notification={getIsNotification(Page.ROOM)} selected={page === Page.ROOM} to={'/room'} title={t('navigation.room')} index={1}/>
      <NavButton notification={getIsNotification(Page.MAGIC_BALL)} selected={page === Page.MAGIC_BALL} to={'/'} title={t('navigation.magic_ball')} index={2}/>
      <NavButton notification={getIsNotification(Page.TASKS)} selected={page === Page.TASKS} to={'/tasks'} title={t('navigation.tasks')} index={3}/>
      <NavButton notification={getIsNotification(Page.FRIENDS)} selected={page === Page.FRIENDS} to={'/friends'} title={t('navigation.friends')} index={4}/>
    </div>
}
export default Navigation
