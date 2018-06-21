var codigo = '';
navigator.getMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia);

navigator.getMedia(

    // Restricciones (contraints) *Requerido
    {
        video: true,
        audio: true
    },
    // Funcion de finalizacion (Succes-Callback) *Requerido
    function (localMediaStream) {
        var video = document.querySelector('video');
        video.src = window.URL.createObjectURL(localMediaStream);
        video.onloadedmetadata = function (e) {
            // Haz algo con el video aquí.
        };
    },
    // errorCallback *Opcional
    function (err) {
        console.log("Ocurrió el siguiente error: " + err);
    }

);

var _scannerIsRunning = false;

function startScanner() {
    Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                // Or '#yourElement' (optional)
                target: document.querySelector('#scanner-container'),
                constraints: {
                    width: 700,
                    height: 200,
                    facingMode: "environment"
                },
                area: { // defines rectangle of the detection/localization area
                    top: "0%", // top offset
                    right: "0%", // right offset
                    left: "0%", // left offset
                    bottom: "0%" // bottom offset
                },
                singleChannel: false // true: only the red color-channel is read

            },
            decoder: {
                readers: ["code_128_reader"]
            }
        },
        function (err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
            _scannerIsRunning = true;
        });
    Quagga.onProcessed(function (result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;
        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(
                    drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, {
                        x: 0,
                        y: 1
                    }, drawingCtx, {
                        color: "green",
                        lineWidth: 2
                    });
                });
            }
            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, {
                    x: 0,
                    y: 1
                }, drawingCtx, {
                    color: "#00F",
                    lineWidth: 2
                });
            }
            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, {
                    x: 'x',
                    y: 'y'
                }, drawingCtx, {
                    color: 'red',
                    lineWidth: 3
                });
            }
        }
    });
    Quagga.onDetected(function (result) {
        console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
        document.getElementById('imprime').innerHTML = result.codeResult.code;
        var codigo = result.codeResult.code;
        codigo = parseInt(codigo.substring(6, 13));
        activofijos(codigo)
    });
}
// Start/stop scanner
document.getElementById("btn").addEventListener("click", function () {
    if (_scannerIsRunning) {
        Quagga.stop();
    } else {
        startScanner();
    }
}, false);


var ArAF = [];
var m = '36705';
var resultadoFinal = '';
activofijos(m)

function activofijos(codigo) {
    var datos = {
        datos: codigo
    };

    $.ajax({
        url: "php/activofijo.php",
        type: "get", //send it through get method
        data: datos,
        success: function (result) {
            var m = JSON.parse(result)
            resultadoFinal = m[0];
            if (resultadoFinal == undefined) {
                //  rellenar()
            } else {
                rellenar(resultadoFinal)
            }
        },
        error: function () {
            alert('error');
        }
    });
}

var contscaner = document.getElementById('contenedor');
var continfo = document.getElementById('contenedorinfo');
var Activofijo = document.getElementById('Activofijo');
var TipoAF = document.getElementById('TipoAF');
var Sociedad = document.getElementById('Sociedad');
var Departamento = document.getElementById('Departamento');
var Ejercicio = document.getElementById('Ejercicio');
var selSubtipoAf = document.getElementById('selSubtipoAf');
var selMarca = document.getElementById('selMarca');
var selModelo = document.getElementById('selModelo');
var selSO = document.getElementById('selSO');
var selDisco1 = document.getElementById('selDisco1');
var selDisco2 = document.getElementById('selDisco2');
var selDescripcion = document.getElementById('selDescripcion');
var selMemoria = document.getElementById('selMemoria');
var selNumserie = document.getElementById('selNumserie');

function rellenar(dato) {

    Activofijo.innerHTML = dato.ACTIVOFIJO;
    Sociedad.innerHTML = dato.NOMBRESOCIEDAD;
    Departamento.innerHTML = dato.NOMBREDEPARTAMENTO;
    Ejercicio.innerHTML = dato.EJERCICIO;
    TipoAF.innerHTML = dato.NOMBRETIPOAF;
    selDescripcion.value = dato.DESCRIPCIONS;
    selMemoria.value = dato.MEMORIA;
    selNumserie.value = dato.NUMSERIE;

    for (let i = 0; i < Arsubtipo.length; i++) {
        if (parseInt(Arsubtipo[i].TIPOAF) == parseInt(dato.TIPOAF)) {
            if (Arsubtipo[i].SUBTIPOAF == dato.SUBTIPOAF) {
                var option = document.createElement("option");
                option.text = Arsubtipo[i].NOMBRE;
                option.setAttribute('value', Arsubtipo[i].SUBTIPOAF)
                option.selected = true;
                selSubtipoAf.add(option);
            } else {
                var option = document.createElement("option");
                option.text = Arsubtipo[i].NOMBRE;
                option.setAttribute('value', Arsubtipo[i].SUBTIPOAF)
                selSubtipoAf.add(option);
            }
        }
    }

    for (let i = 0; i < ArMarca.length; i++) {
        if (ArMarca[i].MARCA == dato.MARCA) {
            var option = document.createElement("option");
            option.text = ArMarca[i].MARCA;
            option.setAttribute('value', ArMarca[i].MARCA)
            option.selected = true;
            selMarca.add(option);
        } else {
            var option = document.createElement("option");
            option.text = ArMarca[i].MARCA;
            option.setAttribute('value', ArMarca[i].MARCA)
            selMarca.add(option);
        }
    }

    selMarca.addEventListener('change', function () {
        selModelo.innerHTML = '';
        for (let i = 0; i < ArModelo.length; i++) {

            if (ArModelo[i].MARCA == selMarca.value) {
                var option = document.createElement("option");
                option.text = ArModelo[i].MODELO;
                option.setAttribute('value', ArModelo[i].MODELO)
                selModelo.add(option);
            }

        }
    });

    for (let i = 0; i < ArSO.length; i++) {
        if (ArSO[i].SISTEMAOPERATIVO == dato.SISTEMAOPERATIVO) {
            var option = document.createElement("option");
            option.text = ArSO[i].SISTEMAOPERATIVO;
            option.setAttribute('value', ArSO[i].SISTEMAOPERATIVO)
            option.selected = true;
            selSO.add(option);
        } else {
            var option = document.createElement("option");
            option.text = ArSO[i].SISTEMAOPERATIVO;
            option.setAttribute('value', ArSO[i].SISTEMAOPERATIVO)
            selSO.add(option);
        }
    }

    for (let i = 0; i < ArDisco.length; i++) {
        if (ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD == dato.DISCO1) {
            var option = document.createElement("option");
            option.text = ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD;
            option.setAttribute('value', ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD)
            option.selected = true;
            selDisco1.add(option);
        } else {
            var option = document.createElement("option");
            option.text = ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD;
            option.setAttribute('value', ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD)
            selDisco1.add(option);
        }


    }

    for (let i = 0; i < ArDisco.length; i++) {
        if (ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD == dato.DISCO2) {
            var option = document.createElement("option");
            option.text = ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD;
            option.setAttribute('value', ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD)
            option.selected = true;
            selDisco2.add(option);
        } else {
            var option = document.createElement("option");
            option.text = ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD;
            option.setAttribute('value', ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD)
            selDisco2.add(option);
        }
    }

    for (let i = 0; i < ArModelo.length; i++) {
        if (ArModelo[i].MARCA == selMarca.value) {
            var option = document.createElement("option");
            option.text = ArModelo[i].MODELO;
            option.setAttribute('value', ArModelo[i].MODELO)
            option.selected = true;
            selModelo.add(option);
        }
    }



}

function guardar() {

    var infoParaEnviar = {
        Activofijo: m,
        selSubtipoAf: selSubtipoAf.value,
        selMarca: selMarca.value,
        selModelo: selModelo.value,
        selSO: selSO.value,
        selDisco1: selDisco1.value,
        selDisco2: selDisco2.value,
        selDescripcion: selDescripcion.value,
        selMemoria: selMemoria.value,
        selNumserie: selNumserie.value
    }
    $.ajax({
        type: "POST",
        url: "php/update.php",
        data: infoParaEnviar,
        dataType: "text",
        asycn: true,
        success: function (result) {

        }
    });

}