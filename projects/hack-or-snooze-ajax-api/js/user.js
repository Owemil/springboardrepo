"use strict";

// global to hold the User instance of the currently-logged-in user
let currentUser;
/******************************************************************************
 * User login/signup/login
 */

/** Handle login form submission. If login ok, sets up the user instance */

async function login(evt) {
  console.debug("login", evt);
  evt.preventDefault();

  // grab the username and password
  const username = $("#login-username").val();
  const password = $("#login-password").val();

  // User.login retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  currentUser = await User.login(username, password);

  $loginForm.trigger("reset");

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
}

$loginForm.on("submit", login);

/** Handle signup form submission. */

async function signup(evt) {
  console.debug("signup", evt);
  evt.preventDefault();

  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();

  // User.signup retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  currentUser = await User.signup(username, password, name);

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();

  $signupForm.trigger("reset");
}

$signupForm.on("submit", signup);

/** Handle click of logout button
 *
 * Remove their credentials from localStorage and refresh page
 */

function logout(evt) {
  console.debug("logout", evt);
  localStorage.clear();
  location.reload();
}

$navLogOut.on("click", logout);

/******************************************************************************
 * Storing/recalling previously-logged-in-user with localStorage
 */

/** If there are user credentials in local storage, use those to log in
 * that user. This is meant to be called on page load, just once.
 */

async function checkForRememberedUser() {
  console.debug("checkForRememberedUser");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;

  // try to log in with these credentials (will be null if login failed)
  currentUser = await User.loginViaStoredCredentials(token, username);
}

/** Sync current user information to localStorage.
 *
 * We store the username/token in localStorage so when the page is refreshed
 * (or the user revisits the site later), they will still be logged in.
 */

function saveUserCredentialsInLocalStorage() {
  console.debug("saveUserCredentialsInLocalStorage");
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}

/******************************************************************************
 * General UI stuff about users
 */

/** When a user signs up or registers, we want to set up the UI for them:
 *
 * - show the stories list
 * - update nav bar options for logged-in user
 * - generate the user profile part of the page
 */

function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");

  $allStoriesList.show();

  updateNavOnLogin();
}
//function for updating Ui of favorites by checking checkboxes
function updateUiFavorites() {
  let favorites = JSON.parse(localStorage.getItem('favorites'))
  favorites.filter((val) => {
    $(`#${val.storyId} > #favorite`).prop('checked', true)
    $(`#favorite-stories-list > #${val.storyId} > #favorite`).prop('checked', true)
  })
}
//save user favorites in local storage
function saveUserFavoritesInLocalStorage(favorites) {
  if (favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}
//deleteing user favorites from local storage
function deleteUserFavoritesInLocalStorage(storyId) {
  let arr = []
  let favorites = JSON.parse(localStorage.getItem('favorites'))
  favorites.filter((val) => {
    if (val.storyId === storyId) {
    } else {
      arr.push(val)
    }
  })
  saveUserFavoritesInLocalStorage(arr)
}
// handler for creating and deleting favorites when checked
$allStoriesList.on('click', '#favorite', async function (evt) {
  let username = currentUser.username
  let storyId = evt.target.parentElement.getAttribute('id')
  let token = currentUser.loginToken
  if (evt.target.checked) {
    let postResponse = await User.favoriteStory(token, username, storyId)
    saveUserFavoritesInLocalStorage(postResponse.data.user.favorites)
    compileFavorites()
  } else {
    let postResponse = await User.deleteFavoriteStory(token, username, storyId)
    deleteUserFavoritesInLocalStorage(storyId)
  }
})


//function for compiling favorites into the user favorites section
function compileFavorites() {
  let favorites = JSON.parse(localStorage.getItem('favorites'))
  $('#favorite-stories-list').empty()
  for (let favorite of favorites) {
    let clone = generateStoryMarkup(favorite)
    clone.addClass('hidden')
    $('#favorite-stories-list').append(clone)
  }
}

//copy of event handler for creating and deleting favorites. this lives in the user favorite section
$('#favorite-stories-list').on('click', '#favorite', async function (evt) {
  let username = currentUser.username
  let storyId = evt.target.parentElement.getAttribute('id')
  let token = currentUser.loginToken
  if (evt.target.checked) {
    let postResponse = await User.favoriteStory(token, username, storyId)
    saveUserFavoritesInLocalStorage(postResponse.data.user.favorites)
  } else {
    console.log('un-favor it')
    let postResponse = await User.deleteFavoriteStory(token, username, storyId)
    deleteUserFavoritesInLocalStorage(storyId)
    evt.target.parentElement.remove()
  }
})