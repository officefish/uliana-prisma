import { IChestItem } from "@/types/chest";
import { FC } from "react";

interface ItemProps {
    data?: IChestItem;
    selected?: boolean;
  }

  function getIconSrc(variant: string) {
    switch(variant) {
      case "KEYS": return "farm/big-key.png";
      case "COINS": return "farm/big-coin.png";
      case "USDT": return "farm/big-usdt.png";
    }
  }
  
  const BauntyItem: FC<ItemProps> = (props) => {
  
    const data = props.data
  
    return (
      <div className={`
      baunty-item relative w-full
      col-span-1 flex flex-col 
      gap-1
      p-1 
      items-center justify-center
      ${props.selected ? "selected-chest-item" : "opacity-60"} 
    `}>
        <img className="w-12 h-12" src={getIconSrc(data?.variant || "KEYS")} alt="chest close"/>
        <div className="chest-item-value">{data?.variant === "USDT" ? data.value / 100 : data?.value}</div>
      </div>
    )
  }
export default BauntyItem