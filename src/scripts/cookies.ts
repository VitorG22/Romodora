export function setCookie({ name, value, expire }: { name: String, value: string | undefined, expire?: string }) {
    try {
        let dateExpire = '';
        if (expire) {
            dateExpire = new Date(expire).toUTCString()
        }
        document.cookie = `${name}=${value}; expires=${dateExpire}`
    } catch (error) { }
}

export function getCookie(name: string) {
    const cookies = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${name}=`))

    return cookies ? cookies.split('=')[1] : '';
}

export function deleteCookie(name: string) {
    try {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    } catch (error) { }
}