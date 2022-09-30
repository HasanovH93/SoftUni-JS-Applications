
document.querySelector('form').addEventListener('submit',onSumbit);

async function onSumbit(event){

  event.preventDefault();
  const formData = new FormData(event.target);

  const email = formData.get('email')
  const password = formData.get('password');
  const repass = formData.get('rePass')
  

  try {
    if(email == '' || password == ''){
      throw new Error('All fields are required!')
    }
    if(password != repass){
      throw new Error('passwords dont match')
    }

    const response = await fetch('http://localhost:3030/users/register', {
      method: 'post',
      headers: {
        'Content-Type': 'aplication/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    if(response.ok == false){
      const error = await response.json();
      throw new Error(error.message)
    }
    const data = await response.json()
    sessionStorage.setItem('accessToken', data.accessToken)
    window.location = '/04.Remote%20Data%20and%20Authentication/cookbook'
  } catch (err) {
    alert(err.message);
  }
}