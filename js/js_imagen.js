window.addEventListener('load', function () {
    console.log('El contenido ha cargado');

    let imagenes = [];
    imagenes[0] = '../src/imagen.jpg';
    imagenes[1] = '../src/imagen.jpg';
    imagenes[2] = '../src/imagen.jpg';

    let indiceImagenes = 0;

    function cambiarImagenes() {

        document.slaider.src = imagenes[indiceImagenes];

        if (indiceImagenes < 2) {
            indiceImagenes++;

        } else {
            indiceImagenes = 0;
        }
    }

    setInterval(cambiarImagenes, 3000);

});