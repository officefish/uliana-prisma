

import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";

const MagicBall: FC = () => {

  const { setPage } = useSiteStore();
 
  useEffect(() => {
    setPage(Page.MAGIC_BALL);
  }, [setPage]);


    return (
    <div className="
    w-screen h-screen 
  text-gray-50
    text-3xl flex 
    text-bold
    items-center justify-center
    magic-ball-bg
    ">
      Магический шар
    </div>
   )
}
export default MagicBall