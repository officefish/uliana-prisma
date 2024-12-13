import {FC, useEffect} from "react";
import {useSiteStore} from "@/providers/store";

interface MobilProps {}

const Mobile: FC<MobilProps> = () => {
  const {setIsEmptyPage} = useSiteStore();

  useEffect(() => {
    setIsEmptyPage(true);
  }, []);

  return (
    <div className="modile-content-wrapper">
      <div className="modile-content">
        <h1 className="modile-title">Welcome!</h1>
        <p className="modile-text">This app is available exclusively for use on mobile <br/> devices.</p>
        <p className="modile-sub-title">📱 <span className="modile-sub-title-text">How to get started ?</span></p>
        <p className="modile-sub-text">Scan the QR code below using your mobile <br/> device's camera or Telegram's
          built-in scanner.</p>
        <img src="/modile/qr-code.png" alt="qr-code"/>
      </div>
    </div>
  )
}

export default Mobile
