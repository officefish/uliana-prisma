import {useGetChestBaunty} from "@/hooks/api/useGetChestBaunty";
import useUpdateChests from "@/hooks/api/useUpdateChests";
import {useChestsStore} from "@/providers/chests";
import {apiFetch} from "@/services/api";
//import { apiFetch } from "@/services/api";
import {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BauntyColor, BauntyPercent, BauntyTitle} from "@/const/baunty.tsx";
import {useSiteStore} from "@/providers/store";
import {useTranslation} from "react-i18next";


function getItemVariant(type: string) {
  switch (type) {
    case 'USDT':
      return 'farm/big-usdt.png'
    case 'COINS':
      return 'farm/big-coin.png'
    case 'KEYS':
      return 'farm/big-key.png'
    default:
      return '/farm/big-keys.png'
  }
}

const Baunty: FC = () => {
  const {setIsFooterTransparent} = useSiteStore()

  const [getBauntyLoading, setGetBauntyLoading] = useState(false)
  const handleGetBauntyLoading = (loading: boolean) => setGetBauntyLoading(loading)

  useEffect(() => {
    setIsFooterTransparent(true);
  }, [setIsFooterTransparent]);

  const {baunty} = useChestsStore();

  const [value, setValue] = useState<number>(0)

  const navigate = useNavigate()

  const onSuccessUpdateChests = () => {
    navigate('/')
    handleGetBauntyLoading(true)
  }

  useEffect(() => {
    if (!baunty) return;

    if (baunty.variant === "USDT") setValue((baunty?.value || 0) / 100)
    else setValue(baunty?.value || 0)
  }, [baunty]);

  const {updateChests} = useUpdateChests(apiFetch, onSuccessUpdateChests)

  const onSuccessBaunty = () => {
    updateChests()
  }

  const {getChestBaunty} = useGetChestBaunty(apiFetch, handleGetBauntyLoading, onSuccessBaunty)

  const handleClaimClick = () => {
    //console.log('handleClaimClick')
    getChestBaunty(baunty?.id || '')
  }

  const {t} = useTranslation();

  return (
    <div className='w-full chest-center-wrapper pb-44'>

      <div className='shop-dialog-title mt-12 uppercase px-2'>{t('baunty.got_reward')}</div>

      <div className='farm-reward flex flex-col justify-center items-center pt-0 gap-4'>
        <div className="flex flex-col justify-center items-center gap-4 w-full game-box-wrap pt-8">
          <div className='flex items-center justify-center w-full farm-reward-icon'>
            <div
              className="farm-reward-icon-blur"
              style={{background: BauntyColor[baunty?.type || "COMMON"]}}
            >
            </div>
            <img src={getItemVariant(baunty?.variant || 'KEYS')} alt=""/>
          </div>

          <div className="farm-reward-info flex flex-col items-center gap-2.5">
            <div className="farm-reward-type" style={{background: BauntyColor[baunty?.type || "COMMON"]}}>
              {BauntyTitle[baunty?.type || "COMMON"]} {BauntyPercent[baunty?.type || "COMMON"]}
            </div>
            <div className='farm-reward-title'>{value}</div>
            <div className='farm-reward-variant'>{baunty?.variant}</div>
          </div>
        </div>

        <button
          className="fixed bottom-24 h-20 max-w-60 w-full function-btn btn-no-body flex items-center justify-center px-2"
          onClick={handleClaimClick}
          disabled={getBauntyLoading}
        >
          {t('additional.claim').toUpperCase()}
        </button>
      </div>
    </div>
  )
}
export default Baunty
