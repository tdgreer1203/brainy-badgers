// List of our API Keys for Spoonacular 
// Theo API Key = ?apiKey=715f411199a4422e9982991f89fdb06a
// Jorge API Key = ?apiKey=d5f1707aa8a94f70a3fce40a554aebc6
// Jorge Second API Key = ?apiKey=2831de2f06594a778a430bad8ab00cba
// DJ API Key = ?apiKey=e70534b658a340b99af654cbac055309


// Active Api Key
const apiKey = "?apiKey=715f411199a4422e9982991f89fdb06a";



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

<<<<<<< HEAD
// generates a random integer for cocktail API call
function getRandomCockt() {
    return Math.floor(Math.random() * 10);
}

// this function will generate a recipe on screen from the api call and the function will include title of dish,
//  an image of the dish, and the names of the ingredients for the recipe, summary, and source link
=======
>>>>>>> 9da869b9024587a8196fe1098562bfef8fb54f99
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
<<<<<<< HEAD
                        // creating a list element inside the unordered list and will loop until all ingredient names are listed in DOM
                        ingredientListEl.innerHTML = ingredientListEl.innerHTML + "<li>" + res.ingredients[i].amount.us.value 
                        + " " + res.ingredients[i].amount.us.unit + " - " + res.ingredients[i].name + "</li>";
                    }
                }
             });
            
=======
                        ingredientListEl.innerHTML = ingredientListEl.innerHTML + "<li>" + res.ingredients[i].name + "</li>";
                        var ingredient = {
                            name: res.ingredients[i].name,
                            image: res.ingredients[i].image,
                            unit: res.ingredients[i].amount.us.unit,
                            value: res.ingredients[i].amount.us.value
                        }
                        ingredientArray.push(ingredient);
                    }
                }
             });
             generateSummary();
>>>>>>> 9da869b9024587a8196fe1098562bfef8fb54f99
             generateSteps();
        }  
    })            
}

<<<<<<< HEAD
function generateSteps() {
    // clears out previous steps
    recipeStepsEl.innerHTML = '';
    
    var apiUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/analyzedInstructions" + apiKey;
=======
function generateSummary() {
    var apiUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/summary" + apiKey;
>>>>>>> 9da869b9024587a8196fe1098562bfef8fb54f99
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

<<<<<<< HEAD
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

            // this will add the ingredients to the list
            ingredientListEl.innerHTML ='<li>' + res.drinks[randomCocktNum].strMeasure1 + " - " + res.drinks[randomCocktNum].strIngredient1 + '</li>' + '<li>' + res.drinks[randomCocktNum].strMeasure2 + " - " + res.drinks[randomCocktNum].strIngredient2 + '</li>'
            + '<li>' + res.drinks[randomCocktNum].strMeasure3 + " - " + res.drinks[randomCocktNum].strIngredient3 + '</li>' + '<li>' + res.drinks[randomCocktNum].strMeasure4 + " - " + res.drinks[randomCocktNum].strIngredient4 + '</li>' 
            + '<li>' + res.drinks[randomCocktNum].strMeasure5 + " - " + res.drinks[randomCocktNum].strIngredient5 + '</li>' + '<li>' + res.drinks[randomCocktNum].strMeasure6 + " - " + res.drinks[randomCocktNum].strIngredient6 + '</li>'
            + '<li>' + res.drinks[randomCocktNum].strMeasure7 + " - " + res.drinks[randomCocktNum].strIngredient7 + '</li>' + '<li>' + res.drinks[randomCocktNum].strMeasure8 + " - " + res.drinks[randomCocktNum].strIngredient8 + '</li>'
            + '<li>' + res.drinks[randomCocktNum].strMeasure9 + " - " + res.drinks[randomCocktNum].strIngredient9 + '</li>' + '<li>' + res.drinks[randomCocktNum].strMeasure10 + " - " + res.drinks[randomCocktNum].strIngredient10 + '</li>'
            + '<li>' + res.drinks[randomCocktNum].strMeasure11 + " - " + res.drinks[randomCocktNum].strIngredient11 + '</li>' + '<li>' + res.drinks[randomCocktNum].strMeasure12 + " - " + res.drinks[randomCocktNum].strIngredient12 + '</li>'
            + '<li>' + res.drinks[randomCocktNum].strMeasure13 + " - " + res.drinks[randomCocktNum].strIngredient13 + '</li>' + '<li>' + res.drinks[randomCocktNum].strMeasure14 + " - " + res.drinks[randomCocktNum].strIngredient14 + '</li>'
            + '<li>' + res.drinks[randomCocktNum].strMeasure15 + " - " + res.drinks[randomCocktNum].strIngredient15 + '</li>';
            
            sourceLinkEl.innerHTML = '';
            recipeStepsEl.innerHTML = '';
        }
    });
}
=======
function generateSteps() {
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
>>>>>>> 9da869b9024587a8196fe1098562bfef8fb54f99
