
//import BauntyItem from "@/components/farm/baunty.item";
//import {BigClosedChest, Chest} from "@/components/farm/chest";
//import { useOpenChest } from "@/hooks/api/useOpenChest";
// import { useSimpleBuyKeys } from "@/hooks/api/useSimpleBuyKeys";
//import { useUnblockTape } from "@/hooks/api/useUnblockTape";
//import useUpdateTotalBalance from "@/hooks/api/useUpdateTotalBalance";
//import { useChestsStore } from "@/providers/chests";
//import { useSiteStore } from "@/providers/store";
//import { useUserStore } from "@/providers/user";
//import { apiFetch } from "@/services/api";
import { useSiteStore } from "@/providers/store";
import {Page} from "@/types";
import { FC, useEffect, 
  //useState 
} from "react";
//import { useNavigate } from "react-router-dom";
//import { useTranslation } from "react-i18next";


//const KEY_GENERATION_INTERVAL = 4 * 60 * 60 * 1000; // 4 часа в миллисекундах
//const KEY_GENERATION_INTERVAL = 1000 * 4 * 60; // 4 часа в миллисекундах

const Farm: FC = () => {

  const { setPage } = useSiteStore();

  useEffect(() => {
    setPage(Page.FARM);
  }, [setPage]);

  return (
    <div className="w-screen h-screen">
      Hello world!
    </div>
  )
}

export default Farm

