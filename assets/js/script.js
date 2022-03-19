// // DEFINE VARIABLES
var userInputEl = document.querySelector("#search");
var userFormEl = document.querySelector("#user-input-container");
var userSearchEl = document.querySelector("#user-search-button");
var selectedRecipeEl = document.querySelector("#recipe-selected");

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

        // THIS NEEDS TO BE A MODAL
        alert("Please enter a food type");
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
    // provide user info if server can't be reached
    .catch(function(error) {
        alert("Unable to connect to Server");
    });
};

// CONVERT MEAL DATA ARRAY TO IDMEAL TO PASS THROUGH GETRECIPE TO ACCESS ADDTL RECIPE INFO
function mealToId (data) {
    for (var i = 0; i <= data.meals.length-1; i++) {

        if (data) {
            let idMeal = data.meals[i].idMeal;
            getRecipe(idMeal);
            console.log(idMeal);
        }
    };
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
                //displayRecipe(idMeal);
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

// function displayRecipe (idMeal) {
    
//     pickedMeal = idMeal[Math.floor(Math.random()*idMeal.length)];

//     if (pickedMeal === 0) {
//         selectedRecipeEl.textContent = "No cuisines by that name were found.";
//         return;
//     }

//     if (pickedMeal) {
//         console.log(pickedMeal);
//     }
// };