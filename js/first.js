

let searchBtn = document.getElementById('searchBtn');
let searchInput = document.getElementById('searchInput');

let allRecipes = [];
let detalis = {};

async function getRecepies(term) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`)
    allRecipes = await apiResponse.json();
    allRecipes = allRecipes.recipes
    displayRecipes()
}

async function getDetails(id) {
    
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
    detalis = await apiResponse.json();
    detalis = detalis.recipe
    displayDetails()
}




function displayRecipes() {
    let cartoona = ``;
    

    for (let i = 0; i < allRecipes.length; i++) {

        let myId = "'"+allRecipes[i].recipe_id+"'" ;
        cartoona +=
            `
         <div class="col-md-4 recipe py-2">

                    <img src="${allRecipes[i].image_url}" onclick="getDetails(${myId})" class="w-100 " alt="">
                <h2 class="color-mine py-2">${allRecipes[i].title}</h2>
                <h5 >${allRecipes[i].publisher}</h5>

                </div>
         `
    }
    document.getElementById('recipesRow').innerHTML = cartoona
}


searchBtn.addEventListener('click', function () {
    getRecepies(searchInput.value)
})



function displayDetails() {

    let cartoona2 = ``;

    for (x of detalis.ingredients) {
                                
        cartoona2+=  `<li class="d-flex py-1 align-items-center font-weight-bolder"><span class="fa-li"><i class="fas fa-utensil-spoon"></i></span>${x}</li>`
      }

    let cartoona =
        `
    <div class="recipeDetails recipe">
    
                            <h2 class ='color-mine p-3'>${detalis.title}</h2>
                            <img  src="${detalis.image_url}" class="w-100" alt="">
                            <ul class="fa-ul py-3">
                             ${cartoona2}
                         </ul>
                        </div>

    `
    document.getElementById('recipeDetails').innerHTML= cartoona
}