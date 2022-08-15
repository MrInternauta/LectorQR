const socket = io('http://localhost:5000');
const generateBtn = document.getElementById("generateBtn");
const dataBox = document.getElementById("dataBox");
const downloadBtn = document.getElementById("downloadBtn");
const qrcode = document.getElementById("qrcode");
const qrdiv = document.getElementById("qrdiv");
const vinculado = document.getElementById("vinculado");
vinculado.style.display = "none";
const errorClassName = "error";
const shakeClassName = "shake";
const dataBoxClassName = "dataBox";
const toHideClassName = "hide";
const qrdivClassName = "qrdiv";
var QR_CODE


socket.on('connect', function(){
    console.log("conectado al servidor sockets");
    // Escuchar nuevos pedidos creados
    socket.on('generateQR', function(QrCode){
 
        QR_CODE = new QRCode("qrcode", {
            width: 260,
            height: 260,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
        });
        function generateQRCode(data) {
            QR_CODE.clear();
            QR_CODE.makeCode(data);
            // Show QRCode div
            qrdiv.className = qrdivClassName;
        }
        let QRcodeS = {
            value: null,
            letMeKnow() {
                if (this.testVar !== null && this.testVar !== 'clear') {
                    let images = qrcode.getElementsByTagName("img");
                    var l = images.length;
                    for (var i = 1; i < l; i++) {
                        images[0].parentNode.removeChild(images[0]);
                    }
                    vinculado.style.display = "none";
                    generateQRCode(this.testVar);
                }else {
                    let images = qrcode.getElementsByTagName("img");
                    var l = images.length;
                    for (var i = 0; i < l; i++) {
                        images[0].parentNode.removeChild(images[0]);
                    }
                    while (qrcode.firstChild) {
                        qrcode.removeChild(qrcode.firstChild);
                    }
                    vinculado.innerHTML = "Dispositivo vinculado";
                    vinculado.style.display = "block";
                }
              console.log(`The variable has changed to ${this.testVar}`);
            },
            get testVar() {
              return this.value;
            },
        
            set testVar(value) {
              this.value = value;
              this.letMeKnow();
            }
        };
        QRcodeS.testVar = QrCode;
    });
});

// Simulación de pedido actualizado
// socket.emit('generateQR',
// {}, function(QR){
    
// });




socket.on('disconnect', function(){
    vinculado.innerHTML = "Sin conexión";
    vinculado.style.display = "block";

    alert('Desconectado del servidor sockets');
    console.log("desconectado al servidor sockets");
});


