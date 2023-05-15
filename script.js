//const img = document.getElementById("img");
const searchResult = document.getElementById("search-result");
const food = document.getElementById("input-field");
const searchBtn = document.getElementById("search-btn");
const recipeInfo = document.querySelector(".inner-more-info");
const readMore = document.querySelector(".more-info");
const closeReadMore = document.getElementById("close");
const serachSection = document.getElementById("search-section")
let arr=[];
let foodvalue;

serachSection.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(food.value !=''){
        foodvalue = food.value.toLowerCase();
        loadinfo();
    }
    food.value = '';

})
// searchBtn.addEventListener("click",function(){
//     if(food.value !=''){
//         foodvalue = food.value.toLowerCase();
//         loadinfo();
//     }
//     food.value = '';
// });

closeReadMore.addEventListener("click",()=>{
    readMore.classList.add("remov");
})

function loadBtn(meals){
    arr = document.querySelectorAll(".read-btn");
    arr.forEach((element,index)=>{
        element.addEventListener("click",()=>{
            showRecipe(meals[index]);
        })
    })
}

async function loadinfo(){
    searchResult.innerHTML = "Loding...";
    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodvalue}`);
    let info = await respons.json();
    console.log(info);
    let meals = info.meals;
    
    show(meals);
    loadBtn(meals);
}

function show(obj){
    if(obj == null){
        searchResult.innerHTML = "<h2>Sorry there is no results<h2>";
        return;
    }
    searchResult.innerHTML = '';
    for(let i = 0; i < obj.length; ++i){
        searchResult.innerHTML+= foodCard(obj[i]);
    }
}


function foodCard(obj){
    return `
    <div class="card">
        <img src= ${obj.strMealThumb}  alt=${obj.strMeal} id="img">
        <div class="content">
            <h2>${obj.strMeal}</h2>
            <button class = "read-btn" name = ${obj.idMeal})">Read more</button>
        </div>
    </div>  
    `
}


///send another request to get the more info about the meal
/*async function Recipe(idMeal){
    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodvalue}`);
    let info = await respons.json();
    let meals = info.meals;
    let obj;
    for(let i = 0; i < meals.length; ++i){
        console.log(meals[i]);
        console.log(idMeal);
        if(Number(meals[i].idMeal) === Number(idMeal)){
            obj = meals[i]
            console.log(obj);
        }
    }
    showRecipe(obj);
}*/
function showRecipe(obj){
    recipeInfo.innerHTML = '';
    recipeInfo.innerHTML = recipeCard(obj);
    readMore.classList.remove('remov');
}
function recipeCard(obj){
    console.log(obj)
    return `
        <div class="img-container">
        <img src=${obj.strMealThumb} alt="" id="img">
        </div>
        <div class="content-container">
            <h2 >${obj.strMeal}</h2>
            <p>${obj.strInstructions}</p>
        </div>
        <button class="video" id="video"><a href=${obj.strYoutube}>video</a></button>
    `
}

