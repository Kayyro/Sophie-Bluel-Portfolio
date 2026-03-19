import {getCategories, getWorks} from "./api.js"
import { displayWorks, displayFilters } from "./gui.js";

async function init() {
    const works = await getWorks();
    const categories = await getCategories();

    displayWorks(works);
    displayFilters(categories,works)
}

init();

//unshift, push pour les categories
//