
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";

const Secret: FC = () => {

  const { setPage } = useSiteStore();
 
  useEffect(() => {
    setPage(Page.SECRET);
  }, [setPage]);


    return (
    <div className="
    w-screen h-screen 
    text-gray-500
    text-3xl flex 
    text-bold
    items-center justify-center
    secret-bg
    ">
      Секретное место
    </div>
   )
}
export default Secret