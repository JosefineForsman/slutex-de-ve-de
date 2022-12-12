const slider = document.querySelector(".sliderShowMovies");
const slider1 = document.querySelector(".sliderShowWatchedMovies");

// Function that makes the game-over screen slide in.
function movieSlider() {
    slider.classList.toggle("show");
  }

  //  Function that makes the win screen slide in.
function watchedMoviesSlider() {
    slider1.classList.toggle("show");
  }

export{ movieSlider, watchedMoviesSlider}
