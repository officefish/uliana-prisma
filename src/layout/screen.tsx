import { FC, PropsWithChildren } from "react";

const Screen: FC <PropsWithChildren> = ({ children }) => {
    return  <>
      {/*<img src="bg.png" alt="bg"/>*/}
        {children}
  </>
}
export default Screen