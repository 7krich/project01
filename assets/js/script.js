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
    // provide user info if server can't be reached
    .catch(function(error) {
        alert("Unable to connect to Server");
    });
};

// CONVERT MEAL DATA ARRAY TO IDMEAL TO PASS THROUGH GETRECIPE TO ACCESS ADDTL RECIPE INFO
function mealToId (data) {
        if (data) {
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

    //console.log(idMeal.meals[0].strMeal);
    //for (var i = 0; i < idMeal.meals.length - 1; i++) {

    //}

    //     if(idMeal) {
    //         console.log(idMeal.meals[i].strMeal);
    //     }

    // }

    // if (idMeal) {
    //     selectedRecipeEl.innerHTML = "";
    //     selectedRecipeEl.append(meals);
    // }
};

