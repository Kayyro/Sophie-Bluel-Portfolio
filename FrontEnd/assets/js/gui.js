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
