import { useContext } from "react"
import { AppContext } from "../../AppContext"
import { Link } from "react-router-dom"
import { ArrowBigLeftDash, House, Map, UserRound } from "lucide-react"

export default function LateralNavBar() {
    const { mainUser } = useContext(AppContext)

    return (
        <nav className='flex flex-col gap-2 h-full p-2 bg-romo-500 '>
            <section className='aspect-square h-12 overflow-hidden flex justify-center items-center'>
                <img src={mainUser.picture} className='object-cover' />
            </section>
            <hr className='border-romo-200' />
            <ul className='flex flex-col w-full items-center gap-2 *:text-romo-200 *:p-1 *:text-[.5rem] *:w-full  *:*:flex *:*:flex-col *:*:items-center *:*:justify-center *:hover:cursor-pointer   '>
                <li className=' flex flex-col items-center justify-center hover:text-romo-100 hover:bg-romo-200/10' onClick={() => history.back()}>
                <ArrowBigLeftDash size={25} strokeWidth={1} />
                <p>Voltar</p>
                </li>
                <li className='hover:text-romo-100 hover:bg-romo-200/10'>
                    <Link to='/home'>
                        <House size={25} strokeWidth={1} />
                        <p>Inicio</p>
                    </Link>
                </li>
                <li className='hover:text-romo-100 hover:bg-romo-200/10'>
                    <Link to='/character'>
                        <UserRound size={25} strokeWidth={1} />
                        <p>Personagens</p>
                    </Link>
                </li>
                <li className='hover:text-romo-100 hover:bg-romo-200/10'>
                    <Link to='/map'>
                        <Map size={25} strokeWidth={1} />
                        <p>Mapas</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}