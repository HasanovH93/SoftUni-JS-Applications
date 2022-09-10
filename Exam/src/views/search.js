import { search } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const searchTemplate = (onSearch, result, userData) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button class="button-list" @click=${onSearch}>Search</button>
    </div>
    <h2>Results:</h2>
    ${result != null
        ? (userData ? result.map(resultTemplateUser) : result.map(resultTemplateGuest))
        : null}
</section>
`;

const resultTemplateUser = (result) => html`
<div class="search-result">
    <!--If have matches-->
    ${result.length == 0
        ? html`<p class="no-result">No result.</p>`
        : html`
        <div class="card-box">
        <img src=${result.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${result.name}</p>
                <p class="artist">Artist: ${result.artist}</p>
                <p class="genre">Genre: ${result.genre}</p>
                <p class="price">Price: $${result.price}</p>
                <p class="date">Release Date: ${result.releaseDate}</p>
            </div>
            <div class="btn-group">
                <a href="/details/${result._id}" id="details">Details</a>
            </div>
        </div>
    </div>`}
</div>
`;

const resultTemplateGuest = (result) => html`
<div class="search-result">
    <!--If have matches-->
    ${result.length == 0
        ? html`<p class="no-result">No result.</p>`
        : html`
        <div class="card-box">
        <img src=${result.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${result.name}</p>
                <p class="artist">Artist: ${result.artist}</p>
                <p class="genre">Genre: ${result.genre}</p>
                <p class="price">Price: $${result.price}</p>
                <p class="date">Release Date: ${result.releaseDate}</p>
            </div>
        </div>
    </div>`}
</div>
`;

export async function searchPage(ctx) {

    let result = null;
    const userData = getUserData();
    ctx.render(searchTemplate(onSearch, result, userData));


    async function onSearch() {
        const searchInput = document.getElementById(`search-input`).value.trim();

        if (searchInput == '') {
            return alert(`Can not search with an empty input!`)
        }

        result = await search(searchInput);
        console.log(result);

        ctx.render(searchTemplate(onSearch, result, userData))
    }

}