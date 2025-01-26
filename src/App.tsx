import {  useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import {  ICharacterData, IMainUser, IPartyData } from "./interfaces"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { tokenVerify } from "./scripts/token/tokenVerify";
import Loader, { TransparentLoader } from "./components/loaders/loader";
import { getCookie } from "./scripts/cookie/cookie";
import { Socket } from "socket.io-client";
import { setSocketUserData } from "./pages/connection/socket/socket";
import { AppContext } from "./AppContext";


function App() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [token, setToken] = useState<string>('')
  const [socket, setSocket] = useState<Socket>()
  const [partyData, setPartyData] = useState<IPartyData>()
  const [characters, setCharacters] = useState<ICharacterData[]>([])
  const [mainUser, setMainUser] = useState<IMainUser>({
    email: '',
    id: '',
    name: '',
    picture: ''
  })

  useEffect(() => {
    setIsLoading(true)
    tokenVerify({
      setMainUser: setMainUser,
      callBackSuccess: async () => {
        const route = window.location.pathname
        if (route == '/' || route == '/register' || route != '/forgotPassword') {
          navigate('/home')
        }
        setToken(getCookie('token'))
        setSocket(await setSocketUserData({
          token: getCookie('token'),
        }))
        setIsLoading(false)
      },
      callBackError: () => {
        setIsLoading(false)
      }
    })
  }, [])


  // redirect the user to login page if don't have a user loged
  useEffect(() => {
    const route = window.location.pathname
    if (route != '/' && route != '/register' && route != '/forgotPassword' && mainUser.id == '') {
      navigate('/')
    }
  }, [])


  return (
    <AppContext.Provider value={{
      mainUser: mainUser,
      token: token,
      socket: socket,
      partyData: partyData,
      characters: characters,
      setMainUser: setMainUser,
      setToken: setToken,
      setPartyData: setPartyData,
      setCharacters: setCharacters,
      setSocket: setSocket
    }}>
      <main className='h-screen w-screen overflow-hidden bg-lagun-950'>
        {isLoading ? <TransparentLoader /> : <Outlet />}
      </main>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        closeOnClick
        closeButton={false}
        pauseOnHover={true}
        pauseOnFocusLoss={false}
        autoClose={3000}
        stacked
      />

    </AppContext.Provider>
  )
}

export default App
