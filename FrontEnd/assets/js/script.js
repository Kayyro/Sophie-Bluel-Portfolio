import { getCategories, getWorks, addWork } from "./api.js";
import {
  displayWorks,
  displayFilters,
  displayModalWorks,
  displayCategories,
} from "./gui.js";
let works = [];
let categories = [];

async function init() {
  works = await getWorks();
  categories = await getCategories();

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

  setupModal(btnModifier, token);
}

function setupModal(btnModifier, token) {
  const modalOverlay = document.querySelector("#modal-overlay");
  const modalClose = document.querySelector("#modal-close");
  const modalGallery = document.querySelector("#modal-gallery");
  const modalForm = document.querySelector("#modal-form");
  const btnAddPhoto = document.querySelector("#btn-add-photo");
  const btnBack = document.querySelector("#btn-back");
  const inputPhoto = document.querySelector("#photo");
  const previewImg = document.querySelector("#preview-img");
  const labelPhoto = document.querySelector("#label-photo");
  const btnSubmit = document.querySelector("#btn-submit");
  const inputTitle = document.querySelector("#title");
  const selectCategory = document.querySelector("#category");

  function closeModal() {
    modalOverlay.style.display = "none";
    modalGallery.style.display = "block";
    modalForm.style.display = "none";
  }

  btnModifier.addEventListener("click", () => {
    modalOverlay.style.display = "flex";
    displayModalWorks(works, token);
  });

  modalClose.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  btnAddPhoto.addEventListener("click", () => {
    modalGallery.style.display = "none";
    modalForm.style.display = "block";
    displayCategories(categories);
  });

  btnBack.addEventListener("click", () => {
    modalForm.style.display = "none";
    modalGallery.style.display = "block";
  });

  inputPhoto.addEventListener("change", () => {
    const file = inputPhoto.files[0]; //recupere le fichier

    if (file) {
      const reader = new FileReader();

      //qaund le fichier est lu
      reader.onload = (e) => {
        previewImg.src = e.target.result; // on met l'URL dans l'img
        previewImg.style.display = "block"; // on affiche l'img
        labelPhoto.style.display = "none"; // on cache le label
      };
      reader.readAsDataURL(file); //lance la lecture
    }
  });
  btnSubmit.addEventListener("click", async () => {
    const file = inputPhoto.files[0];
    const title = inputTitle.value;
    const category = selectCategory.value;

    // Vérification que tout est rempli
    if (!file || !title || !category) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    // Construction du FormData
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);

    // Appel API via api.js
    const newWork = await addWork(formData, token);
    console.log("nouveau travail créé :", newWork);
    //ajout le nouveau taff au tableau
    works.push(newWork);
    //refresh la galerie principal
    displayModalWorks(works, token);

    //retourne sur la galerie de la modale
    modalForm.style.display = "none";
    modalGallery.style.display = "block";
  });
}

if (token) {
  setupEditMode();
}
