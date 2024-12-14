import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useBalanceStore } from '@/providers/balance';
//import { useNavigate } from 'react-router-dom';

export const useSimpleBuyGems = (apiFetch: any, onSuccess?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

    const { setCoins, setEnergy, setGems, setCrystals } = useBalanceStore();

  const simpleBuyGems = useCallback(
    async (numGems: number) => {
   
      try {
        const res = await apiFetch('/balance/buy/gems', 'POST', { numGems }, enqueueSnackbar);

        console.log(res);        

        if (res?.balance?.coins) {
          setCoins(res.balance.coins);
        }

        if (res?.balance?.energyLatest) {
          setEnergy(res.balance.energyLatest);
        }

        if (res?.balance?.gems) {
          setGems(res.balance.gems);
        }

        if (res?.balance?.crystals) {
          setCrystals(res.balance.crystals);
        }

        onSuccess && onSuccess()

      } catch (error: any) {
        enqueueSnackbar(`Error during buy card: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { simpleBuyGems }
}
