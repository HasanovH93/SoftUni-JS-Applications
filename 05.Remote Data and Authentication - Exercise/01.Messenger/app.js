const url = "http://localhost:3030/jsonstore/messenger";
const messages = document.getElementById("messages");

function attachEvents() {
  document.getElementById("submit").addEventListener("click", postMsg);
  document.getElementById("refresh").addEventListener("click", refreshMsg);
}
async function postMsg() {
    const [author,content] = [document.getElementById('author'),document.getElementById('content')];
    if(author.value == "" || content.value == ""){
        alert('All fields are required!')
    }
     request(url,{author:author.value,content:content.value})
     messages.value += `\n${author.value}: ${content.value}`
}
async function refreshMsg() {
  const response = await fetch(url);

  const data = await response.json();

  messages.value = Object.values(data)
    .map(({ author, content }) => {
      return `${author}: ${content}`;
    })
    .join("\n");
}

async function request(url, option) {
  if (option) {
    option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(option),
    };
  }
  const response = await fetch(url,option)
  return await response.json()
}

attachEvents();
