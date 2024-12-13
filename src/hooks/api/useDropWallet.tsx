import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useWalletStore } from '@/providers/wallet';
//import { useUserStore } from '@/providers/user';
//import { IPlayer } from '@/types';
//import { useAxiosPostTrigger } from '@/services/axios.service'

export const useDropWallet = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setIsWalletInit, setIsTestTransaction } = useWalletStore();

  const dropWallet = useCallback(
    async () => {
   
      try {
        const res = await apiFetch('/wallet/drop', 'POST', {}, enqueueSnackbar);

        setIsWalletInit(res.walletStatus)
        setIsTestTransaction(res.transactionStatus)
        
      } catch (error: any) {
        console.error('Error during register wallet', error);
        //let message = error?.message || 'Unknown';
        //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
        enqueueSnackbar(`Error during register wallet: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { dropWallet }
}
