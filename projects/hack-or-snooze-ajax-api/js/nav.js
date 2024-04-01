"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  updateUiFavorites()
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
//function to handle clicking on submit nav button
function navSubmitClick() {
  hidePageComponents();
  $navSubmitForm.show()
}
//handler for nav submit button to hide main page and show submit page
$navSubmit.on("click", navSubmitClick)

$('.nav-middle').on('click', '#nav-favorite', navFavoriteClick)
//function for hiding and showing proper pages when navigating to user favorites
function navFavoriteClick(evt) {
  hidePageComponents()
  compileFavorites()
  updateUiFavorites()
  $('#favorite-stories-list').show()
  $('#favorite-stories-list').children().show()
}

