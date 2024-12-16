import { FC, useEffect, useState } from "react"
import Content from "./content"
import Footer from "./footer"
import Navigation from "./nav"
import Screen from "./screen"

import { Route, Routes } from "react-router-dom"

import { WithLoader } from "@/components/loading"
import { apiFetch } from "@/services/api"

import { useUnsafeRegister } from "@/hooks/api/useUnsafeRegister.tsx";
import { useRegister } from "@/hooks/api/useRegister"

import { useUpdateBalance } from "@/hooks/api/useUpdateBalance"
import { useUpdateFortunes } from "@/hooks/api/useUpdateFortunes"

import Friends from "@/pages/friends"
import Tasks from "@/pages/tasks"
import MagicBall from "@/pages/magicBall"
import Secret from "@/pages/secret"
import Room from "@/pages/room"
import Bawdry from "@/pages/bawdry"
//import Mobile from "@/pages/mobile.tsx";


const Cabinet:FC = () => {
  
  // const { setMenuTutorialOpen } = useSiteStore()

  const [isLoading, 
    setIsLoading
  ] = useState(true);

  const { updateBalance } = useUpdateBalance(apiFetch)
  const { updateFortunes } = useUpdateFortunes(apiFetch)

  const loadResources = async () => {
    // console.log("Loading resources")

    const apiRequests = [
      updateBalance(),
      updateFortunes(),
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
    <Screen>
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
    </Screen>
  </WithLoader>)
}

export default Cabinet
