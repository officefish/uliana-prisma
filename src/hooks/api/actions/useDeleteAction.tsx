//import { useCallback } from 'react';
//import { useBalanceStore } from '@/providers/balance';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications

import { useCallback } from 'react';
//import { useBalanceStore } from '@/providers/balance';


  export const useDeleteAction = (apiFetch: any, onSuccess?: () => void) => {
    const { enqueueSnackbar } = useSnackbar();
    
    const deleteAction = useCallback(
      async (id: string) => {
     
        try {
          const res = await apiFetch('/action/instance', 'DELETE', { id }, enqueueSnackbar);
          console.log(res);        
  
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
  
    return { deleteAction } 
  }
