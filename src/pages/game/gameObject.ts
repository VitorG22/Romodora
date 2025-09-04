import type { Socket } from "socket.io-client"
import type { ICharacter } from "../character/charactersClass"

export interface IGame {
    socket: Socket|null
    lobbyId: string
    users: IPerson[]
    isHost: boolean
    setGameFunction: React.Dispatch<React.SetStateAction<Game>> | null
    // lobbyOwner: IPerson
    tableData: ITable

    quitGame: ()=>void
    activeSocketListeners: ()=>void
    changeCharacterData: ({userId, CharacterData}:{userId:string, CharacterData: ICharacter})=>void | (()=>void)
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

    socket;users; lobbyId; isHost;tableData;setGameFunction;

    constructor({ socket,users, lobbyId, isHost,tableData,setGameFunction }: IGame) {
        this.socket = socket
        this.tableData = tableData
        this.isHost = isHost
        this.users = users
        this.lobbyId = lobbyId
        this.setGameFunction = setGameFunction
    }

    private setGame(newGameData:IGame){
        this.setGameFunction?.(new Game(newGameData))
    }
    
    activeSocketListeners(){
        this.socket?.on('updateGameData', (payload)=>{
            let newGameData = {...this}
            console.log(payload)
            newGameData = {...newGameData, ...payload}
            // this.setGameFunction?.(new Game(newGameData))
            this.setGame(newGameData)
        })
    }
    
    quitGame(){
        this.socket?.emit("quitGame", {gameId: this.lobbyId})
        let newGameData = {...this}
        
        newGameData.users = []
        newGameData.isHost = false,
        newGameData.lobbyId = ""
        newGameData.tableData = {
            players:[]
        }
        this.setGameFunction?.(new Game(newGameData))
    }

    changeCharacterData({userId, CharacterData}:{userId:string, CharacterData: ICharacter}){
        let newGameData ={...this}
        let playerIndex = this.tableData.players.findIndex(playerData => playerData.id == userId)
        
        if(playerIndex != -1){
            newGameData.tableData.players[playerIndex].character = CharacterData
        }

        this.socket?.emit('changePlayerData', {gameId: this.lobbyId ,newPlayerData: newGameData.tableData.players[playerIndex]})
    }
}
