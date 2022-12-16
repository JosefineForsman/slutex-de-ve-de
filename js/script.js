 // In this module i have everything from firebase and everything that shows the output, 
 // since I have functions that both retrieve from firebase and print out info at the same time,
 // I wanted them in the same module.

 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
 import { removeMovie, clearInputFields, hideMain, hideArticle, article } from "./display.js";
 import { searchClickFunction, addMovie, btnWatchedMovies, sliderGetBack, inputTitle } from "./modules/clicks.js";

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
 
 // Variable that add a movie from user-input.
 let movie = {
    title: '',
    genre: '',
    releaseDate: ''
 } 

 // Different function calls.. 
 hideArticle();
 searchClickFunction();
 sliderGetBack(); 
 btnWatchedMovies();
 addMovie();

// Saves user-input to database 'movies'.
async function saveToDatabase(movie){
    try{
        await addDoc(collection(db, 'movies'), movie);

    } catch(error){
        console.log('Error', error);
    }
    clearInputFields();
    
}

// Removes the object 'movie' from database, and adds it in a new called 'watched-movies'.
async function removeMovieFromDatabase(deletedId, movieText){
    try{
        await deleteDoc(doc(db, 'movies', deletedId))
        await addDoc(collection(db, 'watched-movies'), {
            movie: movieText
        });
    
    } catch(error){
        console.log(error)
    }
}

// Checks if a title in the data-base 'movies' exsists.
async function checkIfTitleExists(userSearch) {
    try {
        const titleQuery = query(collection(db, 'movies'), where('title', '==', userSearch)); 
        const result = await getDocs(titleQuery);
        let titleResult = {};
        console.log(titleResult);
        
        result.forEach((search) => {
            titleResult = search;
        });
        
        return titleResult;

    } catch (error) {
        console.log(error);
    }
}

// Gets the information from database 'movie'.
async function getMovie(){
    try{
        const movie = await getDocs(collection(db,'movies'));

        displayMovies(movie); 
        removeMovie(movie);

    }catch(error){

        console.log(error);
    }
}

// Output from user-input, to "favorite" list.
function displayMovies(movie){
        const showMovie = document.querySelector('#listofmovies');
        showMovie.innerText='';
        
        movie.forEach((li)=>{

        const el = `
            <article id="movieWant">
                <li id="searchPrint" movie-id="${li.id}">
                Title: ${li.data().title} &#x2022;
                Genre: ${li.data().genre} &#x2022;
                Date release: ${li.data().releaseDate} </li>
            </article>`

            showMovie.insertAdjacentHTML('beforeend', el);
        })
    }
 
// Output from 'watched-movies' database to "watched movies" list.
async function showDeletedMovie(){
    const deletedMovie = await getDocs(collection(db, 'watched-movies'))
    const watchedMovie = document.querySelector('#movieWatch');
    watchedMovie.innerText='';
    
    deletedMovie.forEach((li)=>{
        const deleteD= `
        <article id="watchedMovies">
            <li movie-id="${li.id}">${li.data().movie}<br></li>
        </article>`
        watchedMovie.insertAdjacentHTML('beforeend', deleteD);
        
    })  
}

// If the title matches a movie in the database, this is the two different outcome.
async function manageTitle(userSearch) {
    const userInput = await checkIfTitleExists(userSearch);
    const userTitle = userInput.id;
    
    if (userTitle) {
        hideMain();
        article.innerText='';

            const input= `
            <article id="searchInfo">
                <h1>You searched for the movie: " ${userInput.data().title} ", it's already on your favorite list! </h1><br>
                    Title: ${userInput.data().title}<br>
                    Genre: ${userInput.data().genre}<br>
                    Date release: ${userInput.data().releaseDate}<br>
                    <button onClick="window.location.reload()"> GO BACK</button>
                </article><br>`
            article.insertAdjacentHTML('beforebegin', input);
  
    } else {
        hideMain();
        article.innerText='';
        const wrongInput =`
        <article id="searchInfo">
            <h1>The movie you searched for could not be found in your favorite list! </h1><br>
            <button onClick="window.location.reload()"> GO BACK</button>
        </article>`
            article.insertAdjacentHTML('beforebegin', wrongInput);  
    }
}
export { showDeletedMovie,removeMovieFromDatabase, getMovie, manageTitle, saveToDatabase, movie}