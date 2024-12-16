import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
//import { useFortuneStore } from '@/providers/fortunes';
//import { useUserStore } from '@/providers/user'

export const useOneRoundBawdry = (apiFetch: any, onSuccess?: (mgs: string) => void, onError?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();
  //const { updatePlayerBalance, updatePlayerEnergy } = useFortuneSto();
  //const { setFortunes } = useFortuneStore()
  
  const oneRoundBawdry = useCallback(
    async () => {
      try {
        const res = await apiFetch('/fortune/bawdry', 'GET', null, enqueueSnackbar);

        console.log(res);
        //if (res?.fortunes) {

        //}

        if (res) {
          //setFortunes(res); // Update fortunes in the fortune store

          // Update player balance and energy
          //updatePlayerBalance(res.balance);
          //updatePlayerEnergy(res.energy);

          // ... other updates as needed

          // If successful, call the onSuccess callback if provided
        }

        onSuccess?.('some bawdry'); // Call the onSuccess callback if provided

      } catch (error: any) {
        enqueueSnackbar(`Error during one round bawdry: ${error}`, { variant: 'error' });
        onError?.(); // Call the onError callback if provided
      } 
    },
    [apiFetch, onSuccess, enqueueSnackbar] // Dependencies
  )

  return { oneRoundBawdry }
}
