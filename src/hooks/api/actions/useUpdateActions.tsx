//import { useCallback } from 'react';
//import { useBalanceStore } from '@/providers/balance';
import { useActionsStore } from '@/providers/actions';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications

import { useCallback } from 'react';
//import { useBalanceStore } from '@/providers/balance';


  export const useUpdateActions = (apiFetch: any, onSuccess?: () => void) => {
    const { enqueueSnackbar } = useSnackbar();

    const { setActions, setReceived } = useActionsStore()
    
    const updateActions = useCallback(
      async () => {
     
        try {
          const res = await apiFetch('/player/actions/by/tgId', 'GET', null, enqueueSnackbar);
          console.log(res);        

          if (res.actions) {
            setActions(res.actions)
          }

          // TODO: server sh

          if (res.received) {
            console.log('save recieved')
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
        } 
      },
      [apiFetch, enqueueSnackbar] // Dependencies
    )
  
    return { updateActions } 
  }
