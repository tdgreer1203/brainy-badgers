const apiKey = "?apiKey=715f411199a4422e9982991f89fdb06a";

var titleEl = document.getElementById('title');
var imageEl = document.getElementById('image');
var ingredientListEl = document.getElementById('ingredient-list')
var recipeStepsEl = document.getElementById('recipe-steps');
var recipeSummaryEl = document.getElementById('recipe-summary');

var recipeId;
var recipeArray = [];
var ingredientNameArray = [];

function getRandomInt() {
    return Math.floor(Math.random() * 30);
}

// this function will generate a recipe on screen from the api call and the function will include title of dish,
//  an image of the dish, a link to the recipe website, adn the names of the ingredients for the recipe. 

function generateRecipe(query){
    $.ajax({
        url:"https://api.spoonacular.com/recipes/search" + apiKey + "&number=30&query="+ query,
        success: function(res){
            var randomIndex = getRandomInt();
            titleEl.innerHTML = res.results[randomIndex].title;
            imageEl.setAttribute('src',res.baseUri + res.results[randomIndex].image);
            recipeId = res.results[randomIndex].id 

            $.ajax({
                url:"https://api.spoonacular.com/recipes/" + recipeId + "/ingredientWidget.json" + apiKey,
                success: function(res){
                    ingredientListEl.innerHTML = ''
                    for (var i = 0; res.ingredients.length; i++) {
                        ingredientListEl.innerHTML = ingredientListEl.innerHTML + "<li>" + res.ingredients[i].name + "</li>";
                    }
                }
             });
             generateSummary();
             generateSteps();
        }  
    })            
}

function generateSummary() {
    var apiUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/summary" + apiKey;
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            return response.json().then(function(data) {
                recipeSummaryEl.innerHTML = data.summary;
            })
        } else {
            console.log(error);
        }
    }).catch(function(error) {
        console.log(error);
    });
}

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