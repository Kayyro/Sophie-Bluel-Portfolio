/**
 *DECLARATION
 */

async function getWorks() {
    const response  = await fetch("http://localhost:5678/api/works");

    const works = await response.json();

    console.log("travaux recup:", works);

    return works;
}

async function getCategories(){
    const response = await fetch("http://localhost:5678/api/categories");

    const categories = await response.json();
    
    console.log(categories)

    return categories;
}
/**
 *FONCTION POUR AFFICHER
 */

function displayWorks(works) {
    const gallery = document.querySelector(".gallery");

    //vide la gallery (suppr les images html)
    gallery.innerHTML = "";

    works.forEach(work => {
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

function displayFilters(categories,works) {
    //pos bouton
    const filtersContainer = document.querySelector(".filters");

    //boutton "tous"
    const btnAll = document.createElement("button");
    btnAll.innerText = "Tous";
    btnAll.classList.add("btn-filter", "active"); //ont voit "tout" par defaut
    filtersContainer.appendChild(btnAll);

    //"Tout" affiche le tableau "works" complet
    btnAll.addEventListener("click", () => {
        displayWorks(works);
        updateActiveButton(btnAll);
    });
    //Boutton dynamique
    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.innerText = category.name;
        btn.classList.add("btn-filter");
        filtersContainer.appendChild(btn);

        //filtrage
        btn.addEventListener("click", () => {
            // .filter() crée un nouveau tableau avec uniquement les projets 
            // qui ont le même ID que la catégorie du bouton cliqué
            const filteredWorks = works.filter(work => {
                return work.categoryId === category.id;
            });
            displayWorks(filteredWorks);
            updateActiveButton(btn);
        });
    });
}

function updateActiveButton(clickedBtn) {
    const buttons = document.querySelectorAll(".btn-filter");
    buttons.forEach(btn => btn.classList.remove("active"));
    clickedBtn.classList.add("active");
}

/**
 * TOUT INITIAILISER
 */
async function init() {
    const works = await getWorks();
    const categories = await getCategories();

    displayWorks(works);
    displayFilters(categories,works)
}

init();