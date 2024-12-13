import { useCallback } from 'react'
import { useSnackbar } from 'notistack'
import {Config} from "@/config.ts"; // Assuming you're using notistack for notifications

export const useSnackbarDevOnly = () => {
  const { enqueueSnackbar } = useSnackbar();

  const snackbarDevOnly = useCallback(
    async (msg: string, variant: 'info' | 'default' | 'error') => {
        if (Config.mode === "development") {
            enqueueSnackbar(msg, { variant });
        }
    }
  , [enqueueSnackbar])

  return { snackbarDevOnly }
}
