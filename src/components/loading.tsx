
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

  const [isLoadingView, setIsLoadingView] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  const {t} = useTranslation();

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
       
        <div className="absolute bottom-12 w-full flex justify-center items-center">
          <span className={`loader-progress ${isComplete ? 'complete' : ''}`}></span>

          <p className="loader-progress-title">{t("intro.loading")}</p>
        </div>
      </div>

      {children}
    </div>
  )
}

