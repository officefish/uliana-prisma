// import { FortuneItem } from "@/components/items/item";
// import usePageNotifications from "@/hooks/usePageNotifications";
// import { useActionsStore } from "@/providers/actions";
// import { useFortuneStore } from "@/providers/fortunes";
import { useActionsStore } from "@/providers/actions"
import { useSiteStore } from "@/providers/store"
import { Page } from "@/types"
import { FC, useEffect } from "react"
import { getActionBgSrcByKey } from "@/services/action.service"

const Action: FC = () => {

  const { setPage, setIsEmptyPage } = useSiteStore()
  useEffect(() => {    
    setPage(Page.ACTION)
    setIsEmptyPage(true)
    return () => {
        setIsEmptyPage(false)
    }
  }, [])

  const { fairyAction } = useActionsStore()
  useEffect(() => {
    //console.log(fairyAction)

    // Parse action key here and load ation content depends on action 

    if (fairyAction) {
      const bgImageUrl = getActionBgSrcByKey(fairyAction.key || ""); //
      //"/fortunes/lantern/venus.jpg"
      // Изменяем переменную в :root
      document.documentElement.style.setProperty("--bg-image", `url(${bgImageUrl})`)
    }

  }, [fairyAction])
 
  return (
    <div className="w-screen h-screen flex items-center justify-center">ACTION</div>
   )
}
export default Action
