function getTimeString(time) {
  //get Hour and rest seconds
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour  ${minute} minute ${remainingSecond} second ago`;
}

const removeActiveClass =()=>{
    const buttons = document.getElementsByClassName("category-btn");
    // console.log(buttons)
    for(let btn of buttons){
        btn.classList.remove('active');
    }
}

//create loadCategories

const loadCategories=()=>{
    //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error)=>console.log(error));
}


//create loadVideos

const loadVideos=()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then( (res) => res.json())
    .then((data)=>displayVideos(data.videos))
    .catch((error)=>console.log(error))
}

//create loadCategoriesVideo
const loadCategoriesVideo=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then( (res) => res.json())
    .then((data)=>{
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`);
        // console.log(activeBtn);
        activeBtn.classList.add('active');
        displayVideos(data.category);
    })
    .catch((error)=>console.log(error))
}

//displayCategories

const displayCategories=(categories)=>{
    const categoryContainer = document.getElementById("categories")
    categories.forEach((item) => {
        // console.log(item)
       //create A button
       const buttonContainer = document.createElement("div");
       buttonContainer.innerHTML = `
       <button id="btn-${item.category_id}" onClick="loadCategoriesVideo( ${item.category_id})" class="btn category-btn border border-red-500">
       ${item.category}
       </button>
       `


        categoryContainer.append(buttonContainer)
    });
}

//displayVideos

const displayVideos=(videos)=>{
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML="";
    if(videos.length === 0){
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML=`
        <div class="min-h-[300px] flex flex-col gap-8 justify-center items-center">
            <img src="assets/Icon.png"/>
            <h2 class="text-4xl font-extrabold text-center">No Content In this Category</h2>
        </div>
        `
    }
    else{
        videoContainer.classList.add("grid")
    }
    videos.forEach((video)=>{
        // console.log(video)
        const card = document.createElement("div");
        card.classList="card card-compact";
        card.innerHTML=`
         <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover "   
            src=${video.thumbnail}
            alt="Shoes" />
            ${video.others.posted_date?.length === 0 ? "" : 
                ` <span class="absolute text-xs right-2 bottom-2 bg-black rounded p-2 text-white">${getTimeString(video.others.posted_date)}
                </span>`}
           
          </figure>
            <div class="px-0 py-2 flex gap-2">
             <div>
              <img
              class="h-10 w-10 rounded-full object-cover  " 
                src= ${video.authors[0].profile_picture}
                alt="" />
             </div>
             <div>
             <h3 class="font-bold text-lg ">${video.title}</h3>
             <div class="flex gap-4">
             <p>${video.authors[0].profile_name}</p>
             ${video.authors[0].verified === true ? `<img class="h-5 w-5 rounded-full object-cover" 
                src= "https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />` : ""}
             </div>
             </div>
            
        </div>
        `
        videoContainer.appendChild(card)
        
    })
}
loadCategories();
loadVideos();