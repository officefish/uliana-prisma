import { FC, PropsWithChildren } from "react";

const Header: FC <PropsWithChildren> = ({ children }) => {
    return <header className="absolute top-0 header w-screen h-16 z-20">{children}</header>
}
export default Header