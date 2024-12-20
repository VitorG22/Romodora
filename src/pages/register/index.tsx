import { NavigateFunction, useNavigate } from 'react-router-dom'
import SquareButton from '../../components/buttons'
import * as Form from '../../components/form'
import { useContext, useState } from 'react'
import { PostData } from '../../scripts/api/postData'
import { tokenVerify } from '../../scripts/token/tokenVerify'
import { setCookie } from '../../scripts/cookie/cookie'
import { AppContext } from '../../AppContext'
import { IMainUser } from '../../interfaces'
import Loader from '../../components/loader'

export default function Register() {
    const [showPasswordError, setShowPasswordError] = useState<boolean>(false)
    const [showEmailError, setShowEmailError] = useState<boolean>(false)
    const { setToken, setMainUser } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()


    async function RegisterSubmite({ event }: { event: React.FormEvent<HTMLFormElement> }) {
        event.preventDefault()
        let { name, email, password, confirmPassword } = Form.getFormData(event)
        name = name.toString().trim()
        email = email.toString().trim()
        password = password.toString().trim()
        confirmPassword = confirmPassword.toString().trim()

        if (password != confirmPassword) {
            setShowPasswordError(true)
            return
        }

        const result = await PostData({
            route: '/register',
            data: {
                name: name,
                email: email,
                password: password,
            }
        })


        if (result.data.status == 'fail') {
            if (result.data.result.message == 'Email already registered') {
                setShowEmailError(true)
            }
            return
        }
        setIsLoading(true)
        LoginAfterRegister({
            navigate: navigate,
            setMainUser: setMainUser,
            setToken: setToken,
            setIsLoading: setIsLoading,
            token: result.data.result.token,
            token_expire: result.data.result.token_expire
        })
    }



    return (
        <section className="flex h-screen w-screen  justify-center items-center">
            {isLoading ? <Loader /> :
                <Form.Container onSubmit={(e) => RegisterSubmite({ 'event': e })} className='w-96'>
                    <Form.Title>Register</Form.Title>
                    <Form.InputText required name='name' label='Name' type='text' placeholder='User Name' />
                    <Form.InputText required name='email' label='Email' type='email' placeholder='YourEmail@gmail.com' onChange={() => setShowEmailError(false)} />
                    {showEmailError && <p className='text-xs font-thin text-red-500/70 '>Email already registered</p>}
                    <Form.InputText required name='password' label='Password' type='password' />
                    <Form.InputText required name='confirmPassword' label='Confirm Password' type='password' onChange={() => setShowPasswordError(false)} />
                    {showPasswordError && <p className='text-xs font-thin text-red-500/70 '>Passwords must match</p>}
                    <div className='flex flex-row gap-2 justify-end'>
                        <SquareButton size='md' variant='ghost' onClick={() => navigate('/')}>
                            Login
                        </SquareButton>
                        <SquareButton size='md' variant='secondary' type='submit'>
                            Register
                        </SquareButton>
                    </div>
                </Form.Container>}
        </section>
    )
}

function LoginAfterRegister({ token, token_expire, setMainUser, navigate, setToken, setIsLoading }: {
    token: string,
    token_expire: Date,
    navigate: NavigateFunction,
    setToken: React.Dispatch<React.SetStateAction<string>> | undefined,
    setMainUser: React.Dispatch<React.SetStateAction<IMainUser>> | undefined,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
    setCookie({
        name: 'token',
        value: token,
        expire: token_expire.toString()
    })
    if (setToken) setToken(token)
    tokenVerify({
        token: token,
        setMainUser: setMainUser,
        callBackSuccess: () => {
            navigate('/home')
            setIsLoading(false)
        },
        callBackError: () => {
            setIsLoading(false)
        }
    })
}