// DEFINE VARIABLES

var userInputEl = document.querySelector("#search");
var userFormEl = document.querySelector("#user-input-container")
var userSearchEl = document.querySelector("#user-search-button")
// const appId = "c2854cdb";
// const appKey = "0313cdf2d19bedadc25217aefd97971f";

// EVENT LISTENERS
userFormEl.addEventListener("submit", formSubmitHandler);

// HANDLE SUBMIT EVENT
function formSubmitHandler(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value form input element
    var foodType = userInputEl.value;

    if (foodType) {
        getRecipe(foodType);
        //addToSearchHistory();

        // clear old content
        userInputEl.value = "";
    } else {

        // THIS NEEDS TO BE A MODAL
        alert("Please enter food type");
    }
};

// GET RECIPE INFO
function getRecipe(strCategory) {
    var apiUrl = "https://themealdb.com/api/json/v1/1/search.php?s=" + strCategory;

    // make get request to URL
    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            // display current day in header
            response.json()
            .then(function(data) {
                console.log(data);
                //displayRecipe(data);
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


