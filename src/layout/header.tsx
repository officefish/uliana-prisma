import { useSiteStore } from "@/providers/store";
import { FC, PropsWithChildren } from "react";

const Header: FC <PropsWithChildren> = ({ children }) => {
    const { isEmptyPage } = useSiteStore()

    return <header className={`
     ${isEmptyPage ? 'hidden' : 'absolute top-0 header w-screen h-16 z-20'}
    `}>{children}</header>
}
export default Header