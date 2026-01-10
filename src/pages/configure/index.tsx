import { useState } from 'react'
import * as Button from '../../assets/buttons/buttons'
import * as Input from '../../assets/inputs/inputs'
import { LogOutIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import { changeUser, logout } from '../../redux/userSlice'
import { deleteCookie } from '../../scripts/cookies'
import { useNavigate } from 'react-router-dom'
import getFormValues from '../../assets/forms/getFormValues'
import { getData, PostData } from '../../scripts/axios'
import { Loader, LoaderContainer } from '../../assets/loader/loader'
import NavBarTop from '../../assets/navBar/navBarTop'

export default function Configure() {

    return (
        <main className='w-full h-full flex flex-col'>
            <NavBarTop />
            <section className="h-full flex flex-col items-start p-12 gap-1 bg-linear-30 from-stone-950 via-stone-900 to-stone-950 ">
                <TabUserConfig />
            </section>
        </main>
    )
}

function TabUserConfig() {
    const { userData } = useSelector((state: RootState) => state.user)
    const [messageError, setMessageError] = useState<string>('')
    const [imageValue, setImageValue] = useState<string>(userData.picture || '')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()


    const handleLogout = () => {
        dispatch(logout())
        deleteCookie('accessToken')
        navigate('/')
    }

    const handleSaveData = (e: React.FormEvent<HTMLFormElement>) => {
        setMessageError('')
        setIsLoading(true)
        e.preventDefault()
        const { password, confirmNewPassword, newPassword, userName } = getFormValues(e)
        console.log({ password, confirmNewPassword, newPassword, userName })

        if((newPassword || confirmNewPassword) && !password){
            setMessageError('Current Password is Required')
            setIsLoading(false)
            return
        }

        if (confirmNewPassword !== newPassword) {
            setMessageError('the new passwords must match')
            setIsLoading(false)
            return
        }

        let newDataObject = {
            newUserName: userName,
            newPassword: newPassword || undefined,
            newPicture: imageValue || undefined,
            password: password
        }

        PostData({
            endPoint: 'changeUserData',
            data: newDataObject,
            onSuccess: () => {
                getData({
                    endPoint: 'getUserDataByToken',
                    onSuccess: (res) => {
                        setIsLoading(false)
                        dispatch(changeUser(res.data))
                        navigate('/home')

                    }
                })
            },
            onError: (res) => {
                setIsLoading(false)
                setMessageError(res.response.data)
            }
        })
    }


    return (
        <>
            {isLoading && <LoaderContainer><Loader /></LoaderContainer>}
            <h1 className=' league-spartan text-2xl text-stone-300 w-full font-semibold'>Profile settings</h1>
            <form onSubmit={(e) => handleSaveData(e)} className="flex flex-col w-full border border-stone-400/40 p-4 gap-2">
                <div className="flex flex-row divide-x divide-stone-400/40 justify-between rounded-sm w-full h-full  *:px-8">
                    <section className='flex flex-col gap-2 items-center w-full'>
                        <h1 className=' league-spartan text-2xl text-stone-300 w-full font-semibold'>Avatar</h1>
                        <div className='flex flex-col gap-2 w-fit'>
                            {imageValue ? (
                                <div className='flex justify-center items-center aspect-square w-60 h-60 rounded-sm object-cover overflow-hidden'>
                                    <img src={imageValue} className=' object-cover' />
                                </div>
                            ) : (
                                <div className='bg-stone-800 text-stone-300 text-[6rem] font-thin flex justify-center items-center aspect-square w-60 h-60 rounded-sm object-cover'>{userData.name[0]}</div>
                            )}

                            <Input.Image setImageFunction={setImageValue}>
                                <Button.Primary className='text-nowrap' type='button' color='white'>Select Image</Button.Primary>
                            </Input.Image>
                            <button type='button' onClick={() => setImageValue('')}
                                className='flex flex-row gap-2 items-center justify-center w-full px-12 py-2 text-stone-300 text-nowrap border border-stone-300 rounded-sm hover:cursor-pointer'>
                                Use Monogram
                            </button>
                        </div>
                    </section>
                    <section className='flex flex-col gap-2 w-full'>
                        <h1 className=' league-spartan text-2xl text-stone-300 w-full font-semibold'>Info</h1>
                        <Input.Container color='white' className='flex flex-row gap-8 items-center text-nowrap'>
                            <Input.Label inputId='userName' >Name</Input.Label>
                            <Input.TextInput id='userName' name='userName' type='text' defaultValue={userData.name} required></Input.TextInput>
                        </Input.Container>
                        <Input.Container color='white' className='flex flex-row gap-8 items-center text-nowrap'>
                            <Input.Label inputId='' >Email</Input.Label>
                            <p>{userData.email}</p>
                        </Input.Container>
                    </section>
                    <section className='flex flex-col gap-2 w-full'>
                        <h1 className=' league-spartan text-2xl text-stone-300 w-full font-semibold'>Change Password</h1>
                        <Input.Container color='white' className='flex flex-row gap-8 items-center text-nowrap'>
                            <Input.Label inputId='newPassword' >New password</Input.Label>
                            <Input.PasswordInput required={false} id='newPassword' name='newPassword'></Input.PasswordInput>
                        </Input.Container>
                        <Input.Container color='white' className='flex flex-row gap-8 items-center text-nowrap'>
                            <Input.Label inputId='confirmNewPassword' >Confirm New Password</Input.Label>
                            <Input.PasswordInput required={false} id='confirmNewPassword' name='confirmNewPassword'></Input.PasswordInput>
                        </Input.Container>
                        <Input.Container color='white' className='flex flex-row gap-8 items-center text-nowrap'>
                            <Input.Label inputId='password' >Current Password</Input.Label>
                            <Input.PasswordInput id='password' name='password' required={false}></Input.PasswordInput>
                        </Input.Container>
                    </section>

                </div>
                <div className='flex flex-row gap-2 h-fit w-fit self-end items-center'>
                    <p className='text-nowrap text-red-500'>{messageError}</p>
                    <button type='button' onClick={handleLogout} className='flex flex-row gap-2 items-center justify-center w-fit px-4 py-2 text-red-400 border border-red-400 rounded-sm hover:cursor-pointer'>Logout <LogOutIcon size={20} strokeWidth={1} /></button>
                    <Button.Primary type='submit' color='white' className='px-10 '>Save</Button.Primary>
                </div>
            </form>
            {/* </div> */}
        </>
    )
}
