const searchbtn=document.getElementById('search-btn')
const mealList=document.getElementById('meal')
const mealDetailsContent=document.querySelector('.meal-details-content')
const recipeCloseBtn = document.getElementById('recipe-close-btn')


searchbtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
   mealDetailsContent.parentElement.classList.remove('showRecipe');
});


function getMealList(){
   let searchinput=document.getElementById('search-input').value.trim();
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchinput}
   `).then(response => response.json())
   .then(data=>{
      let html=''
      if(data.meals)
      {
         data.meals.forEach(meal => {
            html+=`
            <div class = "meal-item" data-id="${meal.idMea}">
                <div class = "meal-img">
                  <img src = "${meal.strMealThumb
                  }" alt = "food">
                </div>
                <div class = "meal-name">
                  <h3>${meal.strMeal}</h3>
                  <a href = "#" class = "recipe-btn">Get Recipe</a>
                </div>
              </div>
            
            `
         });
         mealList.classList.remove('notFound')
      }
      else{
         html="sorry ,we didnot find any meal !"
         mealList.classList.add('notFound')
      }
      mealList.innerHTML=html
      
   })
}

function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
       fetch(`https://www.themealdb.com/api/json/v1/1/random.php?i=${mealItem.dataset.id}`)
       .then(response=>response.json())
       .then(data=>mealrescipemodel(data.meals)
      
       )
      
    }

    
}
function mealrescipemodel(meal)
{
let html=''
 meal=meal[0]
  html+=`
 <h2 class = "recipe-title">${meal.idMeal}</h2>
              <p class = "recipe-category">${meal.strCategory}</p>
              <div class = "recipe-instruct">
                <h3>Instructions:</h3>
                <p>${meal.strInstructions.split(" ").slice(0,15).join(" ")}</p>
              </div>
              <div class = "recipe-meal-img">
                <img src = "${meal.strMealThumb}" alt = "">
              </div>
              <div class = "recipe-link">
                <a href = "${meal.strYoutube}" target = "_blank">
                </a>
              </div>
              
              
              
              `;
              
   mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}