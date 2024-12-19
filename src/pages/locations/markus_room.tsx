//import {apiFetch} from "@/services/api";
//import { apiFetch } from "@/services/api";
import {FC, useEffect } from "react";
//import {useNavigate} from "react-router-dom";
import {useSiteStore} from "@/providers/store";
import { Page } from "@/types";


const MarkusRoom: FC = () => {

  // Роутинг страниц
  const { setPage } = useSiteStore();
   
  useEffect(() => {
    setPage(Page.MARKUS_ROOM);
  }, [setPage]);  


  return (
    <div className='w-full'>
      <div className="absolute h-screen w-screen markus-room-bg top-0 vignette">

      </div>
    
    </div>
  )
}
export default MarkusRoom
