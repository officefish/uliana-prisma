import { FC, useEffect, useState } from "react"
import Content from "./content"
import Footer from "./footer"
import Navigation from "./nav"

import { Route, Routes } from "react-router-dom"

import { WithLoader } from "@/components/loading"
import { apiFetch } from "@/services/api"

import { useUnsafeRegister } from "@/hooks/api/useUnsafeRegister.tsx";
import { useRegister } from "@/hooks/api/useRegister"

import { useUpdateBalance } from "@/hooks/api/stats/useUpdateBalance"
import { useUpdateFortunes } from "@/hooks/api/fortunes/useUpdateFortunes"

import Friends from "@/pages/friends"
import Tasks from "@/pages/tasks"
import MagicBall from "@/pages/magicBall"
import Secret from "@/pages/secret"
import Room from "@/pages/room"
import Bawdry from "@/pages/bawdry"
import Lantern from "@/pages/lantern"
import { useUpdateLocation } from "@/hooks/api/locations/useUpdateLocation"
import AgataRoom from "@/pages/locations/agata_room"
import MarkusRoom from "@/pages/locations/markus_room"
import { useSiteStore } from "@/providers/store"
//import Mobile from "@/pages/mobile.tsx";

const Cabinet:FC = () => {
  
   const { setIsEmptyPage } = useSiteStore()

  const [isLoading, 
    setIsLoading
  ] = useState(true);

  useEffect(() => {
    setIsEmptyPage(isLoading)
  }, [isLoading])

  const { updateBalance } = useUpdateBalance(apiFetch)
  const { updateFortunes } = useUpdateFortunes(apiFetch)
  const { updateLocation } = useUpdateLocation(apiFetch)

  const loadResources = async () => {
    // console.log("Loading resources")

    const apiRequests = [
      updateBalance(),
      updateFortunes(),
      updateLocation(),
      //updateWalletStatus(),
      //updateReferrals(),
      //updateTasks(),
      //updateDailyQuest(),
      //getOKXStatus(),
    ];

    Promise.all([...apiRequests],).then(() => {
      setIsLoading(false)
      console.log('complete load resources')
      // TODO: все ресурсы загружены можно выходить из прелоадера
    })
    
  }
  /* Каллбеки по безопасной регистрации с initData */
  // const onSaveRegisterSuccess = () => {
  //   // При удачной авторизации грузим ресурсы
  //   loadResources();
  // }
  // const onSaveRegisterError = () => {
  //   // При неудачной авторизации пробуем зайти по tgId
  //   unsafeRegister();
  // }

  const onUnsaveRegisterSuccess = () => {
    // При удачной авторизации по tgId грузим ресурсы
    console.log("onUnsaveRegisterSuccess")
  }
  const onUnsafeRegisterError = () => {
    console.log("onUnsaveRegisterError")
  }

  const { unsafeRegister } = useUnsafeRegister(apiFetch, onUnsaveRegisterSuccess, onUnsafeRegisterError, loadResources);

  /* Каллбеки по безопасной регистрации с initData */
  const onSaveRegisterSuccess = () => {
    // При удачной авторизации грузим ресурсы
    //loadResources();
  }

  const onSaveRegisterError = () => {
    //При неудачной авторизации пробуем зайти по tgId
    unsafeRegister();
  }

  const { register } = useRegister(apiFetch, onSaveRegisterSuccess, onSaveRegisterError, loadResources);

  const [isPreflight, setIsPreflight] = useState(false);

  useEffect(() => {
    if (!isPreflight) {
      setIsPreflight(true)
      register()
    }
  }, [register, isPreflight, setIsPreflight]);


  //const [isPC, setIsPC] = useState(false);

  useEffect(() => {
    //const isTelegramPlatform = window?.Telegram?.WebApp?.platform === 'tdesktop'
    //const isUserAgent = /Windows|Macintosh/i.test(navigator.userAgent)
    // const isDev = Config.mode === 'development'

    // TODO: Добавить `&& !isDev`
    //const isPc = (isTelegramPlatform || isUserAgent)

    //if (isPc) setIsPC(true)

    //const isTutorialComplete = localStorage.getItem('tutorial_complete')
    //if (!isTutorialComplete && !isPc) setMenuTutorialOpen(true)
  }, []);


return (
  <WithLoader isLoading={isLoading}>
      <Content>
      <Routes>
        {/* { isPC ? (
          <Route path='*' element={<Mobile/>}/>
        ) : ( */}
          <>
            <Route path='/' element={<MagicBall/>}/>
            <Route path='/secret' element={<Secret/>}/>
            <Route path='/room' element={<Room/>}/>
            <Route path='/friends' element={<Friends/>}/>
            <Route path='/tasks' element={<Tasks/>}/>
            <Route path='/fortunes/bawdry' element={<Bawdry/>}/>
            <Route path='/fortunes/lantern' element={<Lantern/>}/>
            <Route path='/locations/markus_room' element={<MarkusRoom/>}/>
            <Route path='/locations/agata_room' element={<AgataRoom/>}/>
            {/* <Route path='/airdrop' element={<Airdrop/>}/>
            <Route path='/baunty' element={<Baunty/>}/>
            <Route path='/chest-items' element={<ChestItems/>}/>
            <Route path='/daily' element={<Daily/>}/> */}
          </>
          {/* ) } */}
        </Routes>
      </Content>
      <Footer>
        <Navigation />
      </Footer>
  </WithLoader>)
}

export default Cabinet
