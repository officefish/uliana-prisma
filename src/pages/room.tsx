
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";

const Room: FC = () => {

  const { setPage } = useSiteStore();
 
  useEffect(() => {
    setPage(Page.ROOM);
  }, [setPage]);


    return (
    <div className="
     w-screen h-screen 
    text-lime-50S
    text-3xl flex 
    text-bold
    items-center justify-center
    room-bg">
      Логово ведьмы
    </div>
   )
}
export default Room