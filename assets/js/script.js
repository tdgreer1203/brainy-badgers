// List of our API Keys for Spoonacular
// Theo API Key = ?apiKey=715f411199a4422e9982991f89fdb06a
// Jorge API Key = ?apiKey=d5f1707aa8a94f70a3fce40a554aebc6
// Jorge Second API Key = ?apiKey=2831de2f06594a778a430bad8ab00cba
// DJ API Key = ?apiKey=e70534b658a340b99af654cbac055309
// Joshua API Key = ?apiKey=9f08ff1455114bd9abf01292e7f973bc

//If 402 use different API Key

// Active Api Key
<<<<<<< HEAD
const apiKey = "?apiKey=9f08ff1455114bd9abf01292e7f973bc";
=======
const apiKey = "?apiKey=2831de2f06594a778a430bad8ab00cba";
>>>>>>> jorgedevelop

var titleEl = document.getElementById("title");
var imageEl = document.getElementById("image");
var ingredientListEl = document.getElementById("ingredient-list");
var recipeStepsEl = document.getElementById("recipe-steps");
var recipeSummaryEl = document.getElementById("recipe-summary");
var sourceLinkEl = document.getElementById("sourceLink");
var groceryListEl = document.getElementById("grocery-list");
var inputFieldEl = document.getElementById("search");

var runRec;
var runCockt;
var recipeId;
var recipeArray = [];
var ingredientArray = [];
var groceryList = [];

// generates a random integer for recipe or cocktail API call
function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

// this function will generate a recipe on screen from the api call and the function will include title of dish,
//  an image of the dish, and the names of the ingredients for the recipe, summary, and source link
function generateRecipe(query) {
    $.ajax({
    url:
      "https://api.spoonacular.com/recipes/complexSearch" +
      apiKey +
      "&number=30&query=" +
      query +
      "&addRecipeInformation=true",
    
      success: function (res) {
        var runRec = res.totalResults;

        // this will show an alert if the user input does not generate any results
      if (runRec === 0){
<<<<<<< HEAD
        window.alert("No recipe could be generated from your input. Please try again! Suggestions: Chicken, Cake, Appetizer." )
        
=======
        toggleModal();
>>>>>>> jorgedevelop
        // clears the input field
        inputFieldEl.value = '';
      } 
      
      // if the call produces totalResults > 0 this will run
      else if (runRec !== 0) {
      var randomRecNum = getRandomNum(30);
      titleEl.innerHTML = res.results[randomRecNum].title;
      imageEl.setAttribute("src", res.results[randomRecNum].image);
      recipeSummaryEl.innerHTML = res.results[randomRecNum].summary;
      sourceLinkEl.setAttribute(
        "href",
        res.results[randomRecNum].spoonacularSourceUrl
      );

      // links id from first api call to recipeID which will be added into URL for following calls
      recipeId = res.results[randomRecNum].id;

      // will call the ingredients url and then add those ingredients to the DOM

      $.ajax({
        url:
          "https://api.spoonacular.com/recipes/" +
          recipeId +
          "/ingredientWidget.json" +
          apiKey,
        success: function (res) {
          ingredientListEl.innerHTML = "";
          ingredientArray = [];
          for (var i = 0; res.ingredients.length; i++) {
            // creating a list element inside the unordered list and will loop until all ingredient names are listed in DOM
            ingredientListEl.innerHTML = ingredientListEl.innerHTML + "<li>" + res.ingredients[i].amount.us.value + " " + res.ingredients[i].amount.us.unit + " - " + res.ingredients[i].name + "</li>";
            // adding the ingredient list generated to the aary to later add to button
            ingredientArray = ingredientArray + "<li>" + res.ingredients[i].name + " </li>";
        }
        },
      });
      generateSteps();
      inputFieldEl.value = '';
     }
    }
  });
}

// displays the steps for the recipe to the DOM
function generateSteps() {
  // clears out previous steps
  recipeStepsEl.innerHTML = "";

  var apiUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/analyzedInstructions" + apiKey;
  fetch(apiUrl).then(function (response) {
      if (response.ok) {
        return response.json().then(function (data) {
          for (var i = 0; i < data[0].steps.length; i++) {
            recipeStepsEl.innerHTML = recipeStepsEl.innerHTML + "<li>" + data[0].steps[i].step + "</li>";
          }
        });
      } else {
        console.log(error);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

// this function will generate a cocktail to the DOM including name, image, instructions, and ingredients
function generateCocktail(query) {
  // this call will generate the cocktail name and image to the DOM
  $.ajax({
    url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + query,

    success: function (res) {
      var runCockt = res.drinks;

      if (runCockt === null) {
<<<<<<< HEAD
        window.alert("No cocktail could be generated from your input. Please try again! Suggestions: Gin, Vodka, Rum.")

=======
        toggleModal();
>>>>>>> jorgedevelop
        inputFieldEl.value = '';
      }


      else if (runCockt !== null) {
        var randomCocktNum = getRandomNum(10);

        // this will add the drink name,drink image, and the instructions to the DOM
        titleEl.innerHTML = res.drinks[randomCocktNum].strDrink;
        imageEl.setAttribute("src", res.drinks[randomCocktNum].strDrinkThumb);
        recipeSummaryEl.innerHTML = res.drinks[randomCocktNum].strInstructions;

        // Clears ingredients list in case multiple searches
        ingredientListEl.innerHTML = "";
        ingredientArray = [];

        // For loop to print ingredients and servings of each. The eval method evaluates any string as if you were coding it as regular code
        for (var i = 1; i < 16; i++) {
            var drinkMeasure = eval(
            "res.drinks[" +
                randomCocktNum.toString() +
                "].strMeasure" +
                i.toString()
            );
            var drinkIngredient = eval(
            "res.drinks[" +
                randomCocktNum.toString() +
                "].strIngredient" +
                i.toString()
            );

            if (drinkMeasure !== null && drinkIngredient !== null) {
            ingredientListEl.innerHTML = ingredientListEl.innerHTML + "<li>" + drinkMeasure + " - " + drinkIngredient + "</li>";
            ingredientArray = ingredientArray +  "<li>" + drinkIngredient + "</li>"
            } else if (drinkMeasure == "null" && drinkIngredient !== "null") {
            ingredientListEl.innerHTML = ingredientListEl.innerHTML + "<li>" + drinkIngredient + "</li>";
            ingredientArray = ingredientArray +  "<li>" + drinkIngredient + "</li>"
            } else if (drinkMeasure !== "null" && drinkIngredient == "null") {
            ingredientListEl.innerHTML = ingredientListEl.innerHTML + "<li>" + drinkMeasure + "</li>";
            ingredientArray = ingredientArray +  "<li>" + drinkIngredient + "</li>"
            }
        }

        // this removes the recipe and source link from the DOM
        sourceLinkEl.innerHTML = "";
        recipeStepsEl.innerHTML = "";
        inputFieldEl.value = "";
     }
    },
  });
}
//  if you dbl click on the ingredient 
ingredientListEl.addEventListener('dblclick', function(event) {
  var focusedIngredient = event.target.innerHTML;
  focusedIngredient = focusedIngredient.substring(focusedIngredient.indexOf('-') + 1).trim();
  groceryListEl.innerHTML = groceryListEl.innerHTML + '<li>' + focusedIngredient + '</li>';
});

//  if double click from grocery list it deletes the ingredient
groceryListEl.addEventListener('dblclick', function(event) {
    event.target.remove();
    localStorage.removeItem("name")
  });

// this will add all the ingredients to the grocery list section
<<<<<<< HEAD
function addToList() {
=======
function addToList(event) {
>>>>>>> jorgedevelop
    groceryListEl.innerHTML = groceryListEl.innerHTML + ingredientArray;
}


<<<<<<< HEAD
=======


>>>>>>> jorgedevelop
// this is connected to the save button in HTML and will save the ingredients on grocery list to local storage 
function saveList() {
    localStorage.setItem("ingredient", JSON.stringify(groceryListEl.innerHTML));  

}

// linked to delete list button and will clear the grocery list
function deleteList() {
    groceryListEl.innerHTML= '';
    localStorage.clear();
}

function printPageArea() {
    var printSection = document.getElementById('grocery-list');
    var windPrint = window.open('', '', 'width=900,height=650');
    windPrint.document.write(printSection.innerHTML);
    windPrint.document.close();
    windPrint.focus();
    windPrint.print();
    windPrint.close();
}

// this will load the ingredients in local storage 
function loadList() {
    groceryListEl.innerHTML = JSON.parse(localStorage.getItem("ingredient"));
}

<<<<<<< HEAD
=======
// reads modal information
$(document).ready(function(){
    $('.modal').modal();
})

// when called will display modal to DOM
function toggleModal(){
    var instance= M.Modal.getInstance($('#modal1'))
    instance.open();
}

>>>>>>> jorgedevelop
// will be called when page loads
loadList();