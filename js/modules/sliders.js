// This module only contains the sliders i have for the databases to show what in them.

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


export{ movieSlider, watchedMoviesSlider }
