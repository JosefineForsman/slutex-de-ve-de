 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
 import { removeMovie, clearInputFields, updateUi, hideMain } from "./display.js";
 import { searchClickFunction, addMovie, btnWatchedMovies, sliderGetBack } from "./modules/clicks.js";

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
 
 // Variable that changes depending on users-input.
 let movie = {
    title: '',
    genre: '',
    releaseDate: ''
 } 

 // Different functions. 
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
async function removeMovieFromDatabase(deletedId){
    try{
        await deleteDoc(doc(db, 'movies', deletedId))
        await addDoc(collection(db, 'watched-movies'), movie);
        showDeletedMovie();
    } catch(error){
        console.log(error)
    }
}

// If a title is in the data-base 'movies' 
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
// Output from user, to a "i want to watch this movie list".
async function getMovie(){
    const movie = await getDocs(collection(db,'movies'));
    const showMovie = document.querySelector('#listofmovies');
    updateUi(showMovie);
    
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

// Output from user, to a "i have watched this movie list".
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
            </li>
        </article>`
        watchedMovie.insertAdjacentHTML('beforeend', deletedMovie);
        
    })  
}

// If the title matches a movie in the database, this is the different outcome.
async function manageTitle(userSearch) {
    const userInput = await checkIfTitleExists(userSearch);
    console.log(userInput);
    const userTitle = userInput.id;
    const article = document.querySelector('#searchInfo')
    
    if (userTitle) {
        hideMain();
        userInput.innerText='';
    
            const input= `
            <article id="searchInfo">
                <h1>You searched for the movie: " ${userInput.data().title} ", the movie is saved in your favorite list! </h1><br>
                    Title: ${userInput.data().title} ||
                    Genre: ${userInput.data().genre} ||<br>
                    Date release: ${userInput.data().releaseDate}<br>
                    <button onClick="window.location.reload()"> GO BACK</button>
                </article><br>`
            article.insertAdjacentHTML('beforebegin', input);
  
    } else {
        hideMain();
        const wrongInput =` 
        <article id="searchInfo">
            <h1>The movie you searched for could not be found in your favorite list! </h1><br>
        </article><br> <button onClick="window.location.reload()"> GO BACK</button>`
            article.insertAdjacentHTML('beforeend', wrongInput);  
    }
}

export { showDeletedMovie,removeMovieFromDatabase, getMovie, manageTitle, saveToDatabase, movie}