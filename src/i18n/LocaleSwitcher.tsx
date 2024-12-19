import {useTranslation} from "react-i18next";
import {supportedLngs} from "@/i18n/config.ts";
import {useState} from "react";

export default function LocaleSwitcher() {
  const {i18n} = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleChangeLang = (code: string) => {
    i18n.changeLanguage(code)
    setIsMenuOpen(false)
  }

  return (
    <div className="flex items-center">
      <div className="locale-switcher">

        <div className="lang-menu flex items-center text-[#f71fde]">
          <p className="lang-selected uppercase" onClick={() => setIsMenuOpen(!isMenuOpen)}>{i18n.resolvedLanguage}</p>
          <p className={`lang-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}></p>

          <div className={`lang-menu-list ${isMenuOpen ? 'active' : ''}`}>
            {Object.entries(supportedLngs).map(([code]) => (
              <p className="uppercase" key={code} onClick={() => handleChangeLang(code)}>
                {code}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
