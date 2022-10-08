import { showView } from "./router.js";

const routes = {
   '/': homePage,
   '/login': loginPage,
   'logout': logoutPage,
   '/registers': registerPage,
   '/create': addMoviePage,
   
};

document.querySelector("nav").addEventListener("click", onNavigate);
document.querySelector('#add-movie-button a').addEventListener('click', onNavigate)

function onNavigate(event){
   if (event.target.tagName == "A" && event.target.href) {
      event.preventDefault();
      const url = new URL(event.target.href);
      const view = routes[url.pathname]
      if(typeof view == "function") {
        view();
      }
    }
}

const homeSection = document.querySelector("#home-page");
const loginSection = document.querySelector("#form-login");
const registerSection = document.querySelector("#form-sign-up");
const addMovieSection = document.querySelector("#add-movie");
const editMovieSection = document.querySelector("#edit-movie");
const movieSection = document.querySelector("#movie-example");

function homePage() {
  showView(homeSection);
}

function loginPage() {
  showView(loginSection);
}
function registerPage(){
   showView(registerSection)
}
function addMoviePage(){
   showView(addMovieSection)
}
function editMoviePAge(){
   showView(editMovieSection)
}
function moviePage(){
   showView(movieSection)
}

function logoutPage(){
    alert('logged out')
}


//start application in catalog view

homePage()