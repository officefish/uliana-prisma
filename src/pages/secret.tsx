
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";

const Secret: FC = () => {

  const { setPage } = useSiteStore();
 
  useEffect(() => {
    setPage(Page.SECRET);
  }, [setPage]);


    return (
    <div className="w-screen h-screen text-black text-3xl flex items-center justify-center">
      Секретное место
    </div>
   )
}
export default Secret