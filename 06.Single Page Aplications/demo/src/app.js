document.querySelectorAll("section").forEach((s) => (s.style.display = "none"));
document.getElementById("homeView").style.display = "";

document.querySelector("nav").addEventListener("click", onNavigate);

const sections = {
    
}

function onNavigate(event) {
  if (event.target.tagName == "BUTTON") {
    document
      .querySelectorAll("section")
      .forEach((s) => (s.style.display = "none"));

    switch (event.target.id) {
      case "homeBtn":
        document.getElementById("homeView").style.display = "";
        break;
      case "catalogBtn":
        document.getElementById("catalogView").style.display = "";
        break;
      case "aboutBtn":
        document.getElementById("aboutView").style.display = "";
        break;
    }
  }
}
