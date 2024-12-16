//import { useCallback } from 'react';
import { useBalanceStore } from '@/providers/balance';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications

import { useCallback } from 'react';
//import { useBalanceStore } from '@/providers/balance';


  export const useUpdateBalance = (apiFetch: any, onSuccess?: () => void) => {
    const { enqueueSnackbar } = useSnackbar();
  
    const { setCoins, setEnergy, setGems, setCrystals } = useBalanceStore();
  
    const updateBalance = useCallback(
      async () => {
     
        try {
          const res = await apiFetch('/balance', 'GET', null, enqueueSnackbar);
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
          //if (res.energyLatest && res.energyMax) {
          //  updatePlayerEnergy(res.energyLatest, res.energyMax)
          //}
          
        } catch (error: any) {
          //console.error('Error during login:', error);
          //let message = error?.message || 'Unknown';
          //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
          enqueueSnackbar(`Error during update energy: ${error}`, { variant: 'error' });
        } 
      },
      [apiFetch, enqueueSnackbar] // Dependencies
    )
  
    return { updateBalance } 
  }
