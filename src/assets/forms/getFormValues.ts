export default function getFormValues(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    var formData = new FormData(e.currentTarget)
    
    const values = Object.fromEntries(formData)
    return values

}