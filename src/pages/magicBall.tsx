import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";

const MagicBall: FC = () => {

  const { setPage, setIsFooterTransparent } = useSiteStore();
 
  useEffect(() => {
    setPage(Page.MAGIC_BALL);
  }, [setPage]);

  useEffect(() => {
    setIsFooterTransparent(false);
  }, [setIsFooterTransparent]);

  const { t } = useTranslation();

    return (
     <div className=" w-screen h-screen 
      text-[#ead4e1]
     flex  
     items-center justify-center
     magic-ball-bg">
       <div className="flex flex-col gap-3 w-full gray-glass mx-2 px-4 py-8">
           <div className="text-3xl text-bold w-full text-center">{t("prisma.title")}</div>
           <div className="text-md w-full text-center">{t("prisma.description")}</div>         
       </div>
    </div>
   )
}
export default MagicBall