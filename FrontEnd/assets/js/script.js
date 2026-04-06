import { getCategories, getWorks } from "./api.js";
import { displayWorks, displayFilters } from "./gui.js";
let works = []; //je le declare en dehors

async function init() {
  works = await getWorks();
  const categories = await getCategories();

  displayWorks(works);
  displayFilters(categories, works);
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
  //filtre
  const filters = document.querySelector(".filters");
  filters.style.display = "none";

  const btnModifier = document.querySelector("#btn-modifier");
  btnModifier.style.display = "block";

  // MODALE
  const modalOverlay = document.querySelector("#modal-overlay");
  const modalClose = document.querySelector("#modal-close");
  const modalGallery = document.querySelector("#modal-gallery");
  const modalForm = document.querySelector("#modal-form");
  const btnAddPhoto = document.querySelector("#btn-add-photo");
  const btnBack = document.querySelector("#btn-back");

  btnModifier.addEventListener("click", () => {
    modalOverlay.style.display = "flex";
  });

  modalClose.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = "none";
    }
  });

  btnAddPhoto.addEventListener("click", () => {
    modalGallery.style.display = "none";
    modalForm.style.display = "block";
  });

  btnBack.addEventListener("click", () => {
    modalForm.style.display = "none";
    modalGallery.style.display = "block";
  });
}