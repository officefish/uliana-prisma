import { FC, PropsWithChildren } from "react"
import { SiteProvider } from "./store"
//import { UserProvider } from "./user"
import { TapsProvider } from "./tap"
import { TonClientProvider } from "./ton"
import { WalletProvider } from "./wallet"
import { ChestsProvider } from "./chests"
import { OKXProvider } from "./okx"
import { BalanceProvider } from "./balance"
import {Snackbar} from "@/providers/snackbar.tsx";
import { FortunesProvider } from "./fortunes"
import { LocationProvider } from "./location"
import { ActionsProvider } from "./actions"

const Providers: FC <PropsWithChildren> = ({ children }) => {
    return (
        <Snackbar>
            <SiteProvider>
            {/* <UserProvider> */}
            <TapsProvider>
            <WalletProvider>
            <ChestsProvider>
            <TonClientProvider>
            <OKXProvider>
            <BalanceProvider>
            <FortunesProvider>
            <LocationProvider>
            <ActionsProvider>
                {children}
            </ActionsProvider>
            </LocationProvider>
            </FortunesProvider>
            </BalanceProvider>
            </OKXProvider>
            </TonClientProvider>
            </ChestsProvider>
            </WalletProvider>
            </TapsProvider>
            {/* </UserProvider> */}
            </SiteProvider>
        </Snackbar>
    )
}
export default Providers
