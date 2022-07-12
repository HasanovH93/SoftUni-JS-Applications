const person = document.getElementById("person");
const phone = document.getElementById("phone");
const phoneBook = document.getElementById("phonebook");
const url = "http://localhost:3030/jsonstore/phonebook";
const loadBtn = document.getElementById("btnLoad");
loadBtn.addEventListener("click", onLoad);
document.getElementById("btnCreate").addEventListener("click", onCreate);

function attachEvents() {}
async function onLoad() {
    phoneBook.innerHTML = ''
  const response = await fetch(url);

  const data = await response.json();

  Object.values(data).forEach((x) => {
    const { person, phone, _id } = x;
    const li = createElement("li", `${person}: ${phone}`, phoneBook);
    li.setAttribute("id", _id);
    const dltBtn = createElement("button", "Delete", li);
    dltBtn.setAttribute("id", "btnDelete");
    dltBtn.addEventListener("click", onDelete);
  });
}

async function onCreate() {
    
  if (person.value !== "" || phone.value !== "") {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        person: person.value,
        phone: phone.value,
      }),
    });
    phoneBook.innerHTML = ''
    loadBtn.click();
    person.value = "";
    phone.value = "";
  }
}

function createElement(type, content, appender) {
  const resultElement = document.createElement(type);
  resultElement.textContent = content;
  appender.appendChild(resultElement);
  return resultElement;
}

async function onDelete() {}

attachEvents();
