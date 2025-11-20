import type { Socket } from "socket.io-client"
import { navigate } from "../../scripts/navigate"
import { TableControl } from "./table/TableControlerClass"

export interface IGame {
    socket: Socket | null
    lobbyId: string
    users: IPerson[]
    isHost: boolean
    tableControl: TableControl
    chat: IMessage[]
    setGameFunction?: ({trigger,newGameData, newTableControlData}:{trigger:'tableControl'|'game' ,newGameData?:Game, newTableControlData?:TableControl }) =>void

    startGame: () => void
    quitGame: () => void
    activeSocketListeners: () => void
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




export class Game {

    socket; users; lobbyId; isHost; tableControl; chat; setGameFunction;

    constructor({ socket, users, lobbyId, chat, isHost, tableControl, setGameFunction }: IGame) {
        this.socket = socket
        this.tableControl = new TableControl({ ...tableControl, socket: socket, lobbyId: lobbyId })

        this.isHost = isHost
        this.users = users
        this.lobbyId = lobbyId
        this.chat = chat
        this.setGameFunction = setGameFunction

        this.setTableControlSetGameFunction()    
    }

    setTableControlSetGameFunction(){
        this.tableControl.setGameFunction = this.setGameFunction
    }

    changeSocket(socket: Socket) {
        this.socket = socket
        this.tableControl.socket = socket
    }

    
    setGame(newGameData?: IGame) {
        if(newGameData){   
            this.setGameFunction?.({trigger: 'game', newGameData:new Game({...this,...newGameData})})
            console.log(newGameData)
        }else{
            this.setGameFunction?.({trigger:'game', newGameData: this})
            console.log(this)
        }
    }

    private updateGameData(payload: IGame) {
        if(payload.tableControl){
            this.setGame({...this,...payload, tableControl:new TableControl({...payload.tableControl, lobbyId:this.lobbyId, socket: this.socket})})
        }else{
            this.setGame({ ...this, ...payload })
        }
    }

    activeSocketListeners() {
        this.socket?.removeAllListeners()
        this.tableControl.activeListeners()

        this.socket?.on('updateGameData', (payload) => {
            this.updateGameData(payload)
        })

        this.socket?.on('startGame', () => {
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
        this.tableControl.reset()
        this.setGameFunction?.({trigger:'game', newGameData: new Game(newGameData)})
    }

}