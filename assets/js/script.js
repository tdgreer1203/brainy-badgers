/*
  715f411199a4422e9982991f89fdb06a
  d5f1707aa8a94f70a3fce40a554aebc6
  2831de2f06594a778a430bad8ab00cba
  e70534b658a340b99af654cbac055309
  9f08ff1455114bd9abf01292e7f973bc
*/

const apiKey = "apiKey=2831de2f06594a778a430bad8ab00cba";

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

var ingredientList = [];
var groceryList = [];
var stepsList = [];

function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

function analyzeInput() {
  ingredientList = [];
  stepList = [];
  titleEl.textContent = "";
  imageEl.src = "";
  recipeSummaryEl.textContent = "";
  ingredientListEl.innerHTML = "";
  recipeStepsEl.innerHTML = "";

  var searchTerm = searchInputEl.value.trim();
  if(!searchTerm) {
    showModal("Please enter an ingredient!", "");
  } else {
    return searchTerm;
  }
  searchInputEl.value = "";
}

recipeBtn.addEventListener('click', function() {
  var query = analyzeInput();
  getRecipe(query);
})

modalClose.addEventListener('click', function() {
  closeModal();
});

cocktailBtn.addEventListener('click', function() {
  var query = analyzeInput();
  getCocktail(query);
})

function getRecipe(query) {
  var apiUrl = "https://api.spoonacular.com/recipes/random?number=20&tags=" + query + "&" + apiKey;
  fetch(apiUrl).then(function (response) {
      if (response.ok) {
        return response.json().then(function(data) {
          var recipeNumber = getRandomNum(data.recipes.length);
          imageEl.src = data.recipes[recipeNumber].image;
          titleEl.innerText = data.recipes[recipeNumber].title;
          recipeSummaryEl.innerHTML = data.recipes[recipeNumber].summary;
          for(var i = 0; i < data.recipes[recipeNumber].extendedIngredients.length; i++) {
            var ingredient = {
              id: data.recipes[recipeNumber].extendedIngredients[i].id,
              image: data.recipes[recipeNumber].extendedIngredients[i].image,
              name: data.recipes[recipeNumber].extendedIngredients[i].nameClean,
              amount: data.recipes[recipeNumber].extendedIngredients[i].amount,
              unit: data.recipes[recipeNumber].extendedIngredients[i].unit
            }
            ingredientList.push(ingredient);
          } 
          for(var i = 0; i < data.recipes[recipeNumber].analyzedInstructions.length; i++) {
            for(var x = 0; x < data.recipes[recipeNumber].analyzedInstructions[i].steps.length; x++) {
              stepsList.push(data.recipes[recipeNumber].analyzedInstructions[i].steps[x].step);
            }
          }
          populateIngredients();
          populateSteps();
        });
      } else {
        showModal("Umm...that search term didn't return any recipes. Please try again.", "");
      }
    }).catch(function (error) {
      showModal("Yikes! Not sure what's going on, but there was a problem with the request.", error);
    });
}

function populateIngredients() {
  for(var i = 0; i < ingredientList.length; i++) {
    var li = document.createElement('li');
    var span = document.createElement('span');
    li.textContent = ingredientList[i].name;
    span.textContent = "(" + ingredientList[i].amount;
    if(ingredientList[i].unit) {
      span.textContent = span.textContent + " - " + ingredientList[i].unit + ")";
    } else {
      span.textContent = span.textContent + ")";
    }
    li.appendChild(span);
    ingredientListEl.appendChild(li);
  }
} 

function populateSteps() {
  for(var i = 0; i < stepsList.length; i++) {
    var li = document.createElement('li');
    li.textContent = stepsList[i];
    recipeStepsEl.appendChild(li);
  }
}

function getCocktail(query) {
  var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + query;
  fetch(apiUrl).then(function (response) {
      if (response.ok) {
        return response.json().then(function(data) {
          var recipeNumber = getRandomNum(data.drinks.length);
          imageEl.src = data.drinks[recipeNumber].strDrinkThumb;
          titleEl.innerText = data.drinks[recipeNumber].strDrink;
          recipeSummaryEl.innerHTML = data.drinks[recipeNumber].strInstructions;
          for(var i = 0; i < 16; i++) {
            var drinkMeasure = eval("data.drinks[" + recipeNumber.toString() + "].strMeasure" + i.toString() );
            var drinkIngredient = eval("res.drinks[" + recipeNumber.toString() + "].strIngredient" + i.toString());
          }
        }); 
      } else {
        showModal("Yikes! Not sure what's going on, but there was a problem with the request.", "");
      }
  }).catch(function (error) {
      showModal("Umm...that search term didn't return any recipes. Please try again.", error);
    });
}

function generateCocktail(query) {


        for (var i = 1; i < 16; i++) {
            

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
  customMessageEl.textContent = message;
  errorMessageEl.innerHTML = error;
  myModal.style.display = "block";
}

function closeModal() {
  myModal.style.display = "none";
}

loadList();