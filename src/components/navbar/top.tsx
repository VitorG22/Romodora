import { useContext } from "react"
import { AppContext } from "../../AppContext"
import { IAppProvider } from "../../interfaces"

export default function TopNavBar() {
    const { mainUser } = useContext<IAppProvider>(AppContext)

    return (
        <nav className='bg-romo-500 px-6 py-2'>
            <div className="flex flex-row items-center w-fit gap-2">
                <div className="flex justify-center items-center overflow-hidden h-12 aspect-square">
                    <img src={mainUser.picture}
                    className='w-full flex'
                    />
                </div>
                <article className=''>
                    <h1 className='text-sm text-romo-100'>{mainUser.name}</h1>
                    <h3 className='text-xs text-romo-200 font-thin italic'>{mainUser.id}</h3>
                </article>
            </div>
        </nav>
    )
}