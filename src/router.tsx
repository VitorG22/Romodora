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
import SettingsPage from "./pages/settings";
import ProfileSettings from "./pages/settings/profileSettings";
import ErrorPage from "./pages/error/errorPage";
import ForgotPassword from "./pages/forgotPassword/indes";
import ItemsPage from "./pages/items";
import ItemsGallery from "./pages/items/itemsGallery";
import NewItem from "./pages/items/newItem";
import ShowItem from "./pages/items/itemsGallery/showItem";


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
                path:'/password',
                element:<ForgotPassword/>,
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
                        path:'editCharacter/:CharacterId',
                        element: <CreateCharacter/>
                    },
                    {
                        path:'createCharacter',
                        element: <CreateCharacter/>
                    }
                ]
            },
            {
                path: '/settings',
                element: <SettingsPage/>,
                children:[
                    {
                        path:'',
                        element: <ProfileSettings/>
                    },
                    
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
            },
            {
                path: '/item',
                element: <ItemsPage/>,
                children:[
                    {
                        path:'gallery',
                        element: <ItemsGallery/>
                    },
                    {
                        path:'newItem',
                        element: <NewItem/>
                    }
                ]
            }
        ],
        errorElement:<ErrorPage/>
    }
])