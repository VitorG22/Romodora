import { ChevronDown, ChevronUp } from "lucide-react"
import { useContext, useEffect, useRef, useState } from "react"
import { GameContext } from "../../../../scripts/socket"
import "./style.css"
import DicesTab from "./tabs/dices"
import MapSelectionTab from "./tabs/mapSelection"
import Inspect from "./tabs/inspect"

const tabsList = [
    {
        title: "Personal",
        id: "playerDataControl",
        needPermissionTypeAdmin: false,
        component: <DicesTab />
    },
    {
        title: "Map Selector",
        id: "mapSelection",
        needPermissionTypeAdmin: true,
        component: <MapSelectionTab />
    },
    {
        title: "Inspect",
        id: "inspect",
        needPermissionTypeAdmin: false,
        component: <Inspect />
    }
]

export function BottomMenu() {
    const [isBottomMenuOpen, setIsBottomMenuOpen] = useState<boolean>(true)
    const bottomMenuContainerRef = useRef<HTMLElement>(null)
    const [selectedTab, setSelectedTab] = useState<string>("playerDataControl")

    useEffect(() => {
        if (isBottomMenuOpen) {
            bottomMenuContainerRef.current?.classList.remove('isBottomMenuCollapse')
            return
        }
        bottomMenuContainerRef.current?.classList.add('isBottomMenuCollapse')

    }, [isBottomMenuOpen])

    return (
        <main ref={bottomMenuContainerRef} id={"bottomMenuContainer"} className='flex flex-col h-full row-start-4 row-end-6 col-start-3 col-end-10 z-20 text-stone-300'>
            <button onClick={() => setIsBottomMenuOpen(!isBottomMenuOpen)} className="flex justify-center w-full h-6 bg-stone-900 hover:bg-stone-800 text-stone-400 border-t border-stone-400/40">
                {isBottomMenuOpen ? (<ChevronDown strokeWidth={1} />) : (<ChevronUp strokeWidth={1} />)}
            </button>
            <section id="subElementsContainer" className='flex flex-col justify-start divide-x divide-stone-400/40 bg-stone-900'>
                <TabsNavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                {tabsList.find(tabData => tabData.id == selectedTab)?.component}
            </section>
        </main>

    )
}

function TabsNavBar({ selectedTab, setSelectedTab }: { selectedTab: string, setSelectedTab: React.Dispatch<React.SetStateAction<string>> }) {
    const game = useContext(GameContext)

    return (
        <ul className="h-fit flex flex-row *:px-2 *:py-1 bg-stone-900">
            {tabsList.map(tabData => {
                if (tabData.needPermissionTypeAdmin == false || game?.isHost == true) {
                    return <li onClick={() => setSelectedTab(tabData.id)} className={`hover:cursor-pointer hover:bg-stone-800 border-b ${tabData.id == selectedTab ? ("border-purple-500") : ("border-transparent")}`}>
                        {tabData.title}
                    </li>
                }
            })}
        </ul>
    )
}