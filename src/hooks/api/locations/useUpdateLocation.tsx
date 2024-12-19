import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useLocationStore } from '@/providers/location';

export const useUpdateLocation = (apiFetch: any, onSuccess?: any) => {
  const { enqueueSnackbar } = useSnackbar();
    const { setLocation } = useLocationStore(); // Assuming you're using a custom hook to manage user state
  
  const updateLocation = useCallback(
    async () => {
      try {
        const res = await apiFetch('/location/current', 'GET', null, enqueueSnackbar);
    
        if (res?.location) {
         setLocation(res.location)
          onSuccess?.(); // Call the onSuccess callback if provided
        }

        onSuccess?.(); // Call the onSuccess callback if provided

      } catch (error: any) {
        enqueueSnackbar(`Error during farm: ${error}`, { variant: 'error' });
      } 
    },
    [apiFetch, onSuccess, enqueueSnackbar] // Dependencies
  )

  return { updateLocation, onSuccess }
}
