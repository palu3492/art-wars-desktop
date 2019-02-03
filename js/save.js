
const fs = require('fs');

const {dialog} = require('electron').remote;


function saveImage() {
    const url = canvas.toDataURL('image/jpg', 1.0);

    dialog.showSaveDialog(function (filename) {
        if (filename === undefined) {
            return;
        }
        // Remove Base64 stuff from the Image
        const base64Data = url.replace(/^data:image\/png;base64,/, "");
        fs.writeFile(filename, base64Data, 'base64');
    });
}