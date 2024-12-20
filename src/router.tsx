import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Party from "./pages/connection";
import Lobby from "./pages/connection/Lobby";
import Character from "./pages/character/index";
import MyCharacters from "./pages/character/myCharacters";
import CreateCharacter from "./pages/character/createCharacters";
import Board from "./pages/connection/board";
import Maps from "./pages/maps";
import MyMaps from "./pages/maps/myMaps";
import CreateMap from "./pages/maps/newMap/CreateMap";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/home',
                element:<Home/>,
            },
            {
                path:'/',
                element:<Login/>,
            },
            {
                path:'/register',
                element:<Register/>,
            },
            {
                path: '/party',
                element:<Party/>,
                children:[
                    {
                        path:'lobby/:partyCode',
                        element: <Lobby/>
                    },
                    {
                        path:'board',
                        element: <Board/>
                    },
                ]
            },
            {
                path: '/character',
                element: <Character/>,
                children:[
                    {
                        path:'',
                        element: <MyCharacters/>
                    },
                    {
                        path:'createCharacter',
                        element: <CreateCharacter/>
                    }
                ]
            },
            {
                path:'/map',
                element:<Maps/>,
                children:[
                    {
                        path:'',
                        element:<MyMaps/>
                    },
                    {
                        path:'create/:mapId',
                        element:<CreateMap/>
                    }
                ]
            }
        ]
    }
])