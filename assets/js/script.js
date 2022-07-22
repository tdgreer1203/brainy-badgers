// Place your API Keys here

// spponacular API Keys:
var jorgeApi = '?apiKey=d5f1707aa8a94f70a3fce40a554aebc6';
var jorgeApi2 = '?apiKey=2831de2f06594a778a430bad8ab00cba';
var joshuaApi = '';
var djApi = '';
var joshuaApi = '';

// Cocktail API Keys, since we are in a test enrionment for bootcamp project we will be use text apiKey = 1



// Vars to connect to HTML
var titleEl = document.getElementById('title');
var imageEl = document.getElementById('image');
var ingredientListEl = document.getElementById('ingredient-list');
var summaryEl = document.getElementById('summary');
var instructionsEl = document.getElementById('instructions');
//



var recipeId;


// Array so that the recipe button generates a random recipe from the array
var recipeArray = [];

// array so that we can run a for loop and generate all the ingredient names to the DOM
var ingredientNameArray = [];

// array so that we can loop and generate the instructions to the DOM
var instructionsArray = [];


// generates a random integer for recipe API call
function getRandomRec() {
    return Math.floor(Math.random() * 30);
}

function getRandomCoc() {
    return Math.floor(Math.random() * 5);
}

// this function will generate a recipe on screen from the api call and the function will include title of dish,
//  an image of the dish, and the names of the ingredients for the recipe. 
function generateRecipe(query){
    // this api will call the ingredient name and picture to the dom
    $.ajax({
        url:"https://api.spoonacular.com/recipes/search" + jorgeApi2 + "&number=30&query="+ query,
        success: function(res){  //res is short of response
            var randomRecNumber = getRandomRec();
            titleEl.innerHTML = res.results[randomRecNumber].title;
            imageEl.setAttribute('src',res.baseUri + res.results[randomRecNumber].image);
            // links id from first api call to recipeID which will be added into URL for second call
            recipeId = res.results[randomRecNumber].id 
            console.log(recipeId);

            // will call the ingredients url and then add those ingredients to the DOM
            $.ajax({
                url:"https://api.spoonacular.com/recipes/" + recipeId + "/ingredientWidget.json" + jorgeApi2,
                success: function(res){
                    ingredientListEl.innerHTML = ''
                    for (var i = 0; res.ingredients.length; i++) {
                        // creating a list element inside the unordered list and will loop until all ingredient names are listed in DOM
                        ingredientListEl.innerHTML = ingredientListEl.innerHTML + "<li>" + res.ingredients[i].name + "</li>";
                    }
                }
            });

            //  and step by step instructions, using recipe Id
            $.ajax({
                url: "https://api.spoonacular.com/recipes/" + recipeId + "/analyzedInstructions" + jorgeApi2,
                success: function(res){
                    // instructionsEl.innerHTML = ''
                    // for (var i = 0; res.steps.length; i++){
                        // creating a list element inside of the ordered list and will loop until all steps are listed in the DOM
                        // instructionsEl.innerHTML = instructionsEl.innerHTML + "<li>" + res.steps[i].step + "</li>";
                        instructionsEl.innerHTML =res[0].steps.step
                    // }
                }
            });

            //  will generate a recipe sumamry to be added to the <p> element class id Sumarry, using the Recipe Id
             $.ajax({
                url:"https://api.spoonacular.com/recipes/" + recipeId + "/summary" + jorgeApi2,
                success: function(res){
                    summaryEl.innerHTML = res.summary;
                }
            });
        }  
    });            
}

function generateCocktail(query) {
    // this call will generate the cocktail name and image to the DOM
    $.ajax({
        url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + query,
        success: function(res){
            var randomCocNumber = getRandomCoc();
            titleEl.innerHTML = res.drinks[randomCocNumber].strDrink;
            imageEl.setAttribute('src', res.drinks[randomCocNumber].strDrinkThumb);
        }
    });
}