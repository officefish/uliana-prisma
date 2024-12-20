

import { FC } from "react"
import { useTranslation } from "react-i18next";
        
interface IDetailSelectProps {
    checked: boolean;
    setChecked: (checked: boolean) => void;
}

                  
const DetailsSelect: FC<IDetailSelectProps> = (props) => {
          
    const { checked, setChecked } = props
    const { t } = useTranslation()
          
    return (
        <div className="absolute bottom-28 w-full flex flex-col items-center justify-center">
            <div className="form-control w-36 text-center">
                <label className="label cursor-pointer">
                    <span className="shop-dialog-legend">{t('additional.legend')}</span>
                    <input type="checkbox" className="toggle toggle-secondary toggle-sm opacity-60"
                    defaultChecked={checked}
                    onChange={() => setChecked(!checked)}
                    />
                </label>
            </div>
        </div>
    )
}
export default DetailsSelect
