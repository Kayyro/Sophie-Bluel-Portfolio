import { getCategories, getWorks } from "./api.js";
import { displayWorks, displayFilters } from "./gui.js";
let works = [];

async function init() {
  works = await getWorks();
  const categories = await getCategories();

  displayWorks(works);
  displayFilters(categories, works);
}

init();

const token = localStorage.getItem("token");

function setupEditMode() {
  const editBanner = document.querySelector("#edit-banner");
  editBanner.style.display = "block";

  const navLogin = document.querySelector("#nav-login");
  navLogin.innerText = "logout";
  navLogin.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });

  const filters = document.querySelector(".filters");
  filters.style.display = "none";

  const btnModifier = document.querySelector("#btn-modifier");
  btnModifier.style.display = "block";

  setupModal(btnModifier);
}

function setupModal(btnModifier) {
  const modalOverlay = document.querySelector("#modal-overlay");
  const modalClose = document.querySelector("#modal-close");
  const modalGallery = document.querySelector("#modal-gallery");
  const modalForm = document.querySelector("#modal-form");
  const btnAddPhoto = document.querySelector("#btn-add-photo");
  const btnBack = document.querySelector("#btn-back");

  function closeModal() {
    modalOverlay.style.display = "none";
    modalGallery.style.display = "block";
    modalForm.style.display = "none";
  }

  btnModifier.addEventListener("click", () => {
    modalOverlay.style.display = "flex";
  });

  modalClose.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
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

if (token) {
  setupEditMode();
}
