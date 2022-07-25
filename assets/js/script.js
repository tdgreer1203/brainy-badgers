// List of our API Keys for Spoonacular
// Theo API Key = ?apiKey=715f411199a4422e9982991f89fdb06a
// Jorge API Key = ?apiKey=d5f1707aa8a94f70a3fce40a554aebc6
// Jorge Second API Key = ?apiKey=2831de2f06594a778a430bad8ab00cba
// DJ API Key = ?apiKey=e70534b658a340b99af654cbac055309
// Joshua API Key = ?apiKey=9f08ff1455114bd9abf01292e7f973bc

//If 402 use different API Key

// Active Api Key
const apiKey = "?apiKey=9f08ff1455114bd9abf01292e7f973bc";

let titleEl = document.getElementById("title");
let imageEl = document.getElementById("image");
let ingredientListEl = document.getElementById("ingredient-list");
let recipeStepsEl = document.getElementById("recipe-steps");
let recipeSummaryEl = document.getElementById("recipe-summary");
let sourceLinkEl = document.getElementById("sourceLink");
let groceryListEl = document.getElementById("grocery-list");
let inputFieldEl = document.getElementById("search");
let myModal = document.getElementById("modal");
let modalClose = document.getElementById("modal-close");
let customMessageEl = document.getElementById("custom-message");
let errorMessageEl = document.getElementById("error-message");


let recipeId;
let recipeArray = [];
let ingredientArray = [];
let groceryList = [];

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
        let runRec = res.totalResults;

        // this will show an alert if the user input does not generate any results
      if (runRec === 0){
        window.alert("No recipe could be generated from your input. Please try again! Suggestions: Chicken, Cake, Appetizer." )
        
        // clears the input field
        inputFieldEl.value = '';
      } 
      
      // if the call produces totalResults > 0 this will run
      else if (runRec !== 0) {
      let randomRecNum = getRandomNum(30);
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
          for (let i = 0; res.ingredients.length; i++) {
            // creating a list element inside the unordered list and will loop until all ingredient names are listed in DOM
            ingredientListEl.innerHTML = ingredientListEl.innerHTML + "<li>" + res.ingredients[i].amount.us.value + " " + res.ingredients[i].amount.us.unit + " - " + res.ingredients[i].name + "</li>";
            // adding the ingredient list generated to the aary to later add to button
            ingredientArray = ingredientArray + "<li>" + res.ingredients[i].name + " </li>";
        }
        },
        error: function(res) {
            if(titleEl.innerHTML = res.results[randomRecNum].title = '')
            alert("Not a Valid Response")
        }
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

  let apiUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/analyzedInstructions" + apiKey;
  fetch(apiUrl).then(function (response) {
      if (response.ok) {
        return response.json().then(function (data) {
          for (let i = 0; i < data[0].steps.length; i++) {
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
      let runCockt = res.drinks;

      if (runCockt === null) {
        window.alert("No cocktail could be generated from your input. Please try again! Suggestions: Gin, Vodka, Rum.")

        inputFieldEl.value = '';
      }


      else if (runCockt !== null) {
        let randomCocktNum = getRandomNum(10);

        // this will add the drink name,drink image, and the instructions to the DOM
        titleEl.innerHTML = res.drinks[randomCocktNum].strDrink;
        imageEl.setAttribute("src", res.drinks[randomCocktNum].strDrinkThumb);
        recipeSummaryEl.innerHTML = res.drinks[randomCocktNum].strInstructions;

        // Clears ingredients list in case multiple searches
        ingredientListEl.innerHTML = "";
        ingredientArray = [];

        // For loop to print ingredients and servings of each. The eval method evaluates any string as if you were coding it as regular code
        for (let i = 1; i < 16; i++) {
            let drinkMeasure = eval(
            "res.drinks[" +
                randomCocktNum.toString() +
                "].strMeasure" +
                i.toString()
            );
            let drinkIngredient = eval(
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

  // Used with jQuery first part of the function initializes modal with button trigger from HTML

//   $(document).ready(function(){
//     $('.modal').modal();
//     let instance = M.Modal.getInstance('#modal1');
//     instance.open()
//   });
  // getInstance() is called factory method. It is used for singleton class creation. 
  // That means only one instance of that class will be created and others will get reference of that class


        

//  if you dbl click on the ingredient 
ingredientListEl.addEventListener('dblclick', function(event) {
  let focusedIngredient = event.target.innerHTML;
  focusedIngredient = focusedIngredient.substring(focusedIngredient.indexOf('-') + 1).trim();
  groceryListEl.innerHTML = groceryListEl.innerHTML + '<li>' + focusedIngredient + '</li>';
});

//  if double click from grocery list it deletes the ingredient
groceryListEl.addEventListener('dblclick', function(event) {
    event.target.remove();
    localStorage.removeItem("name")
  });

// this will add all the ingredients to the grocery list section
function addToList() {
    groceryListEl.innerHTML = groceryListEl.innerHTML + ingredientArray;
}


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
    let printSection = document.getElementById('grocery-list');
    let windPrint = window.open('', '', 'width=900,height=650');
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

// initializes modal with JQuery
// $(document).ready(function(){
    
//     // Here specify your content or message, enclose between <p>
//     let content = '<div class="modal-content"><p>my content</p></div>';
    
//     $('.modal').append(content);
//     $('.modal').modal();
// });

$(document).ready(function(){
    $('#modal').modal();
    $('#modal').modal('open'); 
 });




// reads modal information
$(document).ready(function(){
    $('.modal').modal();
})

// when called will display modal to DOM
function toggleModal(){
    var instance= M.Modal.getInstance($('#modal1'))
    instance.open();
}

// will be called when page loads
loadList();

function showModal(message, error) {
    customMessageEl.innerHTML = message;
    errorMessageEl.innerHTML = error;
    myModal.style.display = "block";
  }
  
  function closeModal() {
    $.modal.close("")  }