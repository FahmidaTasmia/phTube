//create loadCategories

const loadCategories=()=>{
    //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error)=>console.log(error));
}

//displayCategories

const displayCategories=(categories)=>{
    categories.forEach((item) => {
        // console.log(item)
        const categoryContainer = document.getElementById('categories');
        const button = document.createElement("button");
        button.classList="btn border border-[#ff405a]";
        button.innerText=item.category;

        categoryContainer.append(button)
    });
}


loadCategories();