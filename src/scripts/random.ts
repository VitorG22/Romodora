export function RandomString(length:number){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.$&@#!';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function RandomNumber(min:number = 0, max:number = 100){
    let randomValue = Math.floor(Math.random() * (max - min) + min)
    return(randomValue)
}