// Variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event listeners
eventListeners();

function eventListeners(){
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    });
}

// Funciones

function agregarTweet(e){
    e.preventDefault();

    // Text area donde el usuario escribe

    const tweet = document.querySelector('#tweet').value;

    // Validación
    if(tweet === ''){
        mostarError('El mensaje no puede ir vacío');
        return; // Evita que se ejecuten más líneas de código
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // Se crea el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();

}

// Mostrar mensaje de error
function mostarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra una lista de los tweets
function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach(tweet => {

            // Agregar un botón de eliminar
            const btnEliminar = document.createElement('A');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // Agregar la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
            
            // Crear el HTML
            const li = document.createElement('LI');

            // Agregar el texto
            li.innerText = tweet.tweet;

            // Asignar el botón
            li.appendChild(btnEliminar);

            // Insertar en el HTML
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

// Agrega los tweets actuales a local storage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}