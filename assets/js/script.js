
var recipeTitleEl = document.getElementById('recipe-title');
var recipeImageEl = document.getElementById('recipe-image');
var ingredientListEl = document.getElementById('ingredient-list')
// Place your API Keys here

<<<<<<< HEAD
// spponacular API Keys:
var jorgeApi = '?apiKey=d5f1707aa8a94f70a3fce40a554aebc6';
var jorgeApi2 = '?apiKey=2831de2f06594a778a430bad8ab00cba';
var joshuaApi = '';
var djApi = '';
var joshuaApi = '';

// Cocktail API Keys, since we are in a test environment for bootcamp project we will be use text apiKey = 1
=======
// Active Api Key
const apiKey = "?apiKey=d5f1707aa8a94f70a3fce40a554aebc6";
>>>>>>> 9c43e6f987883fbcada677eaad400aaee47e139d



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

<<<<<<< HEAD
function getRandomCoc() {
=======
// generates a random integer for cocktail API call
function getRandomCockt() {
>>>>>>> 9c43e6f987883fbcada677eaad400aaee47e139d
    return Math.floor(Math.random() * 10);
}

// this function will generate a recipe on screen from the api call and the function will include title of dish,
<<<<<<< HEAD
//  an image of the dish, and the names of the ingredients for the recipe. 
=======
//  an image of the dish, and the names of the ingredients for the recipe, summary, and source link
>>>>>>> 9c43e6f987883fbcada677eaad400aaee47e139d
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
<<<<<<< HEAD
                        ingredientListEl.innerHTML = ingredientListEl.innerHTML + "<li>" + res.ingredients[i].name + "</li>"
                    }
                }
             });
=======
                        // creating a list element inside the unordered list and will loop until all ingredient names are listed in DOM
                        ingredientListEl.innerHTML = ingredientListEl.innerHTML + "<li>" + res.ingredients[i].amount.us.value 
                        + " " + res.ingredients[i].amount.us.unit + " - " + res.ingredients[i].name + "</li>";
                    }
                }
             });
            
             generateSteps();
>>>>>>> 9c43e6f987883fbcada677eaad400aaee47e139d
        }  
    })   

<<<<<<< HEAD
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
=======
function generateSteps() {
    // clears out previous steps
    recipeStepsEl.innerHTML = '';
    
    var apiUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/analyzedInstructions" + apiKey;
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            return response.json().then(function(data) {
                for(var i = 0; i<data[0].steps.length; i++) {
                    recipeStepsEl.innerHTML = recipeStepsEl.innerHTML + "<li>" + data[0].steps[i].step + "</li>";
>>>>>>> 9c43e6f987883fbcada677eaad400aaee47e139d
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

<<<<<<< HEAD
=======
// this function will generate a cocktail to the DOM including name, image, instructions, and ingredients
>>>>>>> 9c43e6f987883fbcada677eaad400aaee47e139d
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

<<<<<<< HEAD
            
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
=======

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
>>>>>>> 9c43e6f987883fbcada677eaad400aaee47e139d
