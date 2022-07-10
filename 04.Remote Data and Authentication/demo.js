const data = {
    'body': 'has hasicha has hasicha',
    'title': 'Hasanov Hasan',

}
async function start(){
    const reposne = await fetch('http://localhost:3030/jsonstore/blog/posts',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    
    });
    const responseData = await reposne.json()
    console.log(responseData)
}

start()

