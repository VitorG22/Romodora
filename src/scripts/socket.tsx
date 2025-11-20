import { io } from "socket.io-client"
import { createContext, useEffect, useState, type ReactNode } from 'react'
import { Game, type IGame } from "../pages/game/gameObject"
import { TableControl } from "../pages/game/table/TableControlerClass"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { getCookie } from "./cookies"

const API_URL = import.meta.env.VITE_API_URL


export const GameContext = createContext<IGame | null>(null)

export function GameContextProvider({ children }: { children: ReactNode }) {
    const accessToken = getCookie('accessToken')
    const { isLogged } = useSelector((state: RootState) => state.user)
    const [game, setGame] = useState<Game>(new Game({
        socket: null,
        isHost: false,
        lobbyId: '',
        users: [],
        chat: [],
        tableControl: new TableControl({
            lobbyId: "",
            players: [],
            tableMap: undefined,
            socket: null
        }),
        setGameFunction: () => { },
        activeSocketListeners: () => { },
        quitGame: () => { },
        startGame: () => { },
    }))

    useEffect(() => {
        connectSocket()
        // game.setGameFunction = setGame
        game.setGameFunction = ({ trigger, newGameData, newTableControlData }: { trigger: "tableControl" | "game", newGameData?: Game, newTableControlData?: TableControl }) => {


            switch (trigger) {
                case "game":
                    if (!newGameData) return
                    console.log("trigger Game")
                    console.log(newGameData)

                    setGame(new Game(newGameData))
                    break

                case "tableControl":
                    if (!newTableControlData) return
                    console.log("trigger tableControl")
                    console.log(newTableControlData)

                    setGame((currentState) => {
                        let tempGameCopy = currentState
                        tempGameCopy.tableControl = new TableControl({ ...game.tableControl, ...newTableControlData })
                        return new Game(tempGameCopy)
                    })
                    break
            }
        }
    }, [])

    useEffect(() => {
        game.activeSocketListeners()
    }, [game])

    useEffect(() => {
        if (isLogged) { setUserDataInSocket() }
    }, [isLogged])

    const setUserDataInSocket = () => {
        game?.socket?.emit('setUserData', { accessToken: accessToken })
    }

    const connectSocket = async () => {

        try {
            const socket = await io(API_URL)
            game.changeSocket(socket)
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






