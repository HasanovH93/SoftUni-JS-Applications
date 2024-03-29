import { showView, spinner } from "./util.js";

const section = document.querySelector("#edit-movie");

export function detailsPage(id) {
  showView(section);
  displayMovie(id);
}

async function displayMovie(id) {
  section.replaceChildren(spinner());
  const user = JSON.parse(localStorage.getItem("user"));

  const [movie, likes, like] = await Promise.all([
    getMovie(id),
    getLikes(id),
    getOwnLike(id, user),
  ]);
  section.replaceChildren(createMovieCard(movie, user, likes, like));
}

function createMovieCard(movie, user, likes, like) {
  const element = document.createElement("div");
  element.className = "container";
  element.innerHTML = `
    <div class="row bg-light text-dark">
    <h1>Movie title: ${movie.title}</h1>

    <div class="col-md-8">
        <img class="img-thumbnail" src="${movie.img}" alt="Movie">
    </div>
    <div class="col-md-4 text-center">
        <h3 class="my-3 ">Movie Description</h3>
        <p>${movie.description}</p>
        ${createControlls(movie, user, likes, like)}
       </div>
</div>`;

const likeBtn = element.querySelector('.like-btn');
if(likeBtn){
    likeBtn.addEventListener('click', (e) => likeMovie(e,movie._id))
}

  return element;
}

function createControlls(movie, user, likes, like) {
  const isOwner = user && user._id == movie._ownerId;

  let controlls = [];

  if (isOwner) {
    controlls.push('<a class="btn btn-danger" href="#">Delete</a>');
    controlls.push(' <a class="btn btn-warning" href="#">Edit</a>');
  } else if (user && like == false) {
    controlls.push('<a class="btn btn-primary like-btn" href="#">Like</a>');
  }
  controlls.push(`<span class="enrolled-span">Liked ${likes}</span>`);
  return controlls.join("");
}

async function getMovie(id) {
  const res = await fetch(`http://localhost:3030/data/movies/${id}`);
  const movie = await res.json();

  return movie;
}

async function getLikes(id) {
  const res = await fetch(
    `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count(GET)`
  );
  const likes = await res.json();
  return likes.length
}
async function getOwnLike(movieId, user) {
  if (!user) {
    return false;
  } else {
    const userId = user._id;

    const res = await fetch(
      `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22(GET)`
    );
    const like = await res.json();

    return like.length > 0;
  }
}


async function likeMovie(e,movieId) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    await fetch('http://localhost:3030/data/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken,
        },
        body: JSON.stringify({
            movieId
        })
    })

    detailsPage(movieId)

}