import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications


const useGetTotalChests = (apiFetch: any, onSuccess?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const getTotalChests = useCallback(
    async () => {
      try {
        const res = await apiFetch('/chest/total', 'GET', enqueueSnackbar);

        // Filter tasks into dailyTasks and seasonTasks
        console.log(res);

        if (res?.remaining) {
          // enqueueSnackbar(`Total chests count fetched: ${res.remaining}`, { variant: 'info' });
        }

        onSuccess && onSuccess();

        // TODO: Костыль
        return res?.remaining || 0;

        //console.log(res);
      } catch (error) {
        console.error('Error getting total chests count');
        enqueueSnackbar('Error getting total chests count', { variant: 'error' });
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  );

  return { getTotalChests };
};

export default useGetTotalChests;

