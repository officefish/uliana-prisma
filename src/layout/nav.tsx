import { Link } from "react-router-dom"
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import {FC, useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import { useLocationStore } from "@/providers/location";

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
      {/* <NavButton notification={getIsNotification(Page.ROOM)} selected={page === Page.ROOM} to={'/room'} title={t('navigation.room')} index={1}/> */}
      <RoomNavButton page={page} getIsNotification={getIsNotification} />
      <NavButton notification={getIsNotification(Page.MAGIC_BALL)} selected={page === Page.MAGIC_BALL} to={'/'} title={t('navigation.magic_ball')} index={2}/>
      <NavButton notification={getIsNotification(Page.TASKS)} selected={page === Page.TASKS} to={'/tasks'} title={t('navigation.tasks')} index={3}/>
      <NavButton notification={getIsNotification(Page.FRIENDS)} selected={page === Page.FRIENDS} to={'/friends'} title={t('navigation.friends')} index={4}/>
    </div>
}
export default Navigation

//import { FriendsSvg, HomeSvg, OfferSvg, ShopSvg, TasksSvg } from "@/assets/svg"

interface IRoomNavButton {
  page: Page
  getIsNotification: (page: Page) => boolean
}

const RoomNavButton: FC<IRoomNavButton> = (props) => {

  const { page, getIsNotification } = props;

  const { t } = useTranslation();

  const [ selected, setSelected ] = useState(false)
  const [notification, setNotification ] = useState(false)
  const [to, setTo] = useState('/room')

  useEffect(() => {
    if (page === Page.ROOM) {
      setSelected(true)
      setNotification(getIsNotification(Page.ROOM))
      return
    } 
    if (page === Page.MARKUS_ROOM) {
      setSelected(true)
      setNotification(getIsNotification(Page.ROOM))
      return
    }
    if (page === Page.AGATA_ROOM) {
      setSelected(true)
      setNotification(getIsNotification(Page.ROOM))
      return
    }
    setSelected(false)
  }, [page])

  const { location } = useLocationStore();

  useEffect(() => {
    if (location?.template?.type === "MARKUS_ROOM" ) {
      setTo('/locations/markus_room')
      return
    }
    if (location?.template?.type === "AGATA_ROOM" ) {
      setTo('/locations/agata_room')
      return
    }
    setTo('/room')
  }, [location])

  return (
    <Link to={to}>
        <div className={`
            w-full h-full flex items-center justify-center flex-col
            nav-item
            py-1
            ${selected ? 'nav-select neumorphism-btn-select' : 'neumorphism-btn'}
            ${notification ? 'nav-notification' : ''}`
        }>
            <div className={`
                w-15 h-15 flex items-center justify-between flex-col gap-1
                `}>
                <img className="w-12 h-12" src="/nav/room.png" alt="room" />
                {t(`navigation.room`)}
            </div >
        </div>
    </Link>

)
}

interface INavButton {
  selected: boolean
  title: string
  to: string
  index: number
  notification: boolean
}

const NavButton:FC<INavButton> = (props) => {
    const { selected, to,  title, index, notification } = props

    const svgByIndex = (index: number) => {
        switch(index) {
            case 0: return <img className="w-12 h-12" src="/nav/secret.png" alt="secret" />
            case 1: return <img className="w-12 h-12" src="/nav/room.png" alt="room" />
            case 2: return <img className="w-12 h-12" src="/nav/sphere.png" alt="sphere" />
            case 3: return <img className="w-12 h-12" src="/nav/tasks.png" alt="tasks" />
            case 4: return <img className="w-12 h-12" src="/nav/friends-2.png" alt="friends" />
        }
    }

    return (
        <Link to={to}>
            <div className={`
                w-full h-full flex items-center justify-center flex-col
                nav-item
                py-1
                ${selected ? 'nav-select neumorphism-btn-select' : 'neumorphism-btn'}
                ${notification ? 'nav-notification' : ''}`
            }>
                <div className={`
                    w-15 h-15 flex items-center justify-between flex-col gap-1
                    `}>
                    {svgByIndex(index)}
                    {title}
                </div >
            </div>
        </Link>

    )
}

