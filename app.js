//Declaracion de variables
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 0;

//Main
condicionesIniciales();

//Funcion para modificar texto HTML
function asignarTextoElemento(id, texto) {
    let elementoHTML = document.getElementById(id);
    elementoHTML.innerHTML = texto;
}

//Boton de intentar
function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById('txtNumeroUsuario').value);
    if (numeroUsuario === numeroSecreto) {
        asignarTextoElemento('parrafo', `¡Acertaste! lo hiciste en ${intentos} ${(intentos == 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroUsuario < numeroSecreto) {
            asignarTextoElemento('parrafo', 'El número secreto es mayor');
        } else {
            asignarTextoElemento('parrafo', 'El número secreto es menor');
        }
        intentos++;
        limpiar('txtNumeroUsuario');
    }
}

//Funcion que genera numero secreto sin que se repita
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('parrafo', 'Ya se sortearon todos los numeros posibles');
    } else {

        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

//Funcion para limpiar campos
function limpiar(id) {
    document.getElementById(id).value = '';
}

//Funcion para reinicar el juego
function reiniciarJuego() {
    condicionesIniciales();
    limpiar('txtNumeroUsuario');
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

//Funcion para establecer las condiciones iniciales
function condicionesIniciales() {
    numeroMaximo = 10;
    intentos = 1;
    asignarTextoElemento('titulo', 'Número Secreto');
    asignarTextoElemento('parrafo', `Selecciona un numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
}
