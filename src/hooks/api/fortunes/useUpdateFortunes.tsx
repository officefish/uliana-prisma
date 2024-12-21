import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useFortuneStore } from '@/providers/fortunes';
//import { useUserStore } from '@/providers/user'

export const useUpdateFortunes = (apiFetch: any, onSuccess?: any) => {
  const { enqueueSnackbar } = useSnackbar();
  //const { updatePlayerBalance, updatePlayerEnergy } = useFortuneSto();
  const { setFortunes } = useFortuneStore()
  
  const updateFortunes = useCallback(
    async () => {
      try {
        const res = await apiFetch('/fortune/all', 'GET', null, enqueueSnackbar);

        //console.log(res);

        if (res) {
          setFortunes(res); // Update fortunes in the fortune store
          // If successful, call the onSuccess callback if provided
        }

        onSuccess?.(); // Call the onSuccess callback if provided

      } catch (error: any) {
        enqueueSnackbar(`Error during farm: ${error}`, { variant: 'error' });
      } 
    },
    [apiFetch, onSuccess, enqueueSnackbar] // Dependencies
  )

  return { updateFortunes, onSuccess }
}
