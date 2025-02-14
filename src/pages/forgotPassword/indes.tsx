import { FormEvent, useEffect, useRef, useState } from 'react'
import * as Form from '../../components/form'
import SquareButton from '../../components/buttons'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PostData } from '../../scripts/api/postData'
import Loader, { TransparentLoader } from '../../components/loaders/loader'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const [pageCount, setPageCount] = useState<number>(1)
    const [email, setEmail] = useState<string>('')
    const [code, setCode] = useState<string>('')

    useEffect(() => {
        if (pageCount != 3) {
            setCode('')
        }
    }, [pageCount])

    return (
        <main className='flex justify-center items-center h-screen w-screen'>
            {pageCount == 1 && <Page_1 setPageCount={setPageCount} setEmail={setEmail} email={email} />}
            {pageCount == 2 && <Page_2 setPageCount={setPageCount} email={email} setCode={setCode} />}
            {pageCount == 3 && <Page_3 setPageCount={setPageCount} email={email} code={code} />}
            {pageCount == 4 && <Page_4 />}
            <div className='absolute inset-0 -z-10 [mask-image:linear-gradient(270deg,#000_-70%,#00000002_90%)] grayscale-[70%] opacity-40'>
                <img src="assets/arts/bg_forest.webp" alt=""
                    className='object-cover w-full h-full'
                />
            </div>
        </main>
    )
}

function Page_1({ setPageCount, setEmail, email }: { setPageCount: React.Dispatch<React.SetStateAction<number>>, setEmail: React.Dispatch<React.SetStateAction<string>>, email: string }) {
    const [isFetching, setIsFetching] = useState<boolean>(false)


    const handleFormSubmite = async (e: FormEvent) => {
        e.preventDefault();
        setIsFetching(true)
        let postResult = await PostData({
            data: { email },
            route: '/GetResetPasswordCode'
        }).finally(() => setIsFetching(false))

        if (postResult.data.status == 'success') {
            setPageCount(2)
        }
    }

    return (
        <>
            {isFetching && <TransparentLoader />}
            <Form.Container onSubmit={(e) => handleFormSubmite(e)} className='w-96 flex-col bg-romo-950 z-10 p-4'>
                <Form.Title>Reset Password</Form.Title>
                <Form.InputText label='E-mail' type='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='flex flex-row w-full justify-end'>
                    <SquareButton size='sm' variant='ghost' type='submit'><p className='ml-2'>Next</p> <ChevronRight size={15} strokeWidth={2} className='mt-1' /></SquareButton>
                </div>
            </Form.Container>

        </>
    )
}

function Page_2({ setPageCount, email, setCode }: { setPageCount: React.Dispatch<React.SetStateAction<number>>, email: string, setCode: React.Dispatch<React.SetStateAction<string>> }) {
    const [selectedInputSpace, setSelectedInputSpace] = useState<number>(1)
    const [isFecthingData, setIsFecthingData] = useState<boolean>(false)
    const [showError, setShowError] = useState<boolean>(false)
    const input1Ref = useRef<HTMLInputElement | null>(null)
    const input2Ref = useRef<HTMLInputElement | null>(null)
    const input3Ref = useRef<HTMLInputElement | null>(null)
    const input4Ref = useRef<HTMLInputElement | null>(null)
    const input5Ref = useRef<HTMLInputElement | null>(null)
    const input6Ref = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        switch (selectedInputSpace) {
            case 1:
                input1Ref.current?.focus()
                break
            case 2:
                input2Ref.current?.focus()
                break
            case 3:
                input3Ref.current?.focus()
                break
            case 4:
                input4Ref.current?.focus()
                break
            case 5:
                input5Ref.current?.focus()
                break
            case 6:
                input6Ref.current?.focus()
                break
        }

    }, [selectedInputSpace])

    const handleCodeSubmite = async (e: FormEvent) => {
        e.preventDefault()
        let input1Value: string | undefined = input1Ref.current?.value
        let input2Value: string | undefined = input2Ref.current?.value
        let input3Value: string | undefined = input3Ref.current?.value
        let input4Value: string | undefined = input4Ref.current?.value
        let input5Value: string | undefined = input5Ref.current?.value
        let input6Value: string | undefined = input6Ref.current?.value

        let code = `${input1Value}${input2Value}${input3Value}${input4Value}${input5Value}${input6Value}`
        code = code.toUpperCase()

        if (code.length != 6) return

        setIsFecthingData(true)
        setShowError(false)

        let isCodeValid = await PostData({
            route: '/ConfirmPasswordCode',
            data: {
                email: email,
                code: code
            }
        })
            .then(result => result.data)
            .then(data => data.status == 'success' ? true : false)
            .finally(() => setIsFecthingData(false))
        if (isCodeValid) {
            setCode(code)
            setPageCount(3)
        } else {
            setShowError(true)
        }

    }



    return (
        <>
            {isFecthingData && <TransparentLoader />}
            <Form.Container onSubmit={(e) => handleCodeSubmite(e)} className='w-96 flex-col bg-romo-950 z-10 p-4'>
                <Form.Title>Reset Password</Form.Title>
                <article className='flex flex-col items-center'>
                    <p className='text-romo-100 font-semibold'>Check the access code in your Email</p>
                    <p className='italic text-xs text-cyan-500'>{email}</p>
                </article>
                <ul className='self-center flex flex-row gap-2 my-4'>
                    <li><input required ref={input1Ref} type="text" onFocus={() => setSelectedInputSpace(1)} onChange={(e) => e.target.value.trim() != "" && setSelectedInputSpace(2)} style={{ borderColor: `${selectedInputSpace == 1 ? "#bfbfbf" : ""}` }} className='outline-none h-16 w-12 text-center font-thin text-3xl capitalize text-romo-200 border border-transparent bg-romo-500' maxLength={1} /></li>
                    <li><input required ref={input2Ref} type="text" onFocus={() => setSelectedInputSpace(2)} onChange={(e) => e.target.value.trim() != "" ? setSelectedInputSpace(3) : setSelectedInputSpace(1)} style={{ borderColor: `${selectedInputSpace == 2 ? "#bfbfbf" : ""}` }} className='outline-none h-16 w-12 text-center font-thin text-3xl capitalize text-romo-200 border border-transparent bg-romo-500' maxLength={1} /></li>
                    <li><input required ref={input3Ref} type="text" onFocus={() => setSelectedInputSpace(3)} onChange={(e) => e.target.value.trim() != "" ? setSelectedInputSpace(4) : setSelectedInputSpace(2)} style={{ borderColor: `${selectedInputSpace == 3 ? "#bfbfbf" : ""}` }} className='outline-none h-16 w-12 text-center font-thin text-3xl capitalize text-romo-200 border border-transparent bg-romo-500' maxLength={1} /></li>
                    <li><input required ref={input4Ref} type="text" onFocus={() => setSelectedInputSpace(4)} onChange={(e) => e.target.value.trim() != "" ? setSelectedInputSpace(5) : setSelectedInputSpace(3)} style={{ borderColor: `${selectedInputSpace == 4 ? "#bfbfbf" : ""}` }} className='outline-none h-16 w-12 text-center font-thin text-3xl capitalize text-romo-200 border border-transparent bg-romo-500' maxLength={1} /></li>
                    <li><input required ref={input5Ref} type="text" onFocus={() => setSelectedInputSpace(5)} onChange={(e) => e.target.value.trim() != "" ? setSelectedInputSpace(6) : setSelectedInputSpace(4)} style={{ borderColor: `${selectedInputSpace == 5 ? "#bfbfbf" : ""}` }} className='outline-none h-16 w-12 text-center font-thin text-3xl capitalize text-romo-200 border border-transparent bg-romo-500' maxLength={1} /></li>
                    <li><input required ref={input6Ref} type="text" onFocus={() => setSelectedInputSpace(6)} onChange={(e) => e.target.value.trim() == "" && setSelectedInputSpace(5)} style={{ borderColor: `${selectedInputSpace == 6 ? "#bfbfbf" : ""}` }} className='outline-none h-16 w-12 text-center font-thin text-3xl capitalize text-romo-200 border border-transparent bg-romo-500' maxLength={1} /></li>

                </ul>
                {showError && <p className='self-center test-xs italic text-red-500 font-thin'>Invalid Code</p>}
                <div className='flex flex-row w-full justify-between'>
                    <SquareButton size='sm' variant='ghost' type='button' onClick={() => setPageCount(1)} ><ChevronLeft size={15} strokeWidth={2} className='mt-1' /> <p className='mr-2'>Back</p></SquareButton>
                    <SquareButton size='sm' variant='ghost' type='submit'><p className='ml-2'>Next</p> <ChevronRight size={15} strokeWidth={2} className='mt-1' /></SquareButton>
                </div>
            </Form.Container>
        </>
    )
}

function Page_3({ setPageCount, email, code }: { setPageCount: React.Dispatch<React.SetStateAction<number>>, email: string, code: string }) {
    const [showPasswordError, setShowPasswordError] = useState<boolean>(false)
    const [PasswordErrorText, setPasswordErrorText] = useState<String>('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let { newPassword, confirmNewPassword } = Form.getFormData(e)
        newPassword = newPassword.toString().trim()
        confirmNewPassword = confirmNewPassword.toString().trim()

        if (newPassword != confirmNewPassword) {
            setPasswordErrorText("Passwords must match")
            setShowPasswordError(true)
            return
        }
        if (newPassword.length < 6 || confirmNewPassword.length < 6) {
            setPasswordErrorText("The password must contain at least 6 characters")
            setShowPasswordError(true)
            return
        }

        const result = await PostData({
            route: '/ResetPassword',
            data: {
                email,
                code,
                newPassword
            }
        })
            .then(result => result.data)
            .then(data => data.status)
            .then(status => status == 'success' ? (setPageCount(4)) : (() => {
                setPasswordErrorText("Try Again")
                setShowPasswordError(true)
            })
            )
    }

    return (
        <Form.Container onSubmit={(e) => handleSubmit(e)} className='w-96 flex-col bg-romo-950 z-10 p-4'>
            <Form.Title>Reset Password</Form.Title>
            <Form.InputText required name='newPassword' label='New Password' type='text' onChange={() => setShowPasswordError(false)} />
            <Form.InputText required name='confirmNewPassword' label='Confirm New Password' type='text' onChange={() => setShowPasswordError(false)} />
            {showPasswordError && <p className='italic text-red-500 text-xs font-thin'>{PasswordErrorText}</p>}
            <div className='flex flex-row w-full justify-between'>
                <SquareButton size='sm' variant='ghost' type='button' onClick={() => setPageCount(2)}><ChevronLeft size={15} strokeWidth={2} className='mt-1' /> <p className='mr-2'>Back</p></SquareButton>
                <SquareButton size='sm' variant='ghost' type='submit'><p className='ml-2'>Finish</p> <ChevronRight size={15} strokeWidth={2} className='mt-1' /></SquareButton>
            </div>
        </Form.Container>
    )
}

function Page_4() {
    const navigate = useNavigate()

    return (
        <Form.Container onSubmit={(e) => { e.preventDefault(); navigate('/') }} className='w-96 flex-col bg-romo-950 z-10 p-4 items-center flex py-12 gap-6'>
            <Form.Title>Your password has been changed successfully</Form.Title>
            <SquareButton size='md' variant='secondary' type='submit'>Back to Login</SquareButton>
        </Form.Container>
    )
}