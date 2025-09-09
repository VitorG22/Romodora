import axios from "axios"
import { getCookie } from "./cookies"

export async function PostData({data,endPoint,onSuccess, onError}: {data:any, endPoint:string, onSuccess: (res:any)=>void, onError?: (res:any)=>void} ){
    const token = getCookie('accessToken')
    const baseURL = import.meta.env.VITE_API_URL

    try {
        const res = await axios.post(
            `${baseURL}${endPoint}`, data, {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        onSuccess(res)
    } catch (err) {
        console.error(err)
        onError?.(err)
    }
}

export async function getData({endPoint,onSuccess,onError}:{ endPoint:string, onSuccess: (res:any)=>void, onError?: (res:any)=>void} ){
    const baseURL = import.meta.env.VITE_API_URL
    const token = getCookie("accessToken")

    try {
        const res = await axios.get(`${baseURL}${endPoint}`,{
            headers: {Authorization: `Bearer ${token}`}
        })
        onSuccess(res)
    } catch (err) {
        console.error(err)
        onError?.(err)
    }
}