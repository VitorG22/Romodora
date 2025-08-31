import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import { SettingsIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function NavBarTop() {
    const { userData } = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()

    return (
        <nav className='flex flex-row w-full bg-stone-900 items-center gap-2 p-1 text-stone-400'>
                {userData.picture ? (
                        <img src={userData.picture} className="aspect-square w-12 object-cover" />
                    ) : (
                        <div className="bg-stone-800 flex justify-center items-center text-lg aspect-square w-12 object-cover">{userData.name[0]}</div>
                    )}
            <p>{userData.name}</p>
            <div className='absolute right-2 flex flex-row'>
                <button onClick={()=> navigate('/configure')} className='flex aspect-square p-1 items-center justify-center hover:bg-stone-400/10'><SettingsIcon strokeWidth={1} /></button>
            </div>
        </nav>
    )
}