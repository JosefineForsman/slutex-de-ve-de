// In this module i have collected the functions that makes visible differences.
import { removeMovieFromDatabase, showDeletedMovie} from "./scipt.js"
import { inputGenre, inputReleaseDate, inputTitle} from "./modules/clicks.js"

// This function removes my li, and article visible, and sends the variables to other functions.
function removeMovie(movie){
    const movieInfo = document.querySelectorAll('li');
    
    movieInfo.forEach((x)=>{
        x.addEventListener('click', (event)=>{
            console.log(movie);
            const deletedId = event.target.getAttribute('movie-id');
            console.log(deletedId);
            x.style.display = 'none';
            showDeletedMovie();
            removeMovieFromDatabase(deletedId, movie);       
        })
    })
}
// Clear the input-fields from letters.
function clearInputFields(){
    inputTitle.value = '';
    inputGenre.value = '';
    inputReleaseDate.value = '';
}

// Marks the title if the title exsists in the data-base.
function hideMain() {
    const main = document.querySelector('main');
    main.style.display ='none';
    
  }

export {removeMovie, clearInputFields, hideMain }