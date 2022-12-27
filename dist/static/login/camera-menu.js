// state 1 = on, 2 = camera slash

const camera = document.getElementById("camera")
const camera_slash = document.getElementById("camera-slash")
const qr_reader = document.getElementById("qr-reader")
const qr_helper = document.getElementById("qr-helper")

function camera_click(state) {
    if (state) {
        qr_helper.classList.toggle("hidden")
        camera.classList.toggle("hidden")
        camera_slash.classList.toggle("hidden")
        qr_reader.classList.toggle("hidden")
        docReady(function() {
            var resultContainer = document.getElementById('qr-reader-results');
            var lastResult, countResults = 0;
            
            var html5QrcodeScanner = new Html5QrcodeScanner(
                "qr-reader", { fps: 10, qrbox: 250 });
            
            function onScanSuccess(decodedText, decodedResult) {
                if (decodedText !== lastResult) {
                    ++countResults;
                    lastResult = decodedText;
                    console.log(`Scan result = ${decodedText}`, decodedResult);
                    
                    camera.classList.toggle("hidden")
                    camera_slash.classList.toggle("hidden")
                    qr_reader.classList.toggle("hidden")

                    resultContainer.value  = decodedText
                    
                    // Optional: To close the QR code scannign after the result is found
                    html5QrcodeScanner.clear();
                }
            }
            
            // Optional callback for error, can be ignored.
            function onScanError(qrCodeError) {
                // This callback would be called in case of qr code scan error or setup error.
                // You can avoid this callback completely, as it can be very verbose in nature.
            }
            
            html5QrcodeScanner.render(onScanSuccess, onScanError);
        })
    } else {
        camera.classList.toggle("hidden")
        camera_slash.classList.toggle("hidden")
        qr_reader.classList.toggle("hidden")
        qr_helper.classList.toggle("hidden")
    }
}

camera.addEventListener("click", () => camera_click(1))
camera_slash.addEventListener("click", () => camera_click(0))