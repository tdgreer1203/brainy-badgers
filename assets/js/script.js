
var recipeTitleEl = document.getElementById('recipe-title');
var recipeImageEl = document.getElementById('recipe-image');
var ingredientListEl = document.getElementById('ingredient-list')
// Place your API Keys here

// spponacular API Keys:
var jorgeApi = '?apiKey=d5f1707aa8a94f70a3fce40a554aebc6';
var jorgeApi2 = '?apiKey=2831de2f06594a778a430bad8ab00cba';
var joshuaApi = '';
var djApi = '';
var joshuaApi = '';

// Cocktail API Keys, since we are in a test environment for bootcamp project we will be use text apiKey = 1



// Vars to connect to HTML
var titleEl = document.getElementById('title');
var imageEl = document.getElementById('image');
var ingredientListEl = document.getElementById('ingredient-list');
var summaryEl = document.getElementById('summary');
var instructionsEl = document.getElementById('instructions');
var sourceLinkEl = document.getElementById('sourceLink');
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
    return Math.floor(Math.random() * 10);
}

// this function will generate a recipe on screen from the api call and the function will include title of dish,
//  an image of the dish, and the names of the ingredients for the recipe. 
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

        $.ajax({
        url:"https://api.spoonacular.com/recipes/search" + jorgeApi2 + "&number=30&query="+ query,
        success: function(res){  //res is short of response
            var randomRecNumber = getRandomRec();
            titleEl.innerHTML = res.results[randomRecNumber].title;
            imageEl.setAttribute('src',res.baseUri + res.results[randomRecNumber].image);
            sourceLinkEl.setAttribute("href", res.results[randomRecNumber].sourceUrl);
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

            // //  and step by step instructions, using recipe Id
            // $.ajax({
            //     url: "https://api.spoonacular.com/recipes/" + recipeId + "/analyzedInstructions" + jorgeApi2,
            //     success: function(res){
            //         // instructionsEl.innerHTML = ''
            //         // for (var i = 0; res.steps.length; i++){
            //             // creating a list element inside of the ordered list and will loop until all steps are listed in the DOM
            //             // instructionsEl.innerHTML = instructionsEl.innerHTML + "<li>" + res.steps[i].step + "</li>";
            //             instructionsEl.innerHTML =res[0].steps.step
            //         // }
            //     }
            // });

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

            // this will add the drink name,drink image, and the instructions to the DOM
            titleEl.innerHTML = res.drinks[randomCocNumber].strDrink;
            imageEl.setAttribute('src', res.drinks[randomCocNumber].strDrinkThumb);
            summaryEl.innerHTML = res.drinks[randomCocNumber].strInstructions;

            
            ingredientListEl.innerHTML ='<li>' + res.drinks[randomCocNumber].strMeasure1 + " - " + res.drinks[randomCocNumber].strIngredient1 + '</li>' + '<li>' + res.drinks[randomCocNumber].strMeasure2 + " - " + res.drinks[randomCocNumber].strIngredient2 + '</li>'
            + '<li>' + res.drinks[randomCocNumber].strMeasure3 + " - " + res.drinks[randomCocNumber].strIngredient3 + '</li>' + '<li>' + res.drinks[randomCocNumber].strMeasure4 + " - " + res.drinks[randomCocNumber].strIngredient4 + '</li>' 
            + '<li>' + res.drinks[randomCocNumber].strMeasure5 + " - " + res.drinks[randomCocNumber].strIngredient5 + '</li>' + '<li>' + res.drinks[randomCocNumber].strMeasure6 + " - " + res.drinks[randomCocNumber].strIngredient6 + '</li>'
            + '<li>' + res.drinks[randomCocNumber].strMeasure7 + " - " + res.drinks[randomCocNumber].strIngredient7 + '</li>' + '<li>' + res.drinks[randomCocNumber].strMeasure8 + " - " + res.drinks[randomCocNumber].strIngredient8 + '</li>'
            + '<li>' + res.drinks[randomCocNumber].strMeasure9 + " - " + res.drinks[randomCocNumber].strIngredient9 + '</li>' + '<li>' + res.drinks[randomCocNumber].strMeasure10 + " - " + res.drinks[randomCocNumber].strIngredient10 + '</li>'
            + '<li>' + res.drinks[randomCocNumber].strMeasure11 + " - " + res.drinks[randomCocNumber].strIngredient11 + '</li>' + '<li>' + res.drinks[randomCocNumber].strMeasure12 + " - " + res.drinks[randomCocNumber].strIngredient12 + '</li>'
            + '<li>' + res.drinks[randomCocNumber].strMeasure13 + " - " + res.drinks[randomCocNumber].strIngredient13 + '</li>' + '<li>' + res.drinks[randomCocNumber].strMeasure14 + " - " + res.drinks[randomCocNumber].strIngredient14 + '</li>'
            + '<li>' + res.drinks[randomCocNumber].strMeasure15 + " - " + res.drinks[randomCocNumber].strIngredient15 + '</li>';
        
        }
    });






    // Comment below pasted by DJ..possible solutions for "null" displaying on HTML page 7/22
    //if instead a If/Then statement or Math.max.apply method may return back only the objects we need for ingredients instead of null
    //have a few methods that we can try below
    // Instead of returning null when the argument is missing, you could either return a default object:

    //             function greetObject(who) {
    //             if (!who) {
    //                 who = 'Stranger';
    //             }
    //             return { message: `Hello, ${who}!` };
    //             }
    //             greetObject('Eric'); // => { message: 'Hello, Eric!' }
    //             greetObject();       // => { message: 'Hello, Stranger!' }
    //             }


            //     Your first call to document.write clears the document, so there is no element to find.

            //     Either read the value before calling document.write:
            //     function clicked()
            //     {
            //         var a = document.getElementById("number").value;
            //         document.write("submit clicked");
            //         document.write(a);
            //     }
            //     or display the output in some other way - eg: in the developer console[^]:
            //     function clicked()
            //     {
            //         console.log("submit clicked");
            //         var a = document.getElementById("number").value;
            //         console.log(a);
            //     }
            // 
}