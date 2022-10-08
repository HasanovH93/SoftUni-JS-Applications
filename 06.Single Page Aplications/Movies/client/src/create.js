import { homePage } from "./home.js";
import { showView } from "./util.js";

const section = document.querySelector("#add-movie");
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit)

export function createPage(){
  showView(section)
 }

 async function onSubmit(event){
  event.preventDefault()
   const formData = new FormData(form);

   const title = formData.get('title');
   const description = formData.get('description');
   const imgUrl = formData.get('imageUrl');
  
   await createMovie(title,description,imgUrl);
   form.reset();
   homePage();
 }

 async function createMovie(title,descritpion, img){
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await fetch('http://localhost:3030/data/movies', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': user.accessToken
    },
    body: JSON.stringify({title,descritpion,img})
  })
 }
