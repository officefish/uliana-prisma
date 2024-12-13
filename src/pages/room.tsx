
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";

const Room: FC = () => {

  const { setPage } = useSiteStore();
 
  useEffect(() => {
    setPage(Page.ROOM);
  }, [setPage]);


    return (
    <div className="w-screen h-screen text-black text-3xl flex items-center justify-center">
      Логово ведьмы
    </div>
   )
}
export default Room