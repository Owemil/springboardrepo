"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.url;
  return $(`
      <li id="${story.storyId}">
        <input type="checkbox" id="favorite" class="star"></input> 
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <button id="remove">Remove</button>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// function for submit button for new stories
async function submitNewStory(evt) {
  evt.preventDefault()
  let obj = {}
  obj.title = $title.val()
  obj.author = $author.val()
  obj.url = $url.val()
  $title.val('')
  $author.val('')
  $url.val('')
  let newStory = await storyList.addStory(currentUser,
    obj);
  $allStoriesList.prepend(generateStoryMarkup(newStory))
  $allStoriesList.show()

}
// event listener for story submit button
$storyBtn.on('click', submitNewStory)
//function for removing stories
async function removeStory(evt) {
  let storyId = evt.target.parentElement.getAttribute('id')
  evt.target.parentElement.remove()
  let deleteResponse = await axios.delete(`${BASE_URL}/stories/${storyId}`, { params: { token: `${currentUser.loginToken}` } })
}
//event handler for the remove buttons
$allStoriesList.on('click', '#remove', removeStory)

