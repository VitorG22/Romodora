import type { Socket } from "socket.io-client"
import type { ICharacter } from "../character/charactersClass"

export interface IGame {
    socket: Socket|null
    lobbyId: string
    users: IPerson[]
    isHost: boolean
    setGameFunction: React.Dispatch<React.SetStateAction<Game>> | null
    // lobbyOwner: IPerson
    // tableData: ITable

    quitGame: ()=>void
    activeSocketListeners: ()=>void
}

export interface IPerson {
    email: string,
    name: string,
    id: string,
    picture: string,
    color: string
}

export interface IPlayer extends IPerson {
    character: ICharacter
}

// interface ITable {
//     players: IPlayer[]
// }

export class Game {
    // users;lobbyID;lobbyOwner;socket;tableData;

    // constructor({users,lobbyID,lobbyOwner,socket,tableData}:IGame) {
    //     this.users = users
    //     this.lobbyID = lobbyID 
    //     this.lobbyOwner = lobbyOwner 
    //     this.tableData = tableData 
    //     this.socket = socket 
    // }

    socket;users; lobbyId; isHost;setGameFunction;

    constructor({ socket,users, lobbyId, isHost,setGameFunction }: IGame) {
        this.socket = socket
        this.isHost = isHost
        this.users = users
        this.lobbyId = lobbyId
        this.setGameFunction = setGameFunction
    }

    activeSocketListeners(){
        this.socket?.on('updateGameData', (payload)=>{
            let newGameData = {...this}
            console.log(payload)
            newGameData.users = payload.users
            this.setGameFunction?.(new Game(newGameData))
        })
    }

    
    quitGame(){
        this.socket?.emit("quitGame", {gameId: this.lobbyId})
        let newGameData = {...this}
        
        newGameData.users = []
        newGameData.isHost = false,
        newGameData.lobbyId = ""
        this.setGameFunction?.(new Game(newGameData))
    }
}
