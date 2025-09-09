import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import Home from "./pages/home";
import Configure from "./pages/configure";
import GameLobby from "./pages/game/lobby";
import Characters from "./pages/character/index";
import CreateCharacter from "./pages/character/createCharacter";
import CharactersList from "./pages/character/charactersListPage";
import Table from "./pages/game/table";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/configure',
                element: <Configure />
            },
            {
                path: '/characters',
                element: <Characters />,
                children: [
                    {
                        path: 'edit',
                        element: <CreateCharacter />
                    },
                    {
                        path: 'edit/:characterId',
                        element: <CreateCharacter />
                    },
                    {
                        path: 'list',
                        element: <CharactersList />
                    }
                ]    
            },
            {
                path: '/game',
                children: [
                    {
                        path:'lobby',
                        element: <GameLobby/>
                    },
                    {
                        path: 'table',
                        element: <Table/>
                    }
                ]
            }
        ]
    }
])