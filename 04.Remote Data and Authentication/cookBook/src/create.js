document.querySelector('form').addEventListener('submit', onSubmit)

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get('name').trim().split('\n');
    const img = formData.get('img').trim().split('\n');
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');

    const recipe = ({
        name,
        img,
        ingredients,
        steps
    });

    const token = sessionStorage.getItem('accessToken');

    if(token == null) {
        alert('Please login!!');
        window.location = '/04.Remote%20Data%20and%20Authentication/cookbook/login.html';
        return;
    }

    try {
        
        const response = await fetch('http://localhost:3030/data/recipes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(recipe)
        });
        if(response.ok == false){
            const error = await response.json();
            throw new Error(error.message)
        }
        window.location = '/04.Remote%20Data%20and%20Authentication/cookbook/'
    } catch (err) {
        alert(err.message)
    }
}