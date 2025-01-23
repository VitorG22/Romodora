import { useNavigate } from 'react-router-dom'
import SquareButton from '../../components/buttons'
import * as Form from '../../components/form'
import { PostData } from '../../scripts/api/postData'
import * as Toast from '../../components/toasters'
import { useContext, useState } from 'react'
import { AppContext } from '../../AppContext'
import { getCookie, setCookie } from '../../scripts/cookie/cookie'
import { tokenVerify } from '../../scripts/token/tokenVerify'
import Loader from '../../components/loader'
import { setSocketUserData } from '../connection/socket/socket'

export default function Login() {
    const navigate = useNavigate()
    const { setToken, setMainUser,setSocket } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function LoginSubmite({ event }: { event: React.FormEvent<HTMLFormElement> }) {
        event.preventDefault()
        let { email, password } = Form.getFormData(event)
        email = email.toString().trim()
        password = password.toString().trim()

        const result = await PostData({
            route: '/login',
            data: {
                email: email,
                password: password
            }
        })
        if (result.data.status == 'fail') {
            Toast.Default({ message: result.data.result.message })
            return
        }
        if (result.data.status == 'success' && setToken) {
            setCookie({
                name: 'token',
                value: result.data.result.token,
                expire: result.data.result.token_expire
            })
            setToken(result.data.result.token)
            setIsLoading(true)
            tokenVerify({
                token: result.data.result.token,
                setMainUser: setMainUser,
                callBackSuccess: async () => {
                    const route = window.location.pathname
                    if (route == '/' || route == '/register' || route != '/forgotPassword') {
                        navigate('/home')
                    }
                    setToken(getCookie('token'))
                    
                    setSocket?.(await setSocketUserData({
                        token: getCookie('token'),
                    }))
                    setIsLoading(false)
                },
                callBackError: () => {
                    setIsLoading(false)
                }
            })
        }
    }


    return (
        <section className="flex h-screen w-screen  justify-center items-center">
            {isLoading ? <Loader /> :
                <Form.Container onSubmitCapture={(e) => LoginSubmite({ 'event': e })} className='w-96 flex-col'>
                    <Form.Title>Login</Form.Title>
                    <Form.InputText required name='email' label='Email' type='email' placeholder='YourEmail@gmail.com' />
                    <Form.InputText required name='password' label='Password' type='password' />
                    <p
                        onClick={() => navigate('forgotPassword')}
                        className='text-lagun-600 font-thin text-xs italic hover:text-lagun-500 hover:cursor-pointer'
                    >Forget password</p>
                    <div className='flex flex-row gap-2 justify-end'>
                        <SquareButton size='md' variant='ghost' onClick={() => navigate('/register')}>
                            Register
                        </SquareButton>
                        <SquareButton size='md' variant='secondary' type='submit'>
                            Login
                        </SquareButton>
                    </div>
                </Form.Container>
            }
        </section>
    )
}