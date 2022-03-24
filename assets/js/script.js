// // DEFINE VARIABLES
var userInputEl = document.querySelector("#search");
var userFormEl = document.querySelector("#user-input-container");
var userSearchEl = document.querySelector("#user-search-button");
var selectedRecipeEl = document.querySelector("#recipe-selected");
var randomButtonEl = document.querySelector("#random-container");
// history variables
var historyEl = document.querySelector("#search-history-results");
let searchHistory = JSON.parse(localStorage.getItem("search"));
// user display variables
var dishNameEl = document.querySelector("#dish-name-1");
var ingredientTitleEl = document.querySelector("#ingredient-title-1");
var ingredientListEl = document.querySelector("#ingredient-list-1");
var instructionsEl = document.querySelector("#instructions-1");
var dishNameTwoEl = document.querySelector("#dish-name-2");
// random display variables
var ingredientTitleTwoEl = document.querySelector("#ingredient-title-2");
var ingredientListTwoEl = document.querySelector("#ingredient-list-2");
var instructionsTwoEl = document.querySelector("#instructions-2");
//history display variables
var dishNameHistEl = document.querySelector("#dish-name-h");
var ingredientTitleHistEl = document.querySelector("#ingredient-title-h");
var ingredientListHistEl = document.querySelector("#ingredient-list-h");
var ingredientMeasureHistEl = document.querySelector("#ingredient-measure-h");
var instructionsHistEl = document.querySelector("#instructions-h");
// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Modal Text
var modalTextEl = document.querySelector("#modal-text")

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

        // clear old content
        userInputEl.value = "";
    } else {
        // MODAL
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal
        modal.style.display = "block";
        modalTextEl.innerHTML = "Please enter a country name to access cuisines!";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
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
            // MODAL
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks on the button, open the modal
            modal.style.display = "block";
            modalTextEl.innerHTML = ("Error: " + response.statusText);

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        };
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
            // MODAL
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks on the button, open the modal
            modal.style.display = "block";
            modalTextEl.innerHTML = ("Error: " + response.statusText);

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        }
    })
    // provide user info if server can't be reached
    .catch(function(error) {
        // MODAL
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal
        modal.style.display = "block";
        modalTextEl.innerHTML = ("Unable to connect to the server");

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
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
        // APPEND INGREDIENTS & PAIR WITH MEASUREMENT

        let ingredients = [];
        let measurements = [];

        let ing = idMeal.meals[0];
        
            for (const key in ing) {
                if (ing[key] && ing[key] !== " ") {
                    if (key.includes('strIngredient')) {
                        ingredients.push(ing[key])
                    };

                    if (key.includes('strMeasure')) {
                        measurements.push(ing[key])
                    };
                };
            };

            for (var i = 0; i < ingredients.length; i++) {
                let li = document.createElement("li");
                li.innerText = (`${ingredients[i]}: ${measurements[i]}`);
                ingredientListEl.appendChild(li);
            };

            console.log(measurements);
            console.log(ingredients);
        // APPEND DIRECTIONS
        instructionsEl.append(idMeal.meals[0].strInstructions);
    }

    // store meal title to pass through local storage function
    let savePickedMeal = idMeal.meals[0].strMeal;
    
    // if (!searchHistory.includes(savePickedMeal)) {
        addToSearchHistory(savePickedMeal);    

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
            // MODAL
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks on the button, open the modal
            modal.style.display = "block";
            modalTextEl.innerHTML = ("Error: " + response.statusText);

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        }
    })
    // provide user info if server can't be reached
    .catch(function(error) {
        // MODAL
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal
        modal.style.display = "block";
        modalTextEl.innerHTML = ("Unabled to connect to server");

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
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
        // APPEND INGREDIENTS & PAIR WITH MEASUREMENT

        let ingredients = [];
        let measurements = [];

        let ing = data.meals[0];
        
            for (const key in ing) {
                if (ing[key] && ing[key] !== " ") {
                    if (key.includes('strIngredient')) {
                        ingredients.push(ing[key])
                    };

                    if (key.includes('strMeasure')) {
                        measurements.push(ing[key])
                    };
                };
            };

            for (var i = 0; i < ingredients.length; i++) {
                let li = document.createElement("li");
                li.innerText = (`${ingredients[i]}: ${measurements[i]}`);
                ingredientListTwoEl.appendChild(li);
            };

            console.log(measurements);
            console.log(ingredients);
        // APPEND DIRECTIONS
        instructionsTwoEl.append(data.meals[0].strInstructions);
    }

    // store meal title to pass through local storage function
    let savePickedMeal = data.meals[0].strMeal;

        addToSearchHistory(savePickedMeal);

};

// ADD USER PICKED MEALS TO LOCAL STORAGE AND APPEND NEW BUTTONS SO THEY CAN BE ACCESSED
function addToSearchHistory (savePickedMeal) {

    //console.log(savePickedMeal);

    if (!searchHistory) {
        searchHistory = [];
    }

    // only run if item is not already in local storage
    if (!searchHistory.includes(savePickedMeal)) {

        // add picked meal to search history
        searchHistory.push(savePickedMeal);
        // then turn it into a string
        localStorage.setItem("search", JSON.stringify(searchHistory));


        //and add the button so it can be access later
        historyEl.insertAdjacentHTML("afterbegin", `<button id="${savePickedMeal}" onclick = "handleHistoryClick(event)">${savePickedMeal}</button>`)
    }
};

// SEARCH HISTORY FUNCTIONS & LOCAL STORAGE
function addToSearchHistory (savePickedMeal) {

    //console.log(savePickedMeal);

    if (!searchHistory) {
        searchHistory = [];
    }

    if (!searchHistory.includes(savePickedMeal)) {

        searchHistory.push(savePickedMeal);
        localStorage.setItem("search", JSON.stringify(searchHistory));


        historyEl.insertAdjacentHTML("afterbegin", `<button id="${savePickedMeal}" onclick = "handleHistoryClick(event)">${savePickedMeal}</button>`)
    }
};

// LOOP THROUGH SEARCH HISTORY TO PULL HISTORY ITEM UPON CLICK
if (searchHistory) {
    for (let i = 0; i < searchHistory.length; i++) {
        historyEl.insertAdjacentHTML("afterbegin", `<button id="${searchHistory[i]}" onclick = "handleHistoryClick(event)">${searchHistory[i]}</button>`)
    }
};

// EVENT HANDLER FOR HISTORY ITEM CLICK
function handleHistoryClick (event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var recipeName = event.target.id;

    if (recipeName) {
        getSavedRecipe(recipeName);

        // clear old content
        userInputEl.value = "";
    }
};

// CLEAR LOCAL STORAGE AND ADDED BUTTONS WHEN CLEAR HISTORY BUTTON IS CLICKED
function clearSearch() {
    searchHistory = [];
    historyEl.innerHTML = "";
    localStorage.clear();
};

// GET MEAL VIA NAME WHEN ACCESSING LOCAL STORAGE TO RE-GENERATE RECIPE
function getSavedRecipe(savePickedMeal) {
    var apiUrl = `https://themealdb.com/api/json/v1/1/search.php?s=${savePickedMeal}`;

    // make get request to URL
    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            // display current day in header
            response.json()
            .then(function(data) {
                //console.log(data);
                displaySavedRecipe(data);
            });
            // response recieved but error with request
        } else {
            // MODAL
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks on the button, open the modal
            modal.style.display = "block";
            modalTextEl.innerHTML = ("Error: " + response.statusText);

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        }
    })
    
    // ** NEED TO TURN INTO MODAL

    // provide user info if server can't be reached
    .catch(function(error) {
            // MODAL
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks on the button, open the modal
            modal.style.display = "block";
            modalTextEl.innerHTML = ("Unable to connect to server");

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
    });
};


// DISPLAY USER INPUT RECIPE
function displaySavedRecipe (data) {

    console.log(data.meals[0].strMeal);

    if (data) {
        // CLEAR OLD DATA UPON NEW SEARCH
        dishNameHistEl.innerHTML = "";
        ingredientTitleHistEl.innerHTML = "";
        instructionsHistEl.innerHTML = "";
        ingredientListHistEl.innerHTML = "";
        // APPEND DISH NAME
        dishNameHistEl.append(data.meals[0].strMeal);
        // APPEND INGREDIENTS TITLE
        ingredientTitleHistEl.append("Ingredients: ");

        // APPEND INGREDIENTS & PAIR WITH MEASUREMENT

        let ingredients = [];
        let measurements = [];

        let ing = data.meals[0];
        
            for (const key in ing) {
                if (ing[key] && ing[key] !== " ") {
                    if (key.includes('strIngredient')) {
                        ingredients.push(ing[key])
                    };

                    if (key.includes('strMeasure')) {
                        measurements.push(ing[key])
                    };
                };
            };

            for (var i = 0; i < ingredients.length; i++) {
                let li = document.createElement("li");
                li.innerText = (`${ingredients[i]}: ${measurements[i]}`);
                ingredientListHistEl.appendChild(li);
            };

            console.log(measurements);
            console.log(ingredients);

        // APPEND DIRECTIONS
        instructionsHistEl.append(data.meals[0].strInstructions);
    }
};




