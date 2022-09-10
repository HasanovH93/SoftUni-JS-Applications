import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { searchPage } from "./views/search.js";


const main = document.getElementById(`main-content`);
document.getElementById(`logoutBtn`).addEventListener(`click`, onLogout);

page(decorateCtx);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/createAlbum', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);

updateNav();
page.start();


function decorateCtx(ctx, next) {
    ctx.render = (template) => render(template, main);
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById(`login`).style.display = 'none';
        document.getElementById(`register`).style.display = 'none';
        document.getElementById(`create`).style.display = 'inline';
        document.getElementById(`logoutBtn`).style.display = 'inline';

    } else {
        document.getElementById(`login`).style.display = 'inline';
        document.getElementById(`register`).style.display = 'inline';
        document.getElementById(`create`).style.display = 'none';
        document.getElementById(`logoutBtn`).style.display = 'none';
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}