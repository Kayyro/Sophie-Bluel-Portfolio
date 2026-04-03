import { getCategories, getWorks } from "./api.js"
import { displayWorks, displayFilters } from "./gui.js";

async function init() {
    const works = await getWorks();
    const categories = await getCategories();

    displayWorks(works);
    displayFilters(categories,works)
}

init();

const token = localStorage.getItem("token");

if (token) {
    // badeau
    const editBanner = document.querySelector("#edit-banner");
    editBanner.style.display = "block";

    // Login->Logout
    const navLogin = document.querySelector("#nav-login");
    navLogin.innerText = "logout";
    navLogin.addEventListener("click", () => {
        localStorage.removeItem("token"); // supp le token
        window.location.href = "index.html"; // reload
    });
}
