import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications
import { useOKXStore } from '@/providers/okx';


const useGetOKXStatus = (apiFetch: any, onSuccess?: () => void, onError?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setIsRegistered, setIsValidated, setIsDeposited } = useOKXStore();

  const getOKXStatus = useCallback(
    async () => {
      try {
        const res = await apiFetch('/okx/status', 'GET', enqueueSnackbar);

        // Filter tasks into dailyTasks and seasonTasks
        console.log(res);

        if (res.isRegistered) {
          setIsRegistered(res.isRegistered);
        }
        if (res.isValidated) {
          setIsValidated(res.isValidated);
        }
        if (res.isDeposited) {
          setIsDeposited(res.isDeposited);
        }

        onSuccess && onSuccess();

        //console.log(res);
      } catch (error) {
        console.error('Error getting okx status');
        enqueueSnackbar('Error getting okx status', { variant: 'error' });
        onError && onError();
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  );

  return { getOKXStatus };
};

export default useGetOKXStatus;

