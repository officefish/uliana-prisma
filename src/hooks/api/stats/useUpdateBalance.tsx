//import { useCallback } from 'react';
import { useBalanceStore } from '@/providers/balance';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications

import { useCallback } from 'react';
//import { useBalanceStore } from '@/providers/balance';


  export const useUpdateBalance = (apiFetch: any, onSuccess?: () => void) => {
    const { enqueueSnackbar } = useSnackbar();
  
    const { 
      setCoins, 
      setEnergy, 
      setGems, 
      setCrystals,
      setEnergyLatest,
      setEnergyMax,
      setLastEnergyUpdate,
      setRecoveryRate, 
      setLastGemReady,
      setLastCrystalReady,
    
    } = useBalanceStore();
  
    const updateBalance = useCallback(
      async () => {
     
        try {
          const res = await apiFetch('/balance', 'GET', null, enqueueSnackbar);
          //console.log(res);        

          if (res?.balance?.coins) {
            setCoins(res.balance.coins);
          } else {
            setCoins(0);
          }

          if (res?.balance?.energyLatest) {
            setEnergy(res.balance.energyLatest);
          } else {
            setEnergy(0);
          }

          if (res?.balance?.gems) {

            setGems(res.balance.gems);
          } else {
            setGems(0);
          }

          if (res?.balance?.crystals) {
            setCrystals(res.balance.crystals);
          } else {
            setCrystals(0);
          }

          if (res?.balance?.energyLatest) {
            setEnergyLatest(res.balance?.energyLatest);
          }

          if (res?.balance?.energyMax) {
            setEnergyMax(res.balance?.energyMax);
          } else {
            setEnergyMax(0);
          }

          if (res?.balance?.lastEnergyUpdate) {
            setLastEnergyUpdate(res.balance?.lastEnergyUpdate);
          }

          if (res?.balance?.recoveryRate) {
            setRecoveryRate(res.balance?.recoveryRate);
          } 

          if (res?.balance?.lastGemReady) {
            setLastGemReady(res.balance?.lastGemReady);
          }

          if (res?.balance?.lastCrystalReady) {
            setLastCrystalReady(res.balance?.lastCrystalReady);
          } 

  
          onSuccess && onSuccess()
          //if (res.energyLatest && res.energyMax) {
          //  updatePlayerEnergy(res.energyLatest, res.energyMax)
          //}
          
        } catch (error: any) {
          //console.error('Error during login:', error);
          //let message = error?.message || 'Unknown';
          //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
          enqueueSnackbar(`Error during update balance: ${error}`, { variant: 'error' });
        } 
      },
      [apiFetch, enqueueSnackbar] // Dependencies
    )
  
    return { updateBalance } 
  }
