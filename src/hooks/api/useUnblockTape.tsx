import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useChestsStore } from '@/providers/chests';
import {setBool} from "@/types";
//import { useUserStore } from '@/providers/user';
//import { IPlayer } from '@/types';
//import { useAxiosPostTrigger } from '@/services/axios.service'

export const useUnblockTape = (apiFetch: any, setLoading: setBool) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setTape, setChests } = useChestsStore();

  const unblockTape = useCallback(
    async (tapeId: string) => {

      setLoading(true);
      try {
        const res = await apiFetch('/chest/tape/unblock', 'POST', {tapeId}, enqueueSnackbar);

        setTape(res.tape)
        setChests(res.tape.chests)


      } catch (error: any) {
        console.error('Error during unblock tape', error);
        //let message = error?.message || 'Unknown';
        //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
        enqueueSnackbar(`Error during unblock tape: ${error}`, { variant: 'error' });
      } finally {
        setLoading(false)
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { unblockTape }
}
