//import { FriendsSvg, HomeSvg, OfferSvg, ShopSvg, TasksSvg } from "@/assets/svg"
import { FC } from "react"
import { Link } from "react-router-dom"

interface INavButton {
    selected: boolean
    title: string
    to: string
    index: number
    notification: boolean
}

const NavButton:FC<INavButton> = (props) => {
    const { selected, to,  title, index, notification } = props

    const svgByIndex = (index: number) => {
        switch(index) {
            case 0: return <img className="w-8 h-8" src="/nav/airdrop.webp" alt="airdrop" />
            case 1: return <img className="w-8 h-8" src="/nav/room.jpg" alt="room" />
            case 2: return <img className="w-8 h-8" src="/nav/sphere.jpg" alt="sphere" />
            case 3: return <img className="w-8 h-8" src="/nav/tasks.jpg" alt="tasks" />
            case 4: return <img className="w-8 h-8" src="/nav/friends.webp" alt="friends" />
        }
    }

    return (
        <Link to={to}>
            <div className={`
                w-full h-full flex items-center justify-center flex-col
                nav-item
                py-1
                ${selected ? 'nav-select' : 'text-white'}
                ${notification ? 'nav-notification' : ''}`
            }>
                <div className={`
                    w-12 h-12 flex items-center justify-between flex-col gap-1
                    `}>
                    {svgByIndex(index)}
                    {title}
                </div >
            </div>
        </Link>

    )
}

export default NavButton
