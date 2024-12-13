import { FC, PropsWithChildren } from "react"
import { SiteProvider } from "./store"
import { UserProvider } from "./user"
import { TapsProvider } from "./tap"
import { TonClientProvider } from "./ton"
import { WalletProvider } from "./wallet"
import { ChestsProvider } from "./chests"
import { OKXProvider } from "./okx"
import {Snackbar} from "@/providers/snackbar.tsx";

const Providers: FC <PropsWithChildren> = ({ children }) => {
    return (
        <Snackbar>
            <SiteProvider>
            <UserProvider>
            <TapsProvider>
            <WalletProvider>
            <ChestsProvider>
            <TonClientProvider>
            <OKXProvider>
                {children}
            </OKXProvider>
            </TonClientProvider>
            </ChestsProvider>
            </WalletProvider>
            </TapsProvider>
            </UserProvider>
            </SiteProvider>
        </Snackbar>
    )
}
export default Providers
