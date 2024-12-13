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
    grid grid-cols-4 gap-2.5
    mx-2 
    pb-7 pt-2
    z-40`}>
      <NavButton notification={getIsNotification(Page.AIRDROP)} selected={page === Page.AIRDROP} to={'/airdrop'} title={t('navigation.airdrop')} index={0}/>
      <NavButton notification={getIsNotification(Page.FARM)} selected={page === Page.FARM} to={'/'} title={t('navigation.game')} index={1}/>
      <NavButton notification={getIsNotification(Page.TASKS)} selected={page === Page.TASKS} to={'/tasks'} title={t('navigation.tasks')} index={2}/>
      <NavButton notification={getIsNotification(Page.FRIENDS)} selected={page === Page.FRIENDS} to={'/friends'} title={t('navigation.friends')} index={3}/>
    </div>
}
export default Navigation
