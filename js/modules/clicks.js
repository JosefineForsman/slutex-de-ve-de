// In this module I have put my clicks, since I have a few, it will be easier for me to find them.
import { removeMovie } from "../display.js";
import { manageTitle, saveToDatabase, movie, getMovie, showDeletedMovie } from "../scipt.js"
import { movieSlider, watchedMoviesSlider } from "./sliders.js";

// Variables to the elements i want to use in my click-functions.
const search = document.querySelector('#search');
const searchBtn = document.querySelector('#search-btn');
const saveMovie = document.querySelector('#save-movie');
const inputTitle = document.querySelector('#title');
const inputGenre = document.querySelector('#genre');
const inputReleaseDate = document.querySelector('#release-date');

// Takes in the user-information.
function searchClickFunction(){
    searchBtn.addEventListener('click', () =>{
        let userSearch = search.value;
        console.log(userSearch);
        manageTitle(userSearch);
   
    })
}
// Takes in and saves the movie information from the user, and saves it to the data-base.
function addMovie(){
    saveMovie.addEventListener('click', ()=>{
        movie.title = inputTitle.value;
        movie.genre = inputGenre.value;
        movie.releaseDate = inputReleaseDate.value;
        saveToDatabase(movie);
        console.log(movie);
    })  
}
//When the "movies i want to watch" button is pressed, the slider moves back to the correct index again.
function sliderGetBack(){
    const showMovies = document.querySelector(".showMovies");
    showMovies.addEventListener("click", () => {
        movieSlider();
        getMovie(movie);
    });
}

//When the "watched movie" button is pressed, the slider moves back to the correct index again.
function btnWatchedMovies(){
    const showWatchedMovies = document.querySelector(".showWatchedMovies");
    showWatchedMovies.addEventListener("click",() => {
        watchedMoviesSlider();
        showDeletedMovie();
          } );
        }
export { searchClickFunction, addMovie, inputGenre, inputTitle, inputReleaseDate, sliderGetBack, btnWatchedMovies }