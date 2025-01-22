import { useContext, useEffect } from 'react'
import Menu from './menu'
import NavBar from '../../components/navbar/top'
import { AppContext } from '../../AppContext'

export default function Home() {
    const { socket, mainUser } = useContext(AppContext)

    useEffect(() => {
        if (!socket) return
        socket.emit('leaveParty', { userId: mainUser.id })
    })

    return (
        <section className='flex flex-col h-full'>
            <NavBar />
            <Menu />
        </section>
    )
}