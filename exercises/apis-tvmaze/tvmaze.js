"use strict";
//declaring variables
const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const $episodesList = $('#episodesList')



//making a request to tvmaze for shows based off of input value
async function getShowsByTerm(term) {

  const res = await axios.get('http://api.tvmaze.com/search/shows', { params: { q: term } })

  return res.data
}



//populating the #showsList with pics, names and summaries of shows
function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {

    const showObj = show.show
    const $show = $(
      `<div data-show-id="${showObj.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src="${showObj.image.medium}"
              alt="${showObj.name}"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${showObj.name}</h5>
             <div><small>${showObj.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($show);
  }
}

//function to facilitate searching and displaying of shows
async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}
//event listener for input submit
$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});
//event listener for episode button
$showsList.on('click', '.Show-getEpisodes', async function (evt) {
  evt.preventDefault();
  const id = evt.target.parentElement.parentElement.parentElement.attributes[0].value

  await searchForEpisodesAndDisplay(id)
})
//function to facilitate calling of search and populate functions
async function searchForEpisodesAndDisplay(id) {

  const episodes = await findEpisodes(id)
  console.log(episodes)
  populateEpisodes(episodes)
}
//making a request to tvmaze to find episodes based off of show id
async function findEpisodes(id) {
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)

  return res.data
}
//populating #episodesArea with li's of episodes
function populateEpisodes(episodes) {
  $episodesList.empty()

  for (let episode of episodes) {
    console.log(episode)
    const $episode = $(`<li id="${episode.id}"> <a href="${episode.url}"> Season ${episode.season}.${episode.number} ${episode.name} <div><small>${episode.summary}</small></div> </a></li>`);

    $episodesList.append($episode)
  }
  $episodesArea.show();
}



