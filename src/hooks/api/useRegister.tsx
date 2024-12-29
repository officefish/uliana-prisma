import { useCallback } from 'react'
import Auth from '@/services/api/auth';
//import { useUserStore } from '@/providers/user';
//import { IPlayer } from '@/types';
import { useSnackbarDevOnly } from '../useSnackbarDevOnly';

import { enqueueSnackbar } from 'notistack';
import {Config} from "@/config.ts";

export const useRegister = (apiFetch: any, onSuccess?: () => void, onError?: () => void, loadResources?: () => void  ) => {

  const { snackbarDevOnly } = useSnackbarDevOnly()
  //const { setPlayer, setIsAuth } = useUserStore();

  const register = useCallback(
    async () => {

    let res;

        try {
            let initData = window?.Telegram?.WebApp?.initData;

            if (!initData && Config.mode === "development") {
                initData = Config.initData
            }

            const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe
            const command = initDataUnsafe.start_param || initDataUnsafe.startapp;

            if (command) {
              // регистрация с реферальной ссылкой
              res = await apiFetch('/auth/register-with-command', 'POST', { initData, command }, enqueueSnackbar);
            } else {
              // регистрация обычным пользователем
              res = await apiFetch('/auth/register', 'POST', { initData }, enqueueSnackbar);
            }

            /* Set tokens */
            if (res.accessToken) {
              Auth.accessToken = res.accessToken;
            }
            if (res.refreshToken) {
              Auth.refreshToken = res.refreshToken;
            }
            if (res.player) {
             // const player = res.player as IPlayer;
              //setPlayer(player);
            }

            loadResources && await loadResources();
            onSuccess && onSuccess();
            //setIsAuth(true)

          } catch (error: any) {
            onError && onError();
            //const msg = `Error during login: ${error}`
            //enqueueSnackbar(msg, { variant: 'error' });
          }
    },
    [apiFetch, snackbarDevOnly,] //loadResources] // Dependencies
  )

  return { register }
}
