
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Secret: FC = () => {

  const { setPage } = useSiteStore();
 
  useEffect(() => {
    setPage(Page.SECRET);
  }, [setPage]);

    const { t } = useTranslation();

    return (
      <div className=" w-screen h-screen 
      text-gray-100
      flex  
      items-center justify-center
      secret-bg">
        <div className="flex flex-col gap-3 w-full gray-glass mx-2 px-4 py-8">
            <div className="text-3xl text-bold w-full text-center">{t("secret.title")}</div>
            <div className="text-md w-full text-center">{t("secret.description")}</div>         
        </div>
     </div>
   )
}
export default Secret