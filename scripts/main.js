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

//create loadVideos

const loadVideos=()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then( (res) => res.json())
    .then((data)=>displayVideos(data.videos))
    .catch((error)=>console.log(error))
}

//displayVideos

const displayVideos=(videos)=>{
    const videoContainer = document.getElementById('videos');
    videos.forEach((video)=>{
        console.log(video)
        const card = document.createElement("div");
        card.classList="card card-compact";
        card.innerHTML=`
         <figure class="h-[200px]">
            <img class="h-full w-full object-cover "   
            src=${video.thumbnail}
            alt="Shoes" />
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
             </div>
            
        </div>
        `
        videoContainer.appendChild(card)
        
    })
}

loadVideos();