import {inputGenre, inputTitle, inputReleaseDate, removeMovieFromDatabase, showDeletedMovie} from "./scipt.js"
function removeMovie(movie){
    const movieInfo = document.querySelectorAll('li');
    // const deleteArticle = document.querySelector('.delete')
    
    movieInfo.forEach((x)=>{
        x.addEventListener('click', (event)=>{
            console.log(movie);
            const deletedId = event.target.getAttribute('movie-id');
            console.log(deletedId);
            x.style.display = 'none';
            showDeletedMovie();
            removeMovieFromDatabase(deletedId, movie)
            
        })
        
    })
}

// Clear the input-fields from letters.
function clearInputFields(){
    inputTitle.value = '';
    inputGenre.value = '';
    inputReleaseDate.value = '';
}

//Clear the list so it's only one of each movie-info, not duplicate.
function updateUi(showMovie){
    showMovie.innerText=''; 
}

// Marks the title if the title exsists in the data-base.
function markTitle() {
    const main = document.querySelector('main');
    main.style.display ='none';
    
  }

export {removeMovie, clearInputFields, updateUi, markTitle }