import { getCategories, getWorks } from "./api.js";
import { displayWorks, displayFilters } from "./gui.js";
import { setupEditMode } from "./modal.js";

let works = [];
let categories = [];

async function init() {
  works = await getWorks();
  categories = await getCategories();

  displayWorks(works);
  displayFilters(categories, works);

  if (localStorage.getItem("token")) {
    setupEditMode(categories, works);
  }
}

init();
