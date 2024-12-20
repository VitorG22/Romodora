import { useContext, useEffect } from "react"
import { PostData } from "../../scripts/api/postData"
import { AppContext } from "../../AppContext"
import { Outlet } from "react-router-dom"
import LateralNavBar from "../../components/navbar/lateral"

export default function Character() {
    const { setCharacters, token } = useContext(AppContext)

    useEffect(() => {
        (async () => {
            const charactersReturn = await PostData({
                route: '/character',
                data: { token: token }
            })
            if (charactersReturn.data.status == 'success' && setCharacters) {
                setCharacters(charactersReturn.data.result)
            }
        })()
    }, [])

    return (
        <main className='text-white w-full h-full flex flex-row'>
            <LateralNavBar />
            <Outlet/>
        </main>
    )
}