import { showAbout } from "./about.js";
import { showCatalog } from "./catalog.js";
import { showHome } from "./home.js";


document.querySelector("nav").addEventListener("click", onNavigate);

showHome()

const sections = {
  homeBtn: showHome,
  catalogBtn: showCatalog,
  aboutBtn:  showAbout,
};

function onNavigate(event) {
  if (event.target.tagName == "A") {
      const view = sections[event.target.id];
      if(typeof view){
        event.preventDefault();
        document.querySelectorAll("section").forEach((s) => (s.style.display = "none"));
       view()  
    }
  }
}


