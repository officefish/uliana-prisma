//import {apiFetch} from "@/services/api";
//import { apiFetch } from "@/services/api";
import {FC, useEffect } from "react";
//import {useNavigate} from "react-router-dom";
import {useSiteStore} from "@/providers/store";
import { Page } from "@/types";


const AgataRoom: FC = () => {

  // Роутинг страниц
  const { setPage } = useSiteStore();
   
  useEffect(() => {
    setPage(Page.AGATA_ROOM);
  }, [setPage]);  


  return (
    <div className='w-full'>
      <div className="absolute h-screen w-screen agata-room-bg top-0 vignette">
        <div className='shop-dialog-title mt-24 uppercase px-20 w-full'>Прихожая Агаты</div>
        <div className='shop-dialog-description mt-12 uppercase px-2 text-[#8cbda8]'>{`Располагайтесь пока поудобнее, а дальше будет видно к чему это все приведет.`}</div>
      </div>
    
    </div>
  )
}
export default AgataRoom
