// List of our API Keys for Spoonacular 
// Theo API Key = ?apiKey=715f411199a4422e9982991f89fdb06a
// Jorge API Key = ?apiKey=d5f1707aa8a94f70a3fce40a554aebc6
// Jorge Second API Key = ?apiKey=2831de2f06594a778a430bad8ab00cba
// DJ API Key = ?apiKey=e70534b658a340b99af654cbac055309


// Active Api Key
const apiKey = "?apiKey=d5f1707aa8a94f70a3fce40a554aebc6";



var titleEl = document.getElementById('title');
var imageEl = document.getElementById('image');
var ingredientListEl = document.getElementById('ingredient-list')
var recipeStepsEl = document.getElementById('recipe-steps');
var recipeSummaryEl = document.getElementById('recipe-summary');
var sourceLinkEl = document.getElementById('sourceLink');

var recipeId;
var recipeArray = [];
var ingredientArray = [];
var groceryList = [];

// generates a random integer for recipe API call
function getRandomRec() {
    return Math.floor(Math.random() * 30);
}

// generates a random integer for cocktail API call
function getRandomCockt() {
    return Math.floor(Math.random() * 10);
}

// this function will generate a recipe on screen from the api call and the function will include title of dish,
//  an image of the dish, and the names of the ingredients for the recipe, summary, and source link
function generateRecipe(query){
    $.ajax({
        
        url:"https://api.spoonacular.com/recipes/complexSearch" + apiKey + "&number=30&query=" + query + "&addRecipeInformation=true",
        success: function(res){
            var randomRecNum = getRandomRec();
            titleEl.innerHTML = res.results[randomRecNum].title;
            imageEl.setAttribute('src', res.results[randomRecNum].image);
            recipeSummaryEl.innerHTML = res.results[randomRecNum].summary;
            sourceLinkEl.setAttribute("href", res.results[randomRecNum].spoonacularSourceUrl);

            // links id from first api call to recipeID which will be added into URL for following calls 
            recipeId = res.results[randomRecNum].id 

            // will call the ingredients url and then add those ingredients to the DOM

            $.ajax({
                url:"https://api.spoonacular.com/recipes/" + recipeId + "/ingredientWidget.json" + apiKey,
                success: function(res){
                    ingredientListEl.innerHTML = ''
                    for (var i = 0; res.ingredients.length; i++) {
                        // creating a list element inside the unordered list and will loop until all ingredient names are listed in DOM
                        ingredientListEl.innerHTML = ingredientListEl.innerHTML + "<li>" + res.ingredients[i].amount.us.value 
                        + " " + res.ingredients[i].amount.us.unit + " - " + res.ingredients[i].name + "</li>";
                    }
                }
             });
            
             generateSteps();
        }  
    })            
}

function generateSteps() {
    // clears out previous steps
    recipeStepsEl.innerHTML = '';
    
    var apiUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/analyzedInstructions" + apiKey;
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            return response.json().then(function(data) {
                for(var i = 0; i<data[0].steps.length; i++) {
                    recipeStepsEl.innerHTML = recipeStepsEl.innerHTML + "<li>" + data[0].steps[i].step + "</li>";
                }
            })
        } else {
            console.log(error);
        }
    }).catch(function(error) {
        console.log(error);
    });
}

// this function will generate a cocktail to the DOM including name, image, instructions, and ingredients
function generateCocktail(query) {
    // this call will generate the cocktail name and image to the DOM
    $.ajax({
        url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + query,
        success: function(res){
            var randomCocktNum = getRandomCockt();

            // this will add the drink name,drink image, and the instructions to the DOM
            titleEl.innerHTML = res.drinks[randomCocktNum].strDrink;
            imageEl.setAttribute('src', res.drinks[randomCocktNum].strDrinkThumb);
            recipeSummaryEl.innerHTML = res.drinks[randomCocktNum].strInstructions;


            // creating vars for the string on ingedients from contail api
            var meas1 = res.drinks[randomCocktNum].strMeasure1;
            var ing1 = res.drinks[randomCocktNum].strIngredient1;

            var meas2 = res.drinks[randomCocktNum].strMeasure2;
            var ing2 = res.drinks[randomCocktNum].strIngredient2;

            var meas3 = res.drinks[randomCocktNum].strMeasure3;
            var ing3 = res.drinks[randomCocktNum].strIngredient3;

            var meas4 = res.drinks[randomCocktNum].strMeasure4;
            var ing4 = res.drinks[randomCocktNum].strIngredient4;

            var meas5 = res.drinks[randomCocktNum].strMeasure5;
            var ing5 = res.drinks[randomCocktNum].strIngredient5;

            var meas6 = res.drinks[randomCocktNum].strMeasure6;
            var ing6 = res.drinks[randomCocktNum].strIngredient6;

            var meas7 = res.drinks[randomCocktNum].strMeasure7;
            var ing7 = res.drinks[randomCocktNum].strIngredient7;

            var meas8 = res.drinks[randomCocktNum].strMeasure8;
            var ing8 = res.drinks[randomCocktNum].strIngredient8;

            var meas9 = res.drinks[randomCocktNum].strMeasure9;
            var ing9 = res.drinks[randomCocktNum].strIngredient9;

            var meas10 = res.drinks[randomCocktNum].strMeasure10;
            var ing10 = res.drinks[randomCocktNum].strIngredient10;

            var meas11 = res.drinks[randomCocktNum].strMeasure11;
            var ing11 = res.drinks[randomCocktNum].strIngredient11;

            var meas12 = res.drinks[randomCocktNum].strMeasure12;
            var ing12 = res.drinks[randomCocktNum].strIngredient12;

            var meas13 = res.drinks[randomCocktNum].strMeasure13;
            var ing13 = res.drinks[randomCocktNum].strIngredient13;

            var meas14 = res.drinks[randomCocktNum].strMeasure14;
            var ing14 = res.drinks[randomCocktNum].strIngredient14;

            var meas15 = res.drinks[randomCocktNum].strMeasure15;
            var ing15 = res.drinks[randomCocktNum].strIngredient15;

            
            ingredientListEl.innerHTML = "";

            // if and else statements to display only if non null in value 
            if (meas1 !== null && ing1 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas1 + " - " + ing1 + "</li>";
            }else if (meas1 == null && ing1 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing1 + "</li>";
            }
            
            if (meas2 !== null && ing2 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas2 + " - " + ing2 + "</li>";
            }else if (meas2 == null && ing2 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing2 + "</li>";
            }
            
            if (meas3 !== null && ing3 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas3 + " - " + ing3 + "</li>";
            }else if (meas3 == null && ing3 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing3 + "</li>";
            }
            
            if (meas4 !== null && ing4 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas4 + " - " + ing4 + "</li>";
            }else if (meas4 == null && ing4 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing4 + "</li>";
            }
            
            if (meas5 !== null && ing5 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas5 + " - " + ing5 + "</li>";
            }else if (meas5 == null && ing5 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing5 + "</li>";
            }
            
            if (meas6 !== null && ing6 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas6 + " - " + ing6 + "</li>";
            }else if (meas6 == null && ing6 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing6 + "</li>";
            }
            
            if (meas7 !== null && ing7 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas7 + " - " + ing7 + "</li>";
            }else if (meas7 == null && ing7 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing7 + "</li>";
            }
            
            if (meas8 !== null && ing8 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas8 + " - " + ing8 + "</li>";
            }else if (meas8 == null && ing8 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing8 + "</li>";
            }
            
            if (meas9 !== null && ing9 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas9 + " - " + ing9 + "</li>";
            }else if (meas9 == null && ing9 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing9 + "</li>";
            }
            
            if (meas10 !== null && ing10 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas10 + " - " + ing10 + "</li>";
            }else if (meas10 == null && ing10 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing10 + "</li>";
            }
            
            if (meas11 !== null && ing11 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas11 + " - " + ing11 + "</li>";
            }else if (meas11 == null && ing11 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing11 + "</li>";
            }
            
            if (meas12 !== null && ing12 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas12 + " - " + ing12 + "</li>";
            }else if (meas12 == null && ing12 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing12 + "</li>";
            }
            
            if (meas13 !== null && ing13 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas13 + " - " + ing13 + "</li>";
            }else if (meas13 == null && ing13 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing13 + "</li>";
            }
            
            if (meas14 !== null && ing14 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas14 + " - " + ing14 + "</li>";
            }else if (meas14 == null && ing14 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing14 + "</li>";
            }
            
            if (meas15 !== null && ing5 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + meas15 + " - " + ing15 + "</li>";
            }else if (meas15 == null && ing15 !== null){
                ingredientListEl.innerHTML = ingredientListEl.innerHTML + '<li>' + ing15 + "</li>";
            }
                
            // this removes the recipe and source link from the DOM
            sourceLinkEl.innerHTML = '';
            recipeStepsEl.innerHTML = '';
        }
    });
}
