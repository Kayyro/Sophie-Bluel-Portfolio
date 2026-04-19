import { addWork } from "./api.js";
import { displayModalWorks, displayCategories, displayWorks } from "./gui.js";

// éléments du DOM
const token = localStorage.getItem("token");
const inputTitle = document.querySelector("#title");
const inputPhoto = document.querySelector("#photo");
const selectCategory = document.querySelector("#category");
const modalOverlay = document.querySelector("#modal-overlay");
const modalClose = document.querySelector("#modal-close");
const modalGallery = document.querySelector("#modal-gallery");
const modalForm = document.querySelector("#modal-form");
const btnAddPhoto = document.querySelector("#btn-add-photo");
const btnBack = document.querySelector("#btn-back");
const previewImg = document.querySelector("#preview-img");
const labelPhoto = document.querySelector("#label-photo");
const btnSubmit = document.querySelector("#btn-submit");
const btnModifier = document.querySelector("#btn-modifier");

// FermetureMOdal
function closeModal() {
    modalOverlay.style.display = "none";
    modalGallery.style.display = "block";
    modalForm.style.display = "none";
    resetForm();
}

//mode edition
export function setupEditMode(categories, works) {
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

    btnModifier.style.display = "block";

    setupModal(categories, works);
}

//Modale
function setupModal(categories, works) {
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
        resetForm();
    });

    //P-Photo
    inputPhoto.addEventListener("change", () => {
        const file = inputPhoto.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                previewImg.style.display = "block";
                labelPhoto.style.display = "none";
            };
            reader.readAsDataURL(file);
        }
    });

    //formulaire(category-titre-phoyo)
    handleSubmitWork(works);
}

function handleSubmitWork(works) {
    btnSubmit.addEventListener("click", async () => {
        const file = inputPhoto.files[0];
        const title = inputTitle.value;
        const category = selectCategory.value;

        if (!file || !title || !category) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("category", category);

        const newWork = await addWork(formData, token);
        works.push(newWork);
        displayWorks(works);
        displayModalWorks(works, token);
        resetForm();

        modalForm.style.display = "none";
        modalGallery.style.display = "block";
    });
}

//Reset modale
function resetForm() {
    inputPhoto.value = "";
    inputTitle.value = "";
    selectCategory.value = "";
    previewImg.style.display = "none";
    previewImg.src = "";
    labelPhoto.style.display = "flex";
}