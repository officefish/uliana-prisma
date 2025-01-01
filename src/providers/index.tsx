import { FC, PropsWithChildren } from "react"
import { SiteProvider } from "./store"
//import { UserProvider } from "./user"
import { TapsProvider } from "./tap"
import { TonClientProvider } from "./ton"
import { WalletProvider } from "./wallet"
import { BalanceProvider } from "./balance"
import {Snackbar} from "@/providers/snackbar.tsx";
import { FortunesProvider } from "./fortunes"
import { LocationProvider } from "./location"
import { ActionsProvider } from "./actions"
import { PlayerProvider } from "./player"

const Providers: FC <PropsWithChildren> = ({ children }) => {
    return (
        <Snackbar>
            <SiteProvider>
            <PlayerProvider>
            <TapsProvider>
            <WalletProvider>
            <TonClientProvider>
            <BalanceProvider>
            <FortunesProvider>
            <LocationProvider>
            <ActionsProvider>
                {children}
            </ActionsProvider>
            </LocationProvider>
            </FortunesProvider>
            </BalanceProvider>
            </TonClientProvider>
            </WalletProvider>
            </TapsProvider>
            </PlayerProvider>
            </SiteProvider>
        </Snackbar>
    )
}
export default Providers
