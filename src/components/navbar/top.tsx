import { useContext } from "react"
import { AppContext } from "../../AppContext"
import { IAppProvider } from "../../interfaces"

export default function TopNavBar() {
    const { mainUser } = useContext<IAppProvider>(AppContext)

    return (
        <nav className='bg-lagun-900 px-6 py-2'>
            <div className="flex flex-row items-center w-fit gap-2">
                <div className="flex justify-center items-center rounded-md overflow-hidden h-12 aspect-square">
                    <img src={mainUser.picture}
                    className='w-full flex'
                    />
                </div>
                <article className=''>
                    <h1 className='text-sm text-lagun-200'>{mainUser.name}</h1>
                    <h3 className='text-xs text-lagun-200/40 font-thin italic'>{mainUser.id}</h3>
                </article>
            </div>
        </nav>
    )
}