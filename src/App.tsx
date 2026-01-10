import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import type { AppDispatch, RootState } from "./redux/store"
import { getCookie } from "./scripts/cookies"
import { changeUser } from "./redux/userSlice"
import { getData } from "./scripts/axios"
import { Loader, LoaderContainer } from "./assets/loader/loader"
import { GameContextProvider } from "./scripts/socket"
import { setNavigator } from "./scripts/navigate"

function App() {
  const location = useLocation().pathname
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { isLogged } = useSelector((state: RootState) => state.user)
  const token = getCookie('accessToken')
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(()=>{
    setNavigator(navigate)
  },[])

  useEffect(() => {
    verifyIfIsValidToken()
  }, [location])

  const verifyIfIsValidToken = () => {
    if (location == '/'|| location == '/login' || location == '/register' && token && !isLogged) {
      setIsLoading(true)
      getData({
        endPoint: 'getUserDataByToken',
        onSuccess: async (res) => {
          dispatch(changeUser(res.data))
          navigate('/home')
          setIsLoading(false)
        },
        onError: () => {
          setIsLoading(false)
        }
      })
      return
    }

    if (location != '/' && location !='/login' && location != '/register' && token && !isLogged) {
      setIsLoading(true)
      getData({
        endPoint: 'getUserDataByToken',
        onSuccess: async (res) => {
          dispatch(changeUser(res.data))
          setIsLoading(false)
        },
        onError: () => {
          setIsLoading(false)
          navigate('/')
        }
      })
      return
    }

    if (location != '/' && location != '/login' && location != '/register' && !token) {
      navigate('/')
      return
    }

  }


  return (
    <main className="bg-stone-300 text-stone-900 h-screen w-screen flex flex-row justify-center items-center selection:bg-purple-500 selection:text-stone-200">
      {isLoading &&
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      }
      <GameContextProvider >
        <Outlet />
      </GameContextProvider>
    </main>
  )
}

export default App
