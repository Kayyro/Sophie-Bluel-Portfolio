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
  //pos bouton
  const filtersContainer = document.querySelector(".filters");

  //boutton "tous"
  const btnAll = document.createElement("button");
  btnAll.innerText = "Tous";
  btnAll.classList.add("btn-filter", "active"); //ont voit "tout" par defaut
  filtersContainer.appendChild(btnAll);

  //"Tout" affiche le tableau "works" complet
  activeBtn = btnAll;
  btnAll.addEventListener("click", () => {
    displayWorks(works);
    activeBtn.classList.remove("active");
    btnAll.classList.add("active");
    activeBtn = btnAll;
  });
  //Boutton dynamique
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.innerText = category.name;
    btn.classList.add("btn-filter");
    filtersContainer.appendChild(btn);

    //filtrage
    btn.addEventListener("click", () => {
      // .filter() crée un nouveau tableau avec uniquement les projets
      // qui ont le même ID que la catégorie du bouton cliqué
      activeBtn.classList.remove("active");
      btn.classList.add("active");
      activeBtn = btn;
      const filteredWorks = works.filter((work) => {
        return work.categoryId === category.id;
      });
      displayWorks(filteredWorks);
    });
  });
}
