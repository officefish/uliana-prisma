import {FC, ReactNode} from "react";
import {SnackbarProvider} from "notistack";
import {Config} from "@/config.ts";

export const Snackbar: FC<{ children: ReactNode }> = ({children}) => {
  const isDev = Config.mode === 'development';

  if (isDev) {
    return (
      <SnackbarProvider
        maxSnack={8}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
      >
        {children}
      </SnackbarProvider>
    );
  }

  return <>{children}</>;
};
