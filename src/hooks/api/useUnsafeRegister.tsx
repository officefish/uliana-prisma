import { useCallback } from 'react'
import Auth from '@/services/api/auth';
//import { useUserStore } from '@/providers/user';
//import { IPlayer } from '@/types';
import { useSnackbarDevOnly } from '../useSnackbarDevOnly';

import { enqueueSnackbar } from 'notistack';

export const useUnsafeRegister = (apiFetch: any, onSuccess?: () => void, onError?: () => void, loadResources?: () => void  ) => {

  const { snackbarDevOnly } = useSnackbarDevOnly()
  //const { setPlayer, setIsAuth } = useUserStore();

  const unsafeRegister = useCallback(
    async () => {

    let res;

        try {

            const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe
            // Extract the 'startapp' command from initDataUnsafe
            const command = initDataUnsafe.start_param || initDataUnsafe.startapp;
            // Extract the 'first_name', 'last_name', and 'username' from initDataUnsafe user data
            const firstName = initDataUnsafe?.user?.first_name || ""
            const lastName = initDataUnsafe?.user?.last_name || ""
            const username = initDataUnsafe?.user?.username || ""
            const tgId = initDataUnsafe?.user?.id || '334222503'

            if (command) {
              // регистрация с реферальной ссылкой
              res = await apiFetch('/auth/register-with-command/unsafe', 'POST', { firstName, lastName, username, command, tgId }, enqueueSnackbar);
            } else {
              // регистрация обычным пользователем
              res = await apiFetch('/auth/register/unsafe', 'POST', { firstName, lastName, username, tgId }, enqueueSnackbar);
            }

            /* Set tokens */
            if (res.accessToken) {
              Auth.accessToken = res.accessToken;
            }
            if (res.refreshToken) {
              Auth.refreshToken = res.refreshToken;
            }
            if (res.player) {
              //const player = res.player as IPlayer;
              //setPlayer(player);
            }

            console.log(res.player);

            loadResources && await loadResources();
            onSuccess && onSuccess();
            //setIsAuth(true)
            return;

          } catch (error: any) {
            const msg = `Error during login: ${error}`
            enqueueSnackbar(msg, { variant: 'error' });

            onError && onError();
          }
    },
    [apiFetch, snackbarDevOnly,] //loadResources] // Dependencies
  )

  return { unsafeRegister }
}
