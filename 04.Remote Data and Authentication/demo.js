document.getElementById("refreshBtn").addEventListener("click", getData);
document.getElementById("createBtn").addEventListener("click", postData);
const list = document.getElementById("list");
const input = document.getElementById("product");

async function getData() {
  const response = await fetch("http://localhost:3030/jsonstore/demo");
  const data = await response.json();

  list.replaceChildren(...Object.values(data).map(createListItem));
}
async function postData() {
  const product = input.value;
  const data = {
    name: product,
  };

  const response = await fetch("http://localhost:3030/jsonstore/demo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  list.appendChild(createListItem(responseData));
}

async function deleteData(id,element){
    const response = await fetch('http://localhost:3030/jsonstore/demo/' + id ,{
    method:'DELETE'
  })
  element.remove()
 
}

function createListItem(record) {
  const element = document.createElement("li");
  element.textContent = record.name;

 const deleteBtn = document.createElement('button')
 deleteBtn.textContent = 'Delete'
 deleteBtn.addEventListener('click', ()=>deleteData(record._id,element));
  element.appendChild(deleteBtn)

  return element;
}
