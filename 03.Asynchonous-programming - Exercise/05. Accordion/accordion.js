async function solution() {
  const main = document.getElementById("main");

  const url = `http://localhost:3030/jsonstore/advanced/articles/list`;
  const response = await fetch(url);
  const data = await response.json();

  data.forEach((a) => {
    let divAcc = createElement("div", "", ["class", "accordion"]);
    let divHead = createElement("div", "", ["class", "head"]);
    let span = createElement("span", a.title);
    let button = createElement("button", "More", [
      "class",
      "button",
      "id",
      a._id,
    ]);

    let divExtra = createElement("div", "", ["class", "extra"]);
    let p = createElement("p", "");

    button.addEventListener("click", toggle);

    divHead.appendChild(span);
    main.appendChild(divAcc);
    divAcc.appendChild(divHead);
    divHead.appendChild(button);
    divAcc.appendChild(divExtra);
    divExtra.appendChild(p);
  });

  async function toggle(event) {


    const accordion = event.target.parentNode.parentNode;
    const p = event.target.parentNode.parentNode.children[1].children[0];
    console.log(p)
    const id = event.target.id;

    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
    const response = await fetch(url);
    const data = await response.json();
  

  }

  function createElement(type, content, attributes = []) {
    const element = document.createElement(type);

    if (content) {
      element.textContent = content;
    }
    if (attributes.length > 0) {
      for (let i = 0; i < attributes.length; i += 2) {
        element.setAttribute(attributes[i], attributes[i + 1]);
      }
    }
    return element;
  }
}

solution();
