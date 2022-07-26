/*
  715f411199a4422e9982991f89fdb06a
  d5f1707aa8a94f70a3fce40a554aebc6
  2831de2f06594a778a430bad8ab00cba
  e70534b658a340b99af654cbac055309
  9f08ff1455114bd9abf01292e7f973bc
*/

const apiKey = "?apiKey=2831de2f06594a778a430bad8ab00cba";

var titleEl = document.getElementById("recipe-title");
var imageEl = document.getElementById("recipe-image");
var recipeStepsEl = document.getElementById("recipe-steps");

var recipeSummaryEl = document.getElementById("recipe-summary");
var ingredientListEl = document.getElementById("ingredient-list");
var groceryListEl = document.getElementById("grocery-list");

var searchInputEl = document.getElementById("search-input");
var recipeBtn = document.getElementById("recipe-btn");
var cocktailBtn = document.getElementById("cocktail-btn");
var addAllBtn = document.getElementById("add-all-btn");
var saveBtn = document.getElementById("save-btn");
var deleteBtn = document.getElementById("delete-btn");
var printBtn = document.getElementById("print-btn");

var myModal = document.getElementById("modal");
var modalClose = document.getElementById("modal-close");
var customMessageEl = document.getElementById("custom-message");
var errorMessageEl = document.getElementById("error-message");

var ingredientId;
var recipeId;
var ingredientList = [];
var groceryList = [];

function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

searchInputEl.addEventListener('input', function(){
  console.log(searchInputEl.value);
});

recipeBtn.addEventListener('click', function() {

})

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

      if (runRec === 0){
        toggleModal();
        inputFieldEl.value = '';
      } 
      
      else if (runRec !== 0) {
      var randomRecNum = getRandomNum(30);
      titleEl.innerHTML = res.results[randomRecNum].title;
      imageEl.setAttribute("src", res.results[randomRecNum].image);
      recipeSummaryEl.innerHTML = res.results[randomRecNum].summary;
      sourceLinkEl.setAttribute(
        "href",
        res.results[randomRecNum].spoonacularSourceUrl
      );

      recipeId = res.results[randomRecNum].id;

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
            ingredientListEl.innerHTML = ingredientListEl.innerHTML + "<li>" + res.ingredients[i].amount.us.value + " " + res.ingredients[i].amount.us.unit + " - " + res.ingredients[i].name + "</li>";

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

function generateSteps() {
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

function generateCocktail(query) {
  $.ajax({
    url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + query,

    success: function (res) {
      var runCockt = res.drinks;

      if (runCockt === null) {
        toggleModal();
        inputFieldEl.value = '';
      }


      else if (runCockt !== null) {
        var randomCocktNum = getRandomNum(10);

        titleEl.innerHTML = res.drinks[randomCocktNum].strDrink;
        imageEl.setAttribute("src", res.drinks[randomCocktNum].strDrinkThumb);
        recipeSummaryEl.innerHTML = res.drinks[randomCocktNum].strInstructions;

        ingredientListEl.innerHTML = "";
        ingredientArray = [];

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

        sourceLinkEl.innerHTML = "";
        recipeStepsEl.innerHTML = "";
        inputFieldEl.value = "";
     }
    },
  });
}

ingredientListEl.addEventListener('dblclick', function(event) {
  var focusedIngredient = event.target.innerHTML;
  focusedIngredient = focusedIngredient.substring(focusedIngredient.indexOf('-') + 1).trim();
  groceryListEl.innerHTML = groceryListEl.innerHTML + '<li>' + focusedIngredient + '</li>';
});

groceryListEl.addEventListener('dblclick', function(event) {
    event.target.remove();
    localStorage.removeItem("name")
  });

function addToList(event) {
    groceryListEl.innerHTML = groceryListEl.innerHTML + ingredientArray;
}

function saveList() {
    localStorage.setItem("ingredient", JSON.stringify(groceryListEl.innerHTML));  

}

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

function loadList() {
    groceryListEl.innerHTML = JSON.parse(localStorage.getItem("ingredient"));
}

$(document).ready(function(){
    $('.modal').modal();
})

function toggleModal(){
    var instance= M.Modal.getInstance($('#modal1'))
    instance.open();
}

function showModal(message, error) {
  customMessageEl.innerHTML = message;
  errorMessageEl.innerHTML = error;
  myModal.style.display = "block";
}

function closeModal() {
  myModal.style.display = "none";
}

loadList();