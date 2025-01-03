// import { FortuneItem } from "@/components/items/item";
// import usePageNotifications from "@/hooks/usePageNotifications";
// import { useActionsStore } from "@/providers/actions";
// import { useFortuneStore } from "@/providers/fortunes";
import { useSiteStore } from "@/providers/store"
import { Page } from "@/types"
import { FC, useEffect } from "react"
//import { useTranslation } from "react-i18next";
//import { useNavigate } from "react-router-dom";

const Action: FC = () => {

  const { setPage, setIsEmptyPage } = useSiteStore()
 
  useEffect(() => {
    setPage(Page.ACTION)
  }, [setPage])

  useEffect(() => {    
    setIsEmptyPage(true)
    return () => {
        setIsEmptyPage(false)
    }
  }, [])

  useEffect(() => {
    const bgImageUrl = "/fortunes/lantern/venus.jpg"
    // Изменяем переменную в :root
    document.documentElement.style.setProperty("--bg-image", `url(${bgImageUrl})`)
  }, [])
    
  return (
    <div className="w-screen h-screen flex items-center justify-center">ACTION</div>
   )
}
export default Action
