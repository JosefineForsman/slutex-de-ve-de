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
function clearInputFields(){
    inputTitle.value = '';
    inputGenre.value = '';
    inputReleaseDate.value = '';
}
function updateUi(showMovie){
    showMovie.innerText=''; // lägga denna i display och göra till en funktion.
}

export {removeMovie, clearInputFields, updateUi }