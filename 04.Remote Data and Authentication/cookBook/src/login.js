document.querySelector('form').addEventListener('submit',onSubmit)


async function onSubmit(event){
    event.preventDefault();
    const formData =  new FormData(event.target)

    const email = formData.get('email')
    const password = formData.get('password')

    try {

        if(email == "" ) {
            throw new Error('Email is required')
        }
        if(password == ""){
            throw new Error('Password is required')
        }
        
    } catch (error) {
        alert(error.message)
    }
}