// // DEFINE VARIABLES
var userInputEl = document.querySelector("#search");
var userFormEl = document.querySelector("#user-input-container");
var userSearchEl = document.querySelector("#user-search-button");
var selectedRecipeEl = document.querySelector("#recipe-selected");
var randomButtonEl = document.querySelector("#random-container");
// user variables
var dishNameEl = document.querySelector("#dish-name-1");
var ingredientTitleEl = document.querySelector("#ingredient-title-1");
var ingredientListEl = document.querySelector("#ingredient-list-1");
var instructionsEl = document.querySelector("#instructions-1");
var dishNameTwoEl = document.querySelector("#dish-name-2");
// random variables
var ingredientTitleTwoEl = document.querySelector("#ingredient-title-2");
var ingredientListTwoEl = document.querySelector("#ingredient-list-2");
var instructionsTwoEl = document.querySelector("#instructions-2");

// EVENT LISTENERS
// cuisine form listener
userFormEl.addEventListener("submit", formSubmitHandler);
// random click listener
randomButtonEl.addEventListener("click", randomClickHandler);

// HANDLE USER INPUT SUBMIT EVENT
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

// // GET MEAL ID VIA CUISINE/AREA SEARCH
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
                displayUserRecipe(idMeal);
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

// DISPLAY USER INPUT RECIPE
function displayUserRecipe (idMeal) {

    console.log(idMeal.meals[0].strMeal);

    if (idMeal) {
        // CLEAR OLD DATA UPON NEW SEARCH
        dishNameEl.innerHTML = "";
        ingredientTitleEl.innerHTML = "";
        ingredientListEl.innerHTML = "";
        instructionsEl.innerHTML = "";
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
        ingredientListEl.append(idMeal.meals[0].strMeasure15);
        ingredientListEl.append(idMeal.meals[0].strIngredient16);
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

// HANDLE RANDOM SUBMIT EVENT
function randomClickHandler (event) {
    // prevent page from refreshing
    event.preventDefault();

        getRandomMeal();
        //addToSearchHistory();
};

// GET MEAL ID VIA CUISE/AREA SEARCH
function getRandomMeal () {
    var apiUrl = `https://themealdb.com/api/json/v1/1/random.php`;

    // make get request to URL
    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            // display current day in header
            response.json()
            .then(function(data) {
                console.log(data);
                displayRandomRecipe(data);
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

// DISPLAY RANDOMLY CLICKED RECIPE
function displayRandomRecipe (data) {

    if (data) {
        // CLEAR OLD DATA UPON NEW SEARCH
        dishNameTwoEl.innerHTML = "";
        ingredientTitleTwoEl.innerHTML = "";
        ingredientListTwoEl.innerHTML = "";
        instructionsTwoEl.innerHTML = "";
        // APPEND DISH NAME
        dishNameTwoEl.append(data.meals[0].strMeal);
        // APPEND INGREDIENTS TITLE
        ingredientTitleTwoEl.append("Ingredients: ");
        // APPEND INGREDIENTS & PAIR WITH MEASUREMENT
        ingredientListTwoEl.append(data.meals[0].strIngredient1);
        ingredientListTwoEl.append(data.meals[0].strMeasure1);
        ingredientListTwoEl.append(data.meals[0].strIngredient2);
        ingredientListTwoEl.append(data.meals[0].strMeasure2);
        ingredientListTwoEl.append(data.meals[0].strIngredient3);
        ingredientListTwoEl.append(data.meals[0].strMeasure3);
        ingredientListTwoEl.append(data.meals[0].strIngredient4);
        ingredientListTwoEl.append(data.meals[0].strMeasure4);
        ingredientListTwoEl.append(data.meals[0].strIngredient5);
        ingredientListTwoEl.append(data.meals[0].strMeasure5);
        ingredientListTwoEl.append(data.meals[0].strIngredient6);
        ingredientListTwoEl.append(data.meals[0].strMeasure6);
        ingredientListTwoEl.append(data.meals[0].strIngredient7);
        ingredientListTwoEl.append(data.meals[0].strMeasure7);
        ingredientListTwoEl.append(data.meals[0].strIngredient8);
        ingredientListTwoEl.append(data.meals[0].strMeasure8);
        ingredientListTwoEl.append(data.meals[0].strIngredient9);
        ingredientListTwoEl.append(data.meals[0].strMeasure9);
        ingredientListTwoEl.append(data.meals[0].strIngredient10);
        ingredientListTwoEl.append(data.meals[0].strMeasure10);
        ingredientListTwoEl.append(data.meals[0].strIngredient11);
        ingredientListTwoEl.append(data.meals[0].strMeasure11);
        ingredientListTwoEl.append(data.meals[0].strIngredient12);
        ingredientListTwoEl.append(data.meals[0].strMeasure12);
        ingredientListTwoEl.append(data.meals[0].strIngredient13);
        ingredientListTwoEl.append(data.meals[0].strMeasure13);
        ingredientListTwoEl.append(data.meals[0].strIngredient14);
        ingredientListTwoEl.append(data.meals[0].strMeasure14);
        ingredientListTwoEl.append(data.meals[0].strIngredient15);
        ingredientListTwoEl.append(data.meals[0].strMeasure15);
        ingredientListTwoEl.append(data.meals[0].strIngredient16);
        ingredientListTwoEl.append(data.meals[0].strMeasure16);
        ingredientListTwoEl.append(data.meals[0].strIngredient17);
        ingredientListTwoEl.append(data.meals[0].strMeasure17);
        ingredientListTwoEl.append(data.meals[0].strIngredient18);
        ingredientListTwoEl.append(data.meals[0].strMeasure18);
        ingredientListTwoEl.append(data.meals[0].strIngredient19);
        ingredientListTwoEl.append(data.meals[0].strMeasure19);
        ingredientListTwoEl.append(data.meals[0].strIngredient20);
        ingredientListTwoEl.append(data.meals[0].strMeasure20);
        // APPEND DIRECTIONS
        instructionsTwoEl.append(data.meals[0].strInstructions);
    }

}