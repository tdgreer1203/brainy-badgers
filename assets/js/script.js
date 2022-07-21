
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
            recipeArray = res.results
            document.getElementById("recipeCall").innerHTML = "<h3>" + res.results[randomIndex].title + "</h3><br><img src='" + res.baseUri + res.results[randomIndex].image + "'width='300'/>";
            
            // setting href attribute to recipeLink id so that it will take yser to recipe website
            document.getElementById("recipeLink").setAttribute("href", res.results[randomIndex].sourceUrl); 
            
            // this variable will be used in the following call to link ingredients to the random recipe that was generated 
            var getRecipeId = res.results[randomIndex].id;
            console.log(getRecipeId);

            //for loop to display ingredients into DOM-----DJ
            //We are going to need to create either "li/ul/ol" elements or display elements in an image
            for (var i = 0; ingredientNameArray.length; i++) {
                var ingredientText = ingredientNameArray[i];
            }

            // calling the ingredients to the DOM
            // i think the loop should go here, currently I have it set to call the first name in the array, but would want to 
            // loop the entire array to display all ingredient. Created array updtop called ingredientNameArray
            $.ajax({
                url:"https://api.spoonacular.com/recipes/" + getRecipeId + "/ingredientWidget.json?apiKey=d5f1707aa8a94f70a3fce40a554aebc6",
                success: function(res){
                    document.getElementById("ingredientsCall").innerHTML = "<h3>Ingredients:</h3><br>" + res.ingredients[0].name;
                }
            });

        }  
    });
}