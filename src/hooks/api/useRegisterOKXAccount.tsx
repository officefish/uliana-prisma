import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import {useOKXStore} from "@/providers/okx"; // Assuming you're using notistack for notifications
//import { useOKXStore } from '@/providers/okx';


const useRegisterOKXAccount = (apiFetch: any, onSuccess?: () => void, onError?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setIsRegistered } = useOKXStore();

  const registerOKXAccount = useCallback(
    async (uid: string) => {

      try {
        const res = await apiFetch('/okx/register','POST', { uid }, enqueueSnackbar)
        console.log(res)

        // TODO: Обновить на сервере ответ:
        if (res?.message === "success") {
          onSuccess && onSuccess()
          setIsRegistered(true)
          return
        }

        onError && onError()
      }
      catch (error) {
        enqueueSnackbar(`Error during okx register: ${error}`, { variant: 'error' });
        onError && onError()
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  );

  return { registerOKXAccount };
};

export default useRegisterOKXAccount;

