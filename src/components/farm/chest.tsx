import { IChest } from "@/types/chest";
import { FC } from "react";

interface ChestProps {
  chest: IChest;
  onOpen: (chestId: string) => void;
  isLoading: boolean;
}

const Chest: FC<ChestProps> = (props) => {

  const handleOpen = () => {
    if (!props.isLoading) props.onOpen(props.chest.id);
  }

  return (
    <div className="chest-wrapper col-span-1 flex h-20 items-center justify-center btn-no-body"
         onClick={handleOpen}
    >
      <img className="w-18 h-18" src="farm/chest-open.png" alt="chest open"/>
    </div>
  )
}

const ClosedChest: FC = () => {
  return (
    <div className="chest-wrapper col-span-1 flex w-20 h-20 items-center justify-center btn-no-body">
      <img className="w-full h-full" src="farm/chest.png" alt="chest close"/>
    </div>
  )
}


interface BigClosedChestProps {
  onUnblockTape: () => void;
}

const BigClosedChest: FC<BigClosedChestProps> = ({onUnblockTape}) => {
  return (
    <div
      className="chest-big-wrapper col-span-1 flex !w-full !h-full items-center justify-center btn-no-body"
      onClick={onUnblockTape}
    >
      <img className="w-full h-full" src="farm/close-chest.webp" alt="chest big close"/>
    </div>
  )
}

export {Chest, ClosedChest, BigClosedChest};
