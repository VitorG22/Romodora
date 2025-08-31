import * as Input from '../../assets/inputs/inputs'
import * as Button from '../../assets/buttons/buttons'
import getFormValues from '../../assets/forms/getFormValues'
import { useNavigate } from 'react-router-dom'
import { getData, PostData } from '../../scripts/axios'
import { setCookie } from '../../scripts/cookies'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { changeUser } from '../../redux/userSlice'
import type { AppDispatch } from '../../redux/store'
import { Loader, LoaderContainer } from '../../assets/loader/loader'

export function Login() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [ErrorMessage, setErrorMessage] = useState<string>('')
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { email, password } = getFormValues(e)

        setErrorMessage('')
        setIsLoading(true)
        PostData({
            data: { email: email, password: password },
            endPoint: 'login',
            onSuccess: (res: any) => {
                setCookie({ name: 'accessToken', value: res.data })
                getUserData()
            },
            onError: (res: any) => {
                setIsLoading(false)
                setErrorMessage(res.response.data)
            }
        })
    }

    const getUserData = async () => {
        getData({
            endPoint: 'getUserDataByToken',
            onSuccess:async (res) => {
                setIsLoading(false)
                dispatch(changeUser(res.data))
                navigate('/home')
            }
        })
    }

    return (
        <main className='flex flex-col items-center bg-stone-900 text-stone-300 h-fit w-1/3 rounded-lg px-4 py-8 gap-2 shadow-lg shadow-stone-950/90'>
            {isLoading &&
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            }
            <h1 className='text-lg font-semibold'>Login</h1>
            <hr className="h-[1px] border-stone-300 w-full mb-2" />
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col items-center gap-2 w-full'>
                <Input.Container color='white'>
                    <Input.Label inputId='email'>E-mail</Input.Label>
                    <Input.TextInput name='email' id='email' type={"email"} required />
                </Input.Container>
                <Input.Container color='white'>
                    <Input.Label inputId='password'>Password</Input.Label>
                    <Input.PasswordInput name='password' id='password' />
                </Input.Container>
                <hr className="h-[1px] border-stone-300 w-full my-2" />
                <div className='flex flex-col gap-2 w-full'>
                    <Button.Primary color='white' type="submit">
                        Login
                    </Button.Primary>
                    <p>Don't have an account? <span onClick={() => navigate('/register')} className='text-purple-400 underline hover:cursor-pointer'>Register</span></p>
                </div>
            </form>
            <p className='text-red-500'>{ErrorMessage}</p>
        </main>
    )
}