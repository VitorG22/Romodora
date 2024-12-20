import axios from "axios"

export async function GetData({route}:{route:string}){
    const API_URL =  import.meta.env.VITE_API_URL + route

    const res =await  axios.get(API_URL)
    return(res)
}