

import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";

const MagicBall: FC = () => {

  const { setPage } = useSiteStore();
 
  useEffect(() => {
    setPage(Page.MAGIC_BALL);
  }, [setPage]);


    return (
    <div className="w-screen h-screen text-black text-3xl flex items-center justify-center">
      Магический шар
    </div>
   )
}
export default MagicBall