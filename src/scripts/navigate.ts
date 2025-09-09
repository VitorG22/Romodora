import type { NavigateFunction } from "react-router-dom";



let navigator:NavigateFunction;

export function setNavigator(n: NavigateFunction){
    navigator = n
}

export function navigate(path:string){
    if(!navigator){
        console.error("Navigator undefined")
        return
    }
    navigator(path)
}