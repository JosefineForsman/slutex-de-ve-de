// In this module i have collected the functions that makes visible differences.

import { removeMovieFromDatabase} from "./script.js"
import { inputGenre, inputReleaseDate, inputTitle} from "./modules/clicks.js"

// This function removes a favorite movie visible and from the 1st database
// and sends information to my 2nd database.
function removeMovie(){
    const movieInfo = document.querySelectorAll('li');
    
    movieInfo.forEach((x)=>{
        x.addEventListener('click',  (event)=>{
            const deletedId = event.target.getAttribute('movie-id');
            const movieText = event.target.innerText;
            console.log(movieText);
            console.log(deletedId);
            x.style.display = 'none';
            removeMovieFromDatabase(deletedId, movieText);    
        })
    })
}
// Clear the input-fields from letters.
function clearInputFields(){
    inputTitle.value = '';
    inputGenre.value = '';
    inputReleaseDate.value = '';
}

// Hide main when i want to show the search-result from the search-input.
function hideMain() {
    const main = document.querySelector('main');
    main.style.display ='none';
    
  }
 // Hide article when i am on main so it does not show up in the bottom.
const article = document.querySelector('#searchInfo')
function hideArticle(){
    article.style.display = 'none';
}
// Function that makes the favorite-list movies screen slide in.
function movieSlider() {
    const slider = document.querySelector(".sliderShowMovies");
    slider.classList.toggle("show");
  }
  
  //  Function that makes the watched movies slide in.
  function watchedMoviesSlider() {
    const slider1 = document.querySelector(".sliderShowWatchedMovies");
      slider1.classList.toggle("show");
    }

export {removeMovie, clearInputFields, hideMain , hideArticle, article, watchedMoviesSlider, movieSlider}