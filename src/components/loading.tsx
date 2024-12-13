/* HTML: <div class="loader"></div> */
//import { useLoaderStore } from "@/providers/store"
import useGetTotalChests from "@/hooks/api/useGetTotalChests";
import {apiFetch} from "@/services/api";
import {FC, PropsWithChildren, useEffect, useState} from "react"
import {useTranslation} from "react-i18next";

const Loading: FC = () => {

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="loader"></div>
    </div>

  )
}

interface ILoadingProps {
  isLoading: boolean
}

export default Loading

export const WithLoader: FC<PropsWithChildren<ILoadingProps>> = (props) => {

  const {isLoading, children} = props
  const {getTotalChests} = useGetTotalChests(apiFetch)

  const [numbers, setNumbers] = useState<number[]>([])
  const [isLoadingView, setIsLoadingView] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  const {t} = useTranslation();

  useEffect(() => {
    getTotalChests().then((res) => {
      const array = ("" + res).split("").map(Number)
      setNumbers(array)
    })
  }, [])

  useEffect(() => {
    if (!isLoading) {
      setIsComplete(true)

      setTimeout(() => {
        setIsLoadingView(false);
      }, 800); // Для завершения анимации
    }
  }, [isLoading])

  return (
    <div className="w-screen h-screen screen">
      <div className={`loader-wrapper ${isLoadingView ? 'active' : ''}`}>
        <div className="w-full h-full flex flex-col items-center justify-center pb-12">
          <div className='shop-dialog-title mt-8 uppercase px-2'>
            {t("intro.total_keys_left")}
          </div>
          <div className="w-full flex flex-row items-center justify-center mt-4">
            {numbers?.map((num) => (
              <p className="progress-number">{num}</p>
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 w-full flex justify-center items-center">
          <span className={`loader-progress ${isComplete ? 'complete' : ''}`}></span>

          <p className="loader-progress-title">{t("intro.loading")}</p>
        </div>
      </div>

      {children}
    </div>
  )
}

