import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useLocationStore } from '@/providers/location';

export const useSelectLocation = (apiFetch: any, onSuccess?: any, onError?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();
    const { setLocation } = useLocationStore(); // Assuming you're using a custom hook to manage user state
  
  const selectLocation = useCallback(
    async (location: string) => {
      try {
        const res = await apiFetch('/location/select', 'POST', { location }, enqueueSnackbar);
    
        if (res?.location) {
         setLocation(res.location)
          onSuccess?.(); // Call the onSuccess callback if provided
        }

        onSuccess?.(); // Call the onSuccess callback if provided

      } catch (error: any) {
        enqueueSnackbar(`Error during farm: ${error}`, { variant: 'error' });
        onError?.(); // Call the onErrorSelect callback if provided
      } 
    },
    [apiFetch, onSuccess, enqueueSnackbar] // Dependencies
  )

  return { selectLocation, onSuccess }
}
