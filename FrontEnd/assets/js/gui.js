import { deleteWork } from "./api.js";

let activeBtn;

export function displayWorks(works) {
  const gallery = document.querySelector(".gallery");

  //vide la gallery (suppr les images html)
  gallery.innerHTML = "";

  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = work.imageUrl;
    img.alt = work.title;
    figcaption.innerText = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
  });
}

export function displayFilters(categories, works) {
  const filtersContainer = document.querySelector(".filters");

  categories.unshift({ id: 0, name: "Tous" });

  categories.forEach((category) => {
    const btn = document.createElement("button");

    btn.innerText = category.name;
    btn.classList.add("btn-filter");

    if (category.id === 0) {
      btn.classList.add("active");
      activeBtn = btn;
    }

    //filtrage
    btn.addEventListener("click", () => {
      activeBtn.classList.remove("active");
      btn.classList.add("active");
      activeBtn = btn;

      const filteredWorks =
        category.id === 0
          ? works
          : works.filter((work) => work.categoryId === category.id);

      displayWorks(filteredWorks);
    });
    filtersContainer.appendChild(btn);
  });
}

//ajouter  fonction similaire a displayWorks//
export function displayModalWorks(works, token) {
  const modalWorks = document.querySelector("#modal-works");

  //vide
  modalWorks.innerHTML = "";

  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const btnDelete = document.createElement("button");

    img.src = work.imageUrl;
    img.alt = work.title;

    // icon poubelle
    btnDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    btnDelete.classList.add("btn-delete");

    //tentative de faire un truc
    btnDelete.addEventListener("click", async () => {

      await deleteWork(work.id, token);
      figure.remove(); // retire du DOM
      const index = works.indexOf(work);
      works.splice(index, 1); // retire du tableau
      displayWorks(works); // met à jour la galerie
    });

    figure.appendChild(img);
    figure.appendChild(btnDelete);

    modalWorks.appendChild(figure);
  });
}

export function displayCategories(categories) {
  const select = document.querySelector("#category");

  select.innerHTML = "";

  categories.forEach(category =>{
    if (category.id === 0) return;

    const option = document.createElement("option");
    option.value = category.id;
    option.innerText = category.name;
    select.appendChild(option);
  })
}