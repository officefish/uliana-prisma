import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
//import { useUserStore } from '@/providers/user';
import {setBool} from "@/types";

export const useClaimBauntyForFriend = (apiFetch: any, setLoading: setBool, onSuccess?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  // const {
  //   setReferralStatus,
  //   updatePlayerInvoice,
  //   player
  // } = useUserStore();

  const claimBaunty = useCallback(
    async (referralId: string) => {
      setLoading(true)
      try {
        const res = await apiFetch('/player/referrals/claim', 'POST', { referralId }, enqueueSnackbar);
        console.log(res);

        if (res && res.referrerRewarded) {
          //setReferralStatus(referralId, res.referrerRewarded);
        }

        const stats = res.stats
        if (stats) {
          //updatePlayerInvoice(stats.balance, stats.usdt, stats.numKeys, player?.lastKeyReady || "");
        }

        onSuccess && onSuccess();

      } catch (error: any) {
        enqueueSnackbar(`Error during buy card: ${error}`, { variant: 'error' });
        console.error('Error updating user friends:', error);
      } finally {
        setLoading(false)
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { claimBaunty }
}
