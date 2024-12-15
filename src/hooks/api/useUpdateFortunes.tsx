import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
//import { useUserStore } from '@/providers/user'

export const useUpdateFortunes = (apiFetch: any, onSuccess?: any) => {
  const { enqueueSnackbar } = useSnackbar();
  //const { updatePlayerBalance, updatePlayerEnergy } = useUserStore();
  
  const updateFortunes = useCallback(
    async () => {
      try {
        const res = await apiFetch('/fortune/all', 'GET', null, enqueueSnackbar);

        console.log(res);

        onSuccess?.(); // Call the onSuccess callback if provided

      } catch (error: any) {
        enqueueSnackbar(`Error during farm: ${error}`, { variant: 'error' });
      } 
    },
    [apiFetch, onSuccess, enqueueSnackbar] // Dependencies
  )

  return { updateFortunes, onSuccess }
}