let input = document.querySelector('.input');
let btn = document.querySelector('.search');
let container = document.querySelector('.container');
let h2 = document.querySelector('.h2');
let detail = document.querySelector('.recipe-content');
let containRecipe = document.querySelector('.recipe');
let hide = document.querySelector('.hide')

let mealsData = [];

btn.addEventListener("click", async () => {
    let value = input.value.toLowerCase().trim();
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
    if (value === '') {
        h2.innerHTML = `Oops! you haven't entered a meal name yet.`
        return;
    }
    try {
        let response = await fetch(url);
        h2.innerHTML = 'Loading...';
        if (!response.ok) {
            alert('There is an error');
            return;
        }
        let data = await response.json();
        mealsData = data.meals;
        if (!data.meals) {
            h2.innerHTML = `Oops! no meal found.`;
            input.value = ''
            return;
        }

        container.innerHTML = '';
        data.meals.forEach((meal, index) => {
            container.classList.remove('hidden');
            container.innerHTML += `<div class='card'> 
    <img src='${meal.strMealThumb}' alt= 'Image of meal'>
   <div class='content'>
    <h1>${meal.strMeal}</h1>
     <p><b> ${meal.strCountry}</b> Dish</p>
    <p>Belongs to <b>${meal.strCategory}</b> Category</p>
    <button data-id=${index}> Search Meal</button>
    </div>
    </div>`;
        })


    }
    catch (error) {
        alert(error);
    }
    h2.innerHTML = '';
    input.value = ''

});

input.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        btn.click();
    }
})

container.addEventListener("click", (e) => {
    if (e.target.tagName === 'BUTTON') {
        containRecipe.classList.remove('hidden');
        let id = e.target.dataset.id;
        let meal = mealsData[id];

        let ingredients = '';

        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== '') {
                ingredients += `<li>${ingredient} - ${measure}</li>`;
            }
        }

        detail.innerHTML = `
            <h1>${meal.strMeal}</h1>

    <h3>Ingredients: </h3>
    <ul>
        ${ingredients}
    </ul>
            <h3> Instruction: </h3>
            <p>${meal.strInstructions}</p>
        
        `;

    }
});
hide.addEventListener("click", () => {
    containRecipe.classList.add('hidden');
})

