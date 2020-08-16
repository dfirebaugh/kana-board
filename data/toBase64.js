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
        mnemonic: base64_encode(`./data/images/mnemonics/${kanas[key].roumaji}.jpg`)
    });
})

const OutputString = `export default ${JSON.stringify(kanasObj)}`;

// console.log(OutputString)
fs.writeFile(`./data/kanas_with_images.js`, OutputString, function (err) {
    if (err) {
        console.error(err);
    }
})