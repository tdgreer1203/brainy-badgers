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
var cocktailSummaryEl = document.getElementById("cocktail-summary");
var ingredientListEl = document.getElementById("ingredient-list");
var groceryListEl = document.getElementById("grocery-list");

var searchInputEl = document.getElementById("search-input");
var recipeBtn = document.getElementById("recipe-btn");
var cocktailBtn = document.getElementById("cocktail-btn");
var addAllBtn = document.getElementById("add-all-btn");
var saveBtn = document.getElementById("save-btn");
var deleteBtn = document.getElementById("delete-btn");
var printBtn = document.getElementById("print-btn");
var addAllBtn = document.getElementById("add-all-btn");

var myModal = document.getElementById("modal");
var modalClose = document.getElementById("modal-close");
var customMessageEl = document.getElementById("custom-message");
var errorMessageEl = document.getElementById("error-message");

var ingredientList = [];
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
  searchInputEl.value = "";
  if(!searchTerm) {
    showModal("Please enter an ingredient!");
  } else {
    return searchTerm;
  }
}

recipeBtn.addEventListener('click', function() {
  var query = analyzeInput();
  getRecipe(query);
});

modalClose.addEventListener('click', function() {
  myModal.style.display = "none";
});

cocktailBtn.addEventListener('click', function() {
  var query = analyzeInput();
  getCocktail(query);
});

addAllBtn.addEventListener('click', function() {
  var listItems = ingredientListEl.getElementsByTagName('li');
  for(var i = 0; i < listItems.length; i++) {
    var li = document.createElement('li');
    li.textContent = listItems[i].firstChild.textContent;
    groceryListEl.appendChild(li);
  }
});

deleteBtn.addEventListener('click', function() {
  groceryListEl.innerHTML = "";
  localStorage.removeItem("grocery-list");
});

saveBtn.addEventListener('click', function() {
  saveGroceryList();
});

printBtn.addEventListener('click', function(){
  var printSection = document.getElementById('grocery-list');
    var windPrint = window.open('', '', 'width=900,height=650');
    windPrint.document.write(printSection.innerHTML);
    windPrint.document.close();
    windPrint.focus();
    windPrint.print();
    windPrint.close();
});

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
        showModal("There was a problem with the search. Please try again.");
      }
    }).catch(function (error) {
      showModal("There was a problem with the search. Please try again.");
    });
}

function populateIngredients() {
  for(var i = 0; i < ingredientList.length; i++) {
    var li = document.createElement('li');
    var span = document.createElement('span');
    li.textContent = ingredientList[i].name;
    li.classList.add = "ingredient";
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
          cocktailSummaryEl.innerHTML = data.drinks[recipeNumber].strInstructions;
          for(var i = 0; i < 16; i++) {
            var drinkMeasure = eval("data.drinks[" + recipeNumber.toString() + "].strMeasure" + i.toString() );
            var drinkIngredient = eval("data.drinks[" + recipeNumber.toString() + "].strIngredient" + i.toString());
            var li = document.createElement('li');
            li.classList.add = "ingredient";
            var span = document.createElement('span');
            if (drinkMeasure !== null && drinkIngredient !== null) {
              li.textContent = drinkIngredient;
              span.textContent = drinkMeasure;
              li.appendChild(span);
            } else if (drinkMeasure == "null" && drinkIngredient !== "null") {
              li.textContent = drinkIngredient;
            } else if (drinkMeasure !== "null" && drinkIngredient == "null") {
              span.textContent = drinkMeasure;
              li.appendChild(span);
            }
            ingredientListEl.appendChild(li);
          }
        }); 
      } else {
        showModal("There was a problem with the search. Please try again.");
      }
  }).catch(function (error) {
      showModal("There was a problem with the search. Please try again.");
    });
}

ingredientListEl.addEventListener('dblclick', function(event) {
  var focusedIngredient = event.target.firstChild.textContent;
  var li = document.createElement('li');
  li.textContent = focusedIngredient;
  groceryListEl.appendChild(li);
  saveGroceryList();
});

groceryListEl.addEventListener('dblclick', function(event) {
    event.target.remove();
    localStorage.removeItem("name")
    saveGroceryList();
});

function saveGroceryList() {
  var list = groceryListEl.getElementsByTagName('li');
  var saveArray = [];
  for(var i = 0; i < list.length; i++) {
    saveArray.push(list[i].textContent);
  }
  localStorage.setItem("grocery-list", JSON.stringify(saveArray));
}

function loadList() {
  var loadArray = localStorage.getItem('grocery-list');
    if(!loadArray) {
      groceryListEl.innerHTML = "";
    } else {
      loadArray = JSON.parse(loadArray);
      for(var i = 0; i < loadArray.length; i++) {
        var li = document.createElement('li');
        li.textContent = loadArray[i];
        groceryListEl.appendChild(li);
      }
    }
}

function showModal(message) {
  customMessageEl.textContent = "";
  customMessageEl.textContent = message;
  myModal.style.display = "block";
  prevenDefault();
}

loadList();