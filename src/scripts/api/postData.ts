import axios from "axios"

export async function PostData({route,data}:{route:string,data:any}){
    const API_URL =  import.meta.env.VITE_API_URL + route

    const res =await  axios.post(API_URL, data)
    return(res)
}