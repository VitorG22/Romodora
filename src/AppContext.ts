import { createContext } from "react";
import { IAppProvider } from "./interfaces";

export const AppContext = createContext<IAppProvider>({
    mainUser: {
        email: '',
        id: '',
        name: '',
        picture: ''
    },
    token: '',
    partyData: {
        mapMatrix: [],
        partyCode: '',
        hostId: '',
        players: [
            {
                name: '',
                id: '',
                picture: '',
                email: '',
                permissionType: 'player',
                characterData: undefined
            }
        ],
        journeyData: {
            id: '',
            name: '',
            owner: '',
            banner: ''
        }
    },
    characters: [],
})

