import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useBalanceStore } from '@/providers/balance';
import { useFortuneStore } from '@/providers/fortunes';
//import { useFortuneStore } from '@/providers/fortunes';
//import { useUserStore } from '@/providers/user'

export const useOneRoundMidnightWish = (apiFetch: any, onSuccess?: (mgs: string) => void, onError?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();
  //const { updatePlayerBalance, updatePlayerEnergy } = useFortuneSto();
  //const { setFortunes } = useFortuneStore()

  const { setCoins, setEnergy, setGems, setCrystals } = useBalanceStore();
  const { setFortuneAction } = useFortuneStore();
  
  const oneRoundMidnightWish  = useCallback(
    async () => {
      try {
        const res = await apiFetch('/fortune/midnight-wish', 'GET', null, enqueueSnackbar);

        console.log(res);
        
        if (res) {

          if (res?.balance?.coins) {
            setCoins(res.balance.coins);
          } else {
            setCoins(0);
          }

          if (res?.balance?.energyLatest) {
            setEnergy(res.balance.energyLatest);
          } else {
            setEnergy(0);
          }

          if (res?.balance?.gems) {
            setGems(res.balance.gems);
          } else {
            setGems(0);
          }

          if (res?.balance?.crystals) {
            setCrystals(res.balance.crystals);
          } else {
            setCrystals(0);
          }

          if (res?.wish) {
           onSuccess?.(res.wish); 
          }

          if (res.actionInstance) {
            setFortuneAction(res.actionInstance)
          } else {
            setFortuneAction(null) // Reset fortune action if none was provided in response
          }
        }

      } catch (error: any) {
        enqueueSnackbar(`Error during one round bawdry: ${error}`, { variant: 'error' });
        onError?.(); // Call the onError callback if provided
      } 
    },
    [apiFetch, onSuccess, enqueueSnackbar] // Dependencies
  )

  return { oneRoundMidnightWish  }
}
