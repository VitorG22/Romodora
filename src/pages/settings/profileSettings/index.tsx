import { useContext, useState } from "react"
import { AppContext } from "../../../AppContext"
import * as Form from '../../../components/form'
import SquareButton from "../../../components/buttons"
import { PostData } from "../../../scripts/api/postData"
import { Alert } from "../../../components/toasters"

export default function ProfileSettings() {
    const { mainUser, setMainUser, token } = useContext(AppContext)
    const [newUserImage, setNewUserImage] = useState<string>(mainUser.picture)
    const [newUserName, setNewUserName] = useState<string>(mainUser.name)

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { name, imageUrl } = Form.getFormData(e)
        const PostResult = await PostData({
            data: {
                name: name,
                picture: imageUrl,
                token: token
            },
            route: '/changeUserData'
        })
        if(PostResult.data.status == 'success'){
            setMainUser?.({
                email: PostResult.data.result.email,
                id: PostResult.data.result.id,
                name: PostResult.data.result.name,
                picture: PostResult.data.result.picture,
                token: mainUser.token,
                token_expire: mainUser.token_expire,
            })
        }else{
            Alert({message:PostResult.data.message})
        }

    }


    return (
        <section className='w-full flex flex-col p-6 gap-2'>
            <div className="flex flex-row gap-2 w-64">
                <img src={newUserImage} onErrorCapture={(e) => e.currentTarget.classList.add("opacity-0")} onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                    className="w-64 aspect-square"
                />
                <article className='p-2'>
                    <h1 className='text-lagun-200 text-xl'>{newUserName}</h1>
                </article>
            </div>
            <Form.Container className="flex flex-col bg-transparent gap-2 w-full max-w-96 p-0" onSubmit={(e) => handleFormSubmit(e)}>
                <Form.InputText name="imageUrl" label="Image Url" type="text" defaultValue={mainUser.picture} onChange={(e) => setNewUserImage(e.target.value)} />
                <Form.InputText name="name" label="Name" type="text" defaultValue={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                <SquareButton type="submit" size="md" variant="ghost">
                    Save
                </SquareButton>
            </Form.Container>
        </section>
    )
}