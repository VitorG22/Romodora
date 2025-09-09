import type { Socket } from "socket.io-client"
import type { ICharacter } from "../character/charactersClass"
import { navigate } from "../../scripts/navigate"

export interface IGame {
    socket: Socket | null
    lobbyId: string
    users: IPerson[]
    isHost: boolean
    tableData: ITable
    chat: IMessage[]
    setGameFunction: React.Dispatch<React.SetStateAction<Game>> | null

    startGame: () => void
    quitGame: () => void
    activeSocketListeners: () => void
    changeCharacterData: ({ userId, CharacterData }: { userId: string, CharacterData: ICharacter }) => void | (() => void)
}

export interface IMessage {
    ownerData: {
        id: string,
        name: string
    },
    type: "message" | "system",
    message: string
}

export interface IPerson {
    email: string,
    name: string,
    id: string,
    picture: string,
    color: string
}

export interface IPlayer extends IPerson {
    character: ICharacter | null
}

interface ITable {
    players: IPlayer[]
}

export class Game {

    socket; users; lobbyId; isHost; tableData; chat; setGameFunction;

    constructor({ socket, users, lobbyId, chat, isHost, tableData, setGameFunction }: IGame) {
        this.socket = socket
        this.tableData = tableData
        this.isHost = isHost
        this.users = users
        this.lobbyId = lobbyId
        this.chat = chat
        this.setGameFunction = setGameFunction
    }

    private setGame(newGameData: IGame) {

        this.setGameFunction?.(new Game(newGameData))

    }

    private updateGameData(payload: IGame) {
        this.setGame({ ...this, ...payload })
    }

    private updateTableData(payload: ITable) {
        this.setGame({ ...this, tableData: { ...this.tableData, ...payload } })
    }

    activeSocketListeners() {
        this.socket?.removeAllListeners()

        this.socket?.on('updateGameData', (payload) => {
            this.updateGameData(payload)
        })

        this.socket?.on('updateTableData', (payload) => {
            this.updateTableData(payload)
        })

        this.socket?.on('startGame', () => {
            console.log("startGame")
            navigate('game/table')
        })

    }

    startGame() {
        if (!this.isHost) return

        this.socket?.emit('startGame', { gameId: this.lobbyId })
    }

    quitGame() {
        this.socket?.emit("quitGame", { gameId: this.lobbyId })
        let newGameData = { ...this }

        newGameData.users = []
        newGameData.isHost = false,
            newGameData.lobbyId = ""
        newGameData.chat = []
        newGameData.tableData = {
            players: []
        }
        this.setGameFunction?.(new Game(newGameData))
    }

    changeCharacterData({ userId, CharacterData }: { userId: string, CharacterData: ICharacter }) {
        let newGameData = { ...this }
        let playerIndex = this.tableData.players.findIndex(playerData => playerData.id == userId)

        if (playerIndex != -1) {
            newGameData.tableData.players[playerIndex].character = CharacterData
        }

        this.socket?.emit('changePlayerData', { gameId: this.lobbyId, newPlayerData: newGameData.tableData.players[playerIndex] })
    }
}
