// DEFINE VARIABLES

var userInputEl = document.querySelector("#search");
var userFormEl = document.querySelector("#user-input-container")
var userSearchEl = document.querySelector("#user-search-button")
const appId = "c2854cdb";
const appKey = "0313cdf2d19bedadc25217aefd97971f";

// HANDLE SUBMIT EVENT
// function formSubmitHandler(event) {
//     // prevent page from refreshing
//     event.preventDefault();

//     // get value form input element
//     var cuisine = userInputEl.value;

//     if (cuisine) {
//         getRecipe(cuisine);
//         //addToSearchHistory();

//         // clear old content
//         userInputEl.value = "";
//     } else {
//         alert("Please enter a city");
//     }
// };

// GET RECIPE INFO
//function getRecipe() {
    var apiUrl = `https://themealdb.com/api/json/v1/1/filter.php?c=Seafood`;

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
//     // provide user info if server can't be reached
//     .catch(function(error) {
//         alert("Unable to connect to Server");
//     });
// };

// EVENT LISTENERS
//userFormEl.addEventListener("submit", formSubmitHandler);


    // var apiUrl = `https://cooking-recipe2.p.rapidapi.com/getbycat/Indian%20Desserts?X-RapidAPI-Key`;

    // // make get request to URL
    // fetch(apiUrl)
    // .then(function(response) {
    //     // request was successful
    //     if (response.ok) {
    //         // display current day in header
    //         response.json()
    //         .then(function(data) {
    //             console.log(data);
    //             //displayRecipe(data);
    //         });
    //         // response recieved but error with request
    //     } else {
    //         alert("Error: " + response.statusText);
    //     }
    // })
    // // provide user info if server can't be reached
    // .catch(function(error) {
    //     alert("Unable to connect to Server");
    // });
