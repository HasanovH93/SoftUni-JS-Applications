document.querySelector("form").addEventListener("submit", onSubmit);

async function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const email = formData.get("email");
  const password = formData.get("password");
  const repass = formData.get("rePass");
  try {
    if (email == "" || password == "") {
      throw new Error("All fields are required");
    }
    if ([password != repass]) {
      throw new Error("Passwords doesn't match");
    }

    const response = await fetch("http://localhost/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if(response.ok == false){
        const error = await response.json();
        throw Error(error.message)
    }
  } catch (error) {
    alert(error.message);
  }
}
