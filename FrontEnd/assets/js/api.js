
export async function getWorks() {
    const response  = await fetch("http://localhost:5678/api/works");

    const works = await response.json();

    console.log("travaux recup:", works);

    return works;
}

export async function getCategories(){
    const response = await fetch("http://localhost:5678/api/categories");

    const categories = await response.json();
    
    console.log(categories)

    return categories;
}