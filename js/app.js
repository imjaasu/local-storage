// Variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event listeners
eventListeners();
function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);
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
            
            // Crear el HTML
            const li = document.createElement('LI');

            // Agregar el texto
            li.innerText = tweet.tweet;

            // Insertar en el HTML
            listaTweets.appendChild(li);
        })
    }
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}