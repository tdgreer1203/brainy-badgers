var recipeTitleEl = document.getElementById('recipe-title');
var recipeImageEl = document.getElementById('recipe-image');
var ingredientListEl = document.getElementById('ingredient-list')
//



var recipeId;


// Array so that the recipe button generates a random recipe from the array
var recipeArray = [];

// array so that we can run a for loop and generate all the ingredient names to the DOM
var ingredientNameArray = [];


// generates a random integer for recipeArray
function getRandomInt() {
    return Math.floor(Math.random() * 30);
}

// this function will generate a recipe on screen from the api call and the function will include title of dish,
//  an image of the dish, a link to the recipe website, adn the names of the ingredients for the recipe. 

function generateRecipe(query){
    // this api will call the ingredient name and picture to the dom
    $.ajax({
        url:"https://api.spoonacular.com/recipes/search?apiKey=d5f1707aa8a94f70a3fce40a554aebc6&number=30&query="+ query,
        success: function(res){
            var randomIndex = getRandomInt();
            recipeTitleEl.innerHTML = res.results[randomIndex].title;
            recipeImageEl.setAttribute('src',res.baseUri + res.results[randomIndex].image);
            recipeId = res.results[randomIndex].id 

            $.ajax({
                url:"https://api.spoonacular.com/recipes/" + recipeId + "/ingredientWidget.json?apiKey=d5f1707aa8a94f70a3fce40a554aebc6",
                success: function(res){
                    ingredientListEl.innerHTML = ''
                    for (var i = 0; res.ingredients.length; i++) {
                        ingredientListEl.innerHTML = ingredientListEl.innerHTML + "<li>" + res.ingredients[i].name + "</li>"
                    }
                }
             });
        }  
    })            
}