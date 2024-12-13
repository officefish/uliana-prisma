import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications
import { useOKXStore } from '@/providers/okx';


const useGetOKXRegisterStatus = (apiFetch: any, onSuccess?: () => void, onError?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setIsRegistered } = useOKXStore();

  const getOKXRegisterStatus = useCallback(
    async () => {
      try {
        const res = await apiFetch('/okx/register/status', 'GET', enqueueSnackbar);

        if (res.isRegistered) {
          setIsRegistered(res.isRegistered);
        }

        onSuccess && onSuccess();
      } catch (error) {
        console.error('Error getting okx status');
        enqueueSnackbar('Error getting okx status', { variant: 'error' });
        onError && onError();
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  );

  return { getOKXRegisterStatus };
};

export default useGetOKXRegisterStatus;

