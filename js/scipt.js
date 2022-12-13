 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
 import { removeMovie, clearInputFields, updateUi, markTitle } from "./display.js";
 import { watchedMoviesSlider, movieSlider } from "./modules/sliders.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyCn8ix2iZpS0GnXEQWcs5JzmahOB1MUKwI",
   authDomain: "de-ve-de.firebaseapp.com",
   projectId: "de-ve-de",
   storageBucket: "de-ve-de.appspot.com",
   messagingSenderId: "720471949148",
   appId: "1:720471949148:web:ae7a6f88a0f9685f98cb99"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);

 const inputTitle = document.querySelector('#title');
 const inputGenre = document.querySelector('#genre');
 const inputReleaseDate = document.querySelector('#release-date');
 const saveMovie = document.querySelector('#save-movie');
 const showMovies = document.querySelector(".showMovies");
 const showWatchedMovies = document.querySelector(".showWatchedMovies");
 const search = document.querySelector('#search');
 const searchBtn = document.querySelector('#search-btn');
 
 searchBtn.addEventListener('click', () =>{
     let userSearch = search.value;
     console.log(userSearch);
     manageTitle(userSearch);

    //  checkIfUsernameExists(movie);

 })
  //When the play again button is pressed, the slider moves back to the correct index again.
showMovies.addEventListener("click", () => {
    movieSlider();
});

//When the play again button is pressed, the slider moves back to the correct index again.
showWatchedMovies.addEventListener("click",() => {
      watchedMoviesSlider();
    } );

 let movie = {
    title: '',
    genre: '',
    releaseDate: ''
 } 

 function addMovie(){
    saveMovie.addEventListener('click', ()=>{
        movie.title = inputTitle.value;
        movie.genre = inputGenre.value;
        movie.releaseDate = inputReleaseDate.value;
        saveToDatabase(movie);
        console.log(movie);
        getMovie(movie);
    })
    
}
addMovie();

async function saveToDatabase(movie){
    try{
        await addDoc(collection(db, 'movies'), movie);
    } catch(error){
        console.log('Error', error);
    }
    clearInputFields();
    
}

async function getMovie(){
    const movie = await getDocs(collection(db,'movies'));
    const showMovie = document.querySelector('#listofmovies');
    updateUi(showMovie);
    
    // document.queryselector `#${li.id}`.style.display="none"; i min remove funktion.
    movie.forEach((li)=>{
        console.log(li.data());
        const el = `
        <article id="movieWant">
        <li id="searchPrint" movie-id="${li.id}"><i class="fa-solid fa-eye"></i>
        Title: ${li.data().title} ||
        Genre: ${li.data().genre} ||<br>
        Date release: ${li.data().releaseDate}
        </li>
        </article>`
        showMovie.insertAdjacentHTML('beforeend', el);
    })
    removeMovie(movie);
}

async function showDeletedMovie(){
    const deletedMovies = await getDocs(collection(db, 'watched-movies'))
    const watchedMovie = document.querySelector('#movieWatch');
    watchedMovie.innerText='';
    
    deletedMovies.forEach((li)=>{
        const deletedMovie= `
        <article id="watchedMovies">
        
        <li movie-id="${li.id}"><i class="fa-sharp fa-solid fa-circle-check"></i>
        Title: ${li.data().title} ||
        Genre: ${li.data().genre} ||<br>
        Date release: ${li.data().releaseDate}
        </article>`
        watchedMovie.insertAdjacentHTML('beforeend', deletedMovie);
        
    })
    
}
async function removeMovieFromDatabase(deletedId){
    try{
        await deleteDoc(doc(db, 'movies', deletedId))
        await addDoc(collection(db, 'watched-movies'), movie);
        showDeletedMovie();
    } catch(error){
        console.log(error)
    }
}

async function checkIfTitleExists(userSearch) {
    try {
        const titleQuery = query(collection(db, 'movies'), where('title', '==', userSearch));
        const result = await getDocs(titleQuery);
        let titleResult = {};
        console.log(titleResult);

        result.forEach((username) => {
            titleResult = username;
        });

        return titleResult;
    } catch (error) {
        console.log(error);
    }
}
async function manageTitle(userSearch) {

    const userInput = await checkIfTitleExists(userSearch);
    console.log(userInput);
    const userTitle = userInput.id;
    const article = document.querySelector('#searchInfo')
    
    if (userTitle) {
        markTitle();
        userInput.innerText='';
        

            const input= `
            <article id="searchInfo">
            <h1>You searched for the movie: " ${userInput.data().title} ", your movie is saved in your favorite list! </h1><br>
            Title: ${userInput.data().title} ||
            Genre: ${userInput.data().genre} ||<br>
            Date release: ${userInput.data().releaseDate}
            </article><br>
            <button onClick="window.location.reload()"> GO BACK</button>`
            article.insertAdjacentHTML('beforeend', input);


       console.log(userInput.data().title);
        console.log(userInput.data().genre);
        console.log(userInput.data().releaseDate);
       // alert('title exist');

        
    } else {
        // Spara highscore som en nytt dokument
        markTitle();
        const wrongInput =` <article id="searchInfo">
        <h1>The movie you searched for could not be found in your favorite list! </h1><br>
    
        </article><br>
        <button onClick="window.location.reload()"> GO BACK</button>`
        article.insertAdjacentHTML('beforeend', wrongInput);
        
    }
}


export { showDeletedMovie,removeMovieFromDatabase, inputGenre, inputTitle, inputReleaseDate, getMovie}