// https://api.spoonacular.com/recipes/637876/ingredientWidget.json?apiKey=d5f1707aa8a94f70a3fce40a554aebc6
// Array so that the recipe button generates a random recipe from the array, still work in progress
var recipeArray = [];
var randomRecipe = recipeArray[Math.floor(Math.random() * recipeArray.length)];

// generates a random integer for the array
function getRandomInt() {
    return Math.floor(Math.random() * 30);
}

// this function will generate a recipe on screen from the api call and the function will include title of dish, an image of the dish and the link to the recipe
function generateRecipe(query){
    
    $.ajax({
        url:"https://api.spoonacular.com/recipes/search?apiKey=d5f1707aa8a94f70a3fce40a554aebc6&number=30&query="+ query,
        success: function(res){
            var randomIndex = getRandomInt();
            recipeArray = res.results
            document.getElementById("recipeCall").innerHTML = "<h3>" + res.results[randomIndex].title + "</h3><br><img src='" + res.baseUri + res.results[randomIndex].image + "'width='300'/><br>";
            document.getElementById("recipeLink").setAttribute("href", res.results[randomIndex].sourceUrl); 
            var getRecipeId = res.results[randomIndex].id;
            console.log(getRecipeId);
          
             
            
            // url:"https://api.spoonacular.com/recipes/" + getRecipeId + "/ingredientWidget.json?apiKey=d5f1707aa8a94f70a3fce40a554aebc6",
            // success: function(res){
                // document.getElementById("ingredientsCall").innerHTML = "<h3>Ingredients:</h3><br>" + res.ingredients.name;
            // }
        }

       
    });

    // $.ajax({
    //     url:"https://api.spoonacular.com/recipes/" + getRecipeId + "/ingredientWidget.json?apiKey=d5f1707aa8a94f70a3fce40a554aebc6",
    //     success: function(res){
    //         document.getElementById("ingredientsCall").innerHTML = "<h3>Ingredients:</h3><br>" + res.ingredients.name;
    //     }
    // });