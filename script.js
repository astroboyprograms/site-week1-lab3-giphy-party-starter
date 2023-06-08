

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')


// Global Constants
const apiKey = '10mifjR4WemBpAtdVNLewcDE36qiVPlO';
const limit = 25;
const RATING = 'g';





/**
 * Update the DOM to display results from the Giphy API query.
 *
 * @param {Object} results - An array of results containing each item
 *                           returned by the response from the Giphy API.
 *
 */
function displayResults(results) {
  const resultsContainer = document.getElementById('gif-results');
  resultsContainer.innerHTML = '';

  for (let gif of results.data) {
    const newGif = document.createElement('img');
    //newGif.src = gif.images.original.url;
    newGif.src = gif.images.fixed_width.url;

    resultsContainer.appendChild(newGif);
}
  
}

/**
 * Make the actual `fetch` request to the Giphy API
 * and appropriately handle the response.
 *
 * @param {String} searchTerm - The user input text used as the search query
 *
 */
async function getGiphyApiResults(searchTerm) {
  // YOUR CODE HERE
  const url = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=${limit}&rating=${RATING}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data; 
}

/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleFormSubmit(event) {
  // YOUR CODE HERE
  event.preventDefault();
  const searchTerm = searchInput.value;
  const resultsContainer = document.getElementById('gif-results');
  resultsContainer.innerHTML = '';
  const results = await getGiphyApiResults(searchTerm);
  displayResults(results);
  searchInput.value = '';
}

searchForm.addEventListener("submit", handleFormSubmit)

/**
 * Handle fetching the next set of results from the Giphy API
 * using the same search term from the previous query.
 *
 * @param {MouseEvent} event - The 'click' MouseEvent triggered by clicking the 'Show more' button
 *
 */
async function handleShowMore(event) {
  // YOUR CODE HERE
}

window.onload = function () {
  // YOUR CODE HERE
  // Add any event handlers here

  searchButton.addEventListener('click', handleFormSubmit)
  //searchForm.addEventListener("submit", handleFormSubmit);
}
