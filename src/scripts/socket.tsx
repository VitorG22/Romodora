import { io } from "socket.io-client"
import { createContext, useEffect, useState, type ReactNode } from 'react'
import { Game, type IGame } from "../pages/game/gameObject"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { getCookie } from "./cookies"

const API_URL = import.meta.env.VITE_API_URL


export const GameContext = createContext<IGame | null>(null)

export function GameContextProvider({ children }: { children: ReactNode }) {
    const accessToken = getCookie('accessToken')
    const { isLogged } = useSelector((state: RootState) => state.user)
    const [game, setGame] = useState(new Game({
        socket: null,
        isHost: false,
        lobbyId: '',
        users: [],
        setGameFunction: () => { },
        activeSocketListeners: () => { },
        quitGame: () => { }
    }))

    useEffect(() => {
        connectSocket()
        game.setGameFunction = setGame
        setGame(game)
    }, [])

    useEffect(() => {
        if (isLogged) { setUserDataInSocket() }
    }, [isLogged])

    const setUserDataInSocket = () => {
        game?.socket?.emit('setUserData', { accessToken: accessToken })
    }

    const connectSocket = async () => {

        try {
            const socket = await io(API_URL)
            console.log(socket)
            game.socket = await socket
            setUserDataInSocket()
        } catch (error) {
            console.log(error)
            return
        }

    }

    return (
        <GameContext.Provider value={game}>
            {children}
        </GameContext.Provider>
    )
}






