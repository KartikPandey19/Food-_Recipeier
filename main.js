let searchBtn = document.getElementById('search-btn');
let mealList = document.getElementById('meal');
let mealDetailsContent = document.querySelector('meal-details-content');
let recipesCloseBtn = document.getElementById('recipe-close-btn');

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click',getRecipe);

function getMealList() {
    let searchInput = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        .then(response => response.json()).then(data => {
            let html = " ";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                 
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href ="#" class = "recipe-btn">Get Recipe</a> 
                        </div>
                    </div>`;
                });
            }else{
                html = "Sorry no result found! Please search different ingredient";
            }
            mealList.innerHTML = html;

        })
}

function getRecipe(e){
 e.preventDefault();
 if(e.target.classList.contains('recipe-btn')){
     let mealItem = e.target.parentElement.parentElement
     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).then(response =>response.json())
     .then(data =>mealRecipeModal(data.meals))

     }
 }

 function mealRecipeModal(meal){
     meal=meal[0];
     let html = `<h2 class="recipe-title">${meal.strMeal}</h2>
                   <p class="recipe-category">${meal.strCategory}</p>
                   <div class="recipe-instruct">
                       <h3>Instructions:</h3>
                       <p>${meal.strInstructions}</p>
                   </div>
                   <div class="recipe-meal-img">
                       <img src="${meal.strMealThumb}" alt="food">
                   </div>
                   <div class="recipe-link">
                       <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                   </div>`
                   mealDetailsContent.innerHTML = html;
                   mealDetailsContent.parentElement.classList.add('showRecipe');
 }
