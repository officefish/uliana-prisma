import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications
//import { useUserStore } from '@/providers/user';
import {useSiteStore} from "@/providers/store";
import {IReferral, Page} from "@/types";

const useUpdateReferrals = (apiFetch: any, page: number, take: number) => {
  const { enqueueSnackbar } = useSnackbar();

  // const {
  //   setReferralsCode,
  //   setReferralsPage,
  //   setReferralsTotal,
  //   setRefferals,
  //   setClaimedAll,
  // } = useUserStore();

  const { pageNotifications, setPageNotifications } = useSiteStore()

  const updateReferrals = useCallback(
    async () => {
      try {
        const res = await apiFetch(
          '/player/referrals',
          'POST',
          {page, take},
          enqueueSnackbar
        );
        console.log(res);
        if (res.referralCode.length > 0) {
          //setReferralsCode(res.referralCode);
        }

        if (res.referrals.length > 0) {
          //setReferralsPage(page);
          //setRefferals(page, res.referrals);

          const isClaimRef = !!res.referrals.find((ref: IReferral) => !ref.referrerRewarded)
          if (isClaimRef) setPageNotifications([...pageNotifications, Page.FRIENDS])
        }

        if (res.count > 0) {
          //setReferralsTotal(res.count);
        }

        if (res.claimedAll) {
          //setClaimedAll(res.claimedAll);
        }


      } catch (error) {
        console.error('Error updating user friends:', error);
        enqueueSnackbar('Error updating friends', { variant: 'error' });
      }
      return null;
    },
    [apiFetch, enqueueSnackbar, page, take] // Dependencies
  );

  return { updateReferrals };
};

export default useUpdateReferrals;
