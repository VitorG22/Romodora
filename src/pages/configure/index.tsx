import { useState } from 'react'
import * as Button from '../../assets/buttons/buttons'
import * as Input from '../../assets/inputs/inputs'
import NavBarTop from '../../assets/navBar/navBarTop'
import { LogOutIcon, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import { changeUser, logout } from '../../redux/userSlice'
import { deleteCookie } from '../../scripts/cookies'
import { useNavigate } from 'react-router-dom'
import getFormValues from '../../assets/forms/getFormValues'
import { getData, PostData } from '../../scripts/axios'
import { Loader, LoaderContainer } from '../../assets/loader/loader'

export default function Configure() {

    return (
        <main className='w-full h-full flex flex-col'>
            <NavBarTop />
            <section className="flex flex-col items-start p-12 gap-1 mx-2 mt-2 bg-linear-30 from-stone-950 via-stone-900 to-stone-950 rounded-sm ">
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

        if (confirmNewPassword !== newPassword) {
            setMessageError('the new passwords must match')
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
            onSuccess: (result) => {
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
        <section>
            {isLoading && <LoaderContainer><Loader/></LoaderContainer>}
            <h1 className='text-stone-300 w-full  text-xl font-semibold'>User</h1>
            <form onSubmit={(e) => handleSaveData(e)} className='flex flex-row gap-4 w-full min-h-full rounded-sm'>
                <div className='flex flex-col gap-2'>
                    {imageValue ? (
                        <img src={imageValue} className='aspect-square w-45 h-45 rounded-sm object-cover' />
                    ) : (
                        <div className='bg-stone-800 text-stone-300 text-[6rem] font-thin flex justify-center items-center aspect-square w-45 h-45 rounded-sm object-cover'>{userData.name[0]}</div>
                    )}
                    <Input.Image setImageFunction={setImageValue}>
                        <Button.Primary type='button' color='white'>Select Image</Button.Primary>
                    </Input.Image>
                    <button type='button' onClick={() => setImageValue('')}
                        className='flex flex-row gap-2 items-center justify-center w-full px-4 py-2 text-red-400 border border-red-400 rounded-sm hover:cursor-pointer'>Remove Image <Trash size={20} strokeWidth={1} /></button>

                </div>
                <div className='flex flex-col gap-2'>
                    <Input.Container color='white'>
                        <Input.Label inputId='userName' >Name</Input.Label>
                        <Input.TextInput id='userName' name='userName' type='text' defaultValue={userData.name} required></Input.TextInput>
                    </Input.Container>
                    <Input.Container color='white'>
                        <Input.Label inputId='newPassword' >New password</Input.Label>
                        <Input.PasswordInput required={false} id='newPassword' name='newPassword'></Input.PasswordInput>
                    </Input.Container>
                    <Input.Container color='white'>
                        <Input.Label inputId='confirmNewPassword' >Confirm New Password</Input.Label>
                        <Input.PasswordInput required={false} id='confirmNewPassword' name='confirmNewPassword'></Input.PasswordInput>
                    </Input.Container>
                    <Input.Container color='white'>
                        <Input.Label inputId='password' >Password</Input.Label>
                        <Input.PasswordInput id='password' name='password'></Input.PasswordInput>
                    </Input.Container>
                    <div className='flex flex-row gap-2'>
                        <button type='button' onClick={handleLogout} className='flex flex-row gap-2 items-center justify-center w-fit px-4 py-2 text-red-400 border border-red-400 rounded-sm hover:cursor-pointer'>Logout <LogOutIcon size={20} strokeWidth={1} /></button>
                        <Button.Primary type='submit' color='white'>Save</Button.Primary>
                    </div>
                    <p className='text-red-500'>{messageError}</p>
                </div>
            </form>
        </section>
    )
}