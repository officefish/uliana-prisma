//import { useCallback } from 'react';
//import { useBalanceStore } from '@/providers/balance';
import { useActionsStore } from '@/providers/actions';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications

import { useCallback } from 'react';
//import { useBalanceStore } from '@/providers/balance';


  export const useUpdateRecieved = (apiFetch: any, onSuccess?: () => void, onError?: (error: any) => void) => {
    
    const { enqueueSnackbar } = useSnackbar();

    const { setReceived } = useActionsStore()
    
    const updateRecieved = useCallback(
      async (skip: number, take: number) => {
     
        try {
          const res = await apiFetch('/player/received/by/tgId', 'POST', { skip, take}, enqueueSnackbar);
          console.log(res);        

          if (res.received) {
            console.log('save received')
            setReceived(res.received)
          }
  
          onSuccess && onSuccess()
          //if (res.energyLatest && res.energyMax) {
          //  updatePlayerEnergy(res.energyLatest, res.energyMax)
          //}
          
        } catch (error: any) {
          //console.error('Error during login:', error);
          //let message = error?.message || 'Unknown';

          //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
          enqueueSnackbar(`Error during update actions: ${error}`, { variant: 'error' });
          onError && onError(error);
        } 
      },
      [apiFetch, enqueueSnackbar] // Dependencies
    )
  
    return { updateRecieved } 
  }
