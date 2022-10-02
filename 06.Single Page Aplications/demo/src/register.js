const section = document.getElementById('registerView')
section.remove();


export function showRegister(){
    document.querySelector('main').replaceChildren(section);
}