//import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications

import { useCallback } from 'react';
//import { useBalanceStore } from '@/providers/balance';


  const useUpdateBalance = (apiFetch: any, onSuccess?: () => void) => {
    const { enqueueSnackbar } = useSnackbar();
  
    //const { setTape, setItems, setChests, setBaunty } = useChestsStore();
  
    const updateBalance = useCallback(
      async () => {
     
        try {
          const res = await apiFetch('/balance', 'GET', null, enqueueSnackbar);
          console.log(res);        
          //if (res.tape) {
            //setTape(res.tape)
            //setChests(res.tape.chests)
  
            //const baunty = res.item;
            //setBaunty(baunty);
   
            //const items = res.tape.chests.map((chest: any) => chest.item);
            //setItems(items);
          //}
  
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

export default useUpdateBalance;