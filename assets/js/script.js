// // DEFINE VARIABLES
var userInputEl = document.querySelector("#search");
var userFormEl = document.querySelector("#user-input-container");
var userSearchEl = document.querySelector("#user-search-button");
var selectedRecipeEl = document.querySelector("#recipe-selected");
var dishNameEl = document.querySelector(".dish-name");
var ingredientTitleEl = document.querySelector(".ingredient-title");
var ingredientListEl = document.querySelector(".ingredient-list");
var instructionsEl = document.querySelector(".instructions");

// // EVENT LISTENERS
userFormEl.addEventListener("submit", formSubmitHandler);

// HANDLE SUBMIT EVENT
function formSubmitHandler(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value form input element
    var foodType = userInputEl.value;

    if (foodType) {
        getMeal(foodType);
        //addToSearchHistory();

        // clear old content
        userInputEl.value = "";
    } else {

        // ** NEED TO TURN INTO MODAL

        alert("Please enter a cuisine");
    }
};

// // GET MEAL ID VIA CUISE/AREA SEARCH
function getMeal(CuisineName) {
    var apiUrl = `https://themealdb.com/api/json/v1/1/filter.php?a=${CuisineName}`;

    // make get request to URL
    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            // display current day in header
            response.json()
            .then(function(data) {
                console.log(data);
                mealToId(data);
            });
            // response recieved but error with request
        } else {
            alert("Error: " + response.statusText);
        }
    })
    
    // ** NEED TO TURN INTO MODAL

    // provide user info if server can't be reached
    .catch(function(error) {
        alert("Unable to connect to Server");
    });
};

// CONVERT MEAL DATA ARRAY TO IDMEAL TO PASS THROUGH GETRECIPE TO ACCESS ADDTL RECIPE INFO
function mealToId (data) {
        if (data) {
            // randomize recipes recieved based on cuisine
            let idMeal = data.meals[Math.floor(Math.random() * data.meals.length)].idMeal;
            getRecipe(idMeal);
            console.log(idMeal);
        }
};

function getRecipe (idMeal) {
    var apiUrl = `https://themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;

    // make get request to URL
    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            // display current day in header
            response.json()
            .then(function(idMeal) {
                console.log(idMeal);
                displayRecipe(idMeal);
            });
            // response recieved but error with request
        } else {
            alert("Error: " + response.statusText);
        }
    })
    // provide user info if server can't be reached
    .catch(function(error) {
        alert("Unable to connect to Server");
    });
};


// function getRandomMealId (idMeal) {
//     console.log(idMeal);
//     let idArray = idMeal.length - idMeal[0] + 1;
//     let randomIdArray = Math.random() * idArray;
//     let pickedIndex = Math.floor(randomIdArray) + idMeal[0];

//     console.log(pickedIndex);
// }

function displayRecipe (idMeal) {

    console.log(idMeal.meals[0].strMeal);

    if (idMeal) {
        // CLEAR OLD DATA UPON NEW SEARCH
        dishNameEl.innerHTML = "";
        ingredientTitleEl.innerHTML = "";
        ingredientListEl.innerHTML = "";
        // APPEND DISH NAME
        dishNameEl.append(idMeal.meals[0].strMeal);
        // APPEND INGREDIENTS TITLE
        ingredientTitleEl.append("Ingredients: ");
        // APPEND INGREDIENTS & PAIR WITH MEASUREMENT
        ingredientListEl.append(idMeal.meals[0].strIngredient1);
        ingredientListEl.append(idMeal.meals[0].strMeasure1);
        ingredientListEl.append(idMeal.meals[0].strIngredient2);
        ingredientListEl.append(idMeal.meals[0].strMeasure2);
        ingredientListEl.append(idMeal.meals[0].strIngredient3);
        ingredientListEl.append(idMeal.meals[0].strMeasure3);
        ingredientListEl.append(idMeal.meals[0].strIngredient4);
        ingredientListEl.append(idMeal.meals[0].strMeasure4);
        ingredientListEl.append(idMeal.meals[0].strIngredient5);
        ingredientListEl.append(idMeal.meals[0].strMeasure5);
        ingredientListEl.append(idMeal.meals[0].strIngredient6);
        ingredientListEl.append(idMeal.meals[0].strMeasure6);
        ingredientListEl.append(idMeal.meals[0].strIngredient7);
        ingredientListEl.append(idMeal.meals[0].strMeasure7);
        ingredientListEl.append(idMeal.meals[0].strIngredient8);
        ingredientListEl.append(idMeal.meals[0].strMeasure8);
        ingredientListEl.append(idMeal.meals[0].strIngredient9);
        ingredientListEl.append(idMeal.meals[0].strMeasure9);
        ingredientListEl.append(idMeal.meals[0].strIngredient10);
        ingredientListEl.append(idMeal.meals[0].strMeasure10);
        ingredientListEl.append(idMeal.meals[0].strIngredient11);
        ingredientListEl.append(idMeal.meals[0].strMeasure11);
        ingredientListEl.append(idMeal.meals[0].strIngredient12);
        ingredientListEl.append(idMeal.meals[0].strMeasure12);
        ingredientListEl.append(idMeal.meals[0].strIngredient13);
        ingredientListEl.append(idMeal.meals[0].strMeasure13);
        ingredientListEl.append(idMeal.meals[0].strIngredient14);
        ingredientListEl.append(idMeal.meals[0].strMeasure14);
        ingredientListEl.append(idMeal.meals[0].strIngredient15);
        ingredientListEl.append(idMeal.meals[0].strMeasure16);
        ingredientListEl.append(idMeal.meals[0].strIngredient17);
        ingredientListEl.append(idMeal.meals[0].strMeasure17);
        ingredientListEl.append(idMeal.meals[0].strIngredient18);
        ingredientListEl.append(idMeal.meals[0].strMeasure18);
        ingredientListEl.append(idMeal.meals[0].strIngredient19);
        ingredientListEl.append(idMeal.meals[0].strMeasure19);
        ingredientListEl.append(idMeal.meals[0].strIngredient20);
        ingredientListEl.append(idMeal.meals[0].strMeasure20);
        // APPEND DIRECTIONS
        instructionsEl.append(idMeal.meals[0].strInstructions);
    }
};

