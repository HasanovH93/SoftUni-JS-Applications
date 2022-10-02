const section = document.getElementById('loginView');
section.remove();

export function showLogin(){
    document.querySelector('main').replaceChildren(section)
}