
// Array so that the recipe button generates a random recipe from the array, still work in progress
var recipeArray = [];
var randomRecipe = recipeArray[Math.floor(Math.random() * recipeArray.length)];

// this function will generate a recipe on screen from the api call and the function will include title of dish, an image of the dish and the link to the recipe
function generateRecipe(query){
    
    $.ajax({
        url:"https://api.spoonacular.com/recipes/search?apiKey=d5f1707aa8a94f70a3fce40a554aebc6&number=50&query="+query,
        success: function(res){
            document.getElementById("recipeCall").innerHTML = "<h3>" + res.results[0].title + "</h3><br><img src='" + res.baseUri + res.results[0].image + "'width='300'/><br>" + "Go to recipe: ";
            document.getElementById("recipeLink").innerHTML = res.results[0].sourceUrl;  
        }
    });
}

