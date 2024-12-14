import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications

export const useBuyGems = (apiFetch: any, onSuccess?: (link: string, numKeys: number) => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const buyGems = useCallback(
    async (numGems: number) => {
   
      try {
        const res = await apiFetch('/for-stars-shop/gems/buy', 'POST', { numGems }, enqueueSnackbar);
        onSuccess && onSuccess(res.invoiceLink, numGems);
        
      } catch (error: any) {
        enqueueSnackbar(`Error during buy card: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { buyGems }
}
