// Function that makes the game-over screen slide in.
function movieSlider() {
  const slider = document.querySelector(".sliderShowMovies");
  slider.classList.toggle("show");
}

//  Function that makes the win screen slide in.
function watchedMoviesSlider() {
  const slider1 = document.querySelector(".sliderShowWatchedMovies");
    slider1.classList.toggle("show");
  }

//When the play again button is pressed, the slider moves back to the correct index again.
function btnWatchedMovies(){
const showWatchedMovies = document.querySelector(".showWatchedMovies");
  showWatchedMovies.addEventListener("click",() => {
        watchedMoviesSlider();
      } );
    }

 //When the play again button is pressed, the slider moves back to the correct index again.
function sliderGetBack(){
  const showMovies = document.querySelector(".showMovies");
  showMovies.addEventListener("click", () => {
        movieSlider();
        });
    }

export{ movieSlider, watchedMoviesSlider, btnWatchedMovies, sliderGetBack}
