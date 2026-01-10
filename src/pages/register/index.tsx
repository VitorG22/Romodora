import * as Input from '../../assets/inputs/inputs'
import * as Button from '../../assets/buttons/buttons'
import getFormValues from '../../assets/forms/getFormValues'
import { useNavigate } from 'react-router-dom'
import { PostData } from '../../scripts/axios'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { setCookie } from '../../scripts/cookies'
import { Loader, LoaderContainer } from '../../assets/loader/loader'

export function Register() {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [userEmail, setUserEmail] = useState<string>("")
    return (
        currentStep == 0 ? <SendRegisterData setUserEmail={setUserEmail} setCurrentStep={setCurrentStep} /> : <ConfirmRegisterCode setCurrentStep={setCurrentStep} userEmail={userEmail} />
    )
}

function SendRegisterData({ setCurrentStep, setUserEmail }: { setCurrentStep: React.Dispatch<React.SetStateAction<number>>, setUserEmail: React.Dispatch<React.SetStateAction<string>> }) {
    const [ErrorMessage, setErrorMessage] = useState<string | null>(null)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { name, email, password, confirmPassword } = getFormValues(e)

        setErrorMessage(null)
        if (password !== confirmPassword) {
            setErrorMessage('Passwords must match.')
            return
        }

        setIsLoading(true)
        PostData({
            endPoint: "register",
            data: { email, password, name },
            onSuccess: () => {
                setIsLoading(false)
                setUserEmail(email.toString())
                setCurrentStep(1)
            },
            onError: (res) => {
                setIsLoading(false)
                setErrorMessage(res.response.data)
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
            <h1 className='text-lg font-semibold'>Register</h1>
            <hr className="h-[1px] border-stone-300 w-full mb-2" />
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col items-center gap-2 w-full'>
                <Input.Container color='white'>
                    <Input.Label inputId='name'>User Name</Input.Label>
                    <Input.TextInput name='name' id='name' type={"text"} required />
                </Input.Container>
                <Input.Container color='white'>
                    <Input.Label inputId='email'>E-mail</Input.Label>
                    <Input.TextInput name='email' id='email' type={"email"} required />
                </Input.Container>
                <Input.Container color='white'>
                    <Input.Label inputId='password'>Password</Input.Label>
                    <Input.PasswordInput name='password' id='password' />
                </Input.Container>
                <Input.Container color='white'>
                    <Input.Label inputId='confirmPassword'>Confirm Password</Input.Label>
                    <Input.PasswordInput name='confirmPassword' id='confirmPassword' />
                </Input.Container>
                <hr className="h-[1px] border-stone-300 w-full my-2" />
                <div className='flex flex-col gap-2 w-full'>
                    <Button.Primary color='white' type="submit">
                        Confirm
                    </Button.Primary>
                    <p>Already have an account? <span onClick={() => navigate('/login')} className='text-purple-400 underline hover:cursor-pointer'>Log in</span></p>
                </div>
            </form>
            <p className='text-red-500'>{ErrorMessage}</p>
        </main>
    )
}

function ConfirmRegisterCode({ userEmail, setCurrentStep }: { userEmail: string, setCurrentStep: React.Dispatch<React.SetStateAction<number>> }) {
    const [ErrorMessage, setErrorMessage] = useState<string | null>(null)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { code } = getFormValues(e)

        setIsLoading(true)
        PostData({
            endPoint: "confirmRegisterCode",
            data: {
                email: userEmail,
                code: code
            },
            onSuccess:async (res) => {
                setIsLoading(false)
                setCookie({ name: 'accessToken', value: res.data })
                navigate('/home')
            },
            onError: (res) => {
                setIsLoading(false)
                setErrorMessage(res.response.data)
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
            <h1 className='text-lg font-semibold'>Confirm Code</h1>
            <hr className="h-[1px] border-stone-300 w-full mb-2" />
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col items-center gap-2 w-full'>

                <Input.Container color='white'>
                    <Input.Label inputId='code'>Access Code</Input.Label>
                    <Input.TextInput name='code' id='code' type={"text"} required className='text-uppercase' onChange={() => setErrorMessage('')} />
                </Input.Container>
                <hr className="h-[1px] border-stone-300 w-full my-2" />
                <div className='flex flex-row gap-2 w-full'>
                    <button type='button' onClick={() => setCurrentStep(0)} className='border border-stone-300 px-2 rounded-sm'>
                        <ArrowLeft />
                    </button>
                    <Button.Primary color='white' type="submit">
                        Confirm
                    </Button.Primary>
                </div>
                <p>Already have an account? <span onClick={() => navigate('/')} className='text-purple-400 underline hover:cursor-pointer'>Log in</span></p>
            </form>
            <p className='text-red-500'>{ErrorMessage}</p>
        </main>
    )
}