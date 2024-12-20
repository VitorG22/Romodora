import { IMainUser } from "../../interfaces";
import { PostData } from "../api/postData";
import { getCookie } from "../cookie/cookie";

interface ItokenVerify{
    token?:string
    setMainUser?:React.Dispatch<React.SetStateAction<IMainUser>>
    callBackSuccess?: (res?:any)=>void,
    callBackError?: (res?:any)=>void

}

export async function tokenVerify({token, setMainUser, callBackSuccess, callBackError}:ItokenVerify){

    if(!token){
        token = getCookie('token')
    }

    console.log(token)
    
    const res = await PostData({
        route: '/getUserByToken',
        data:{
            token: token
        }
    })

    if(res.data.status != 'success') {
        if(callBackError) callBackError()
            
        return
    }
    
    if(setMainUser) setMainUser(res.data.result)
    
    if(callBackSuccess) callBackSuccess(res)
    
    console.log(res)
}