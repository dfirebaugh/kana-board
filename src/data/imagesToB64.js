/**
 * build script for compiling the images to base64
 */

import kanas from "./kanas.js";
import fs from "fs";

// function to encode file data to base64 encoded string
function base64_encode(file) {
    if (!fs.existsSync(file)) return;

    var bitmap = fs.readFileSync(file);

    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

const kanasObj = {
}

/**
 * attach base64 of image to each object
 */
Object.keys(kanas).forEach(key => {
    kanasObj[key] = Object.assign({}, kanas[key], {
        mnemonic: base64_encode(`./src/data/images/mnemonics/${kanas[key].romaji}.jpg`)
    });
})

const OutputString = `export default ${JSON.stringify(kanasObj)}`;

fs.writeFile(`./src/js/kanas_with_images.ts`, OutputString, function (err) {
    if (err) {
        console.error(err);
    }
})