const pako = require("pako");
const express = require("express");
const zlib = require("zlib");

const app = express();
const port = 3001;

app.get("*", (req, res) => {
    var input = req.path.slice(1);
    var decomp = new Promise((resolve, reject) => {
        var compressedData = Buffer.from(input, "base64");
        try {
            var stringValue = compressedData.toString("binary");
            var charArray = stringValue.split("").map(function (x) {
                return x.charCodeAt(0);
            });
            resolve(pako.ungzip(charArray, { to: "string" }));
        } catch (error) {
            zlib.brotliDecompress(compressedData, (err, data) => {
                if (err) {
                    resolve("It's not compressd text");
                } else {
                    resolve(Buffer.from(data, "base64").toString("utf8"));
                }
            });
        }
    });
    decomp.then((value) => {
        res.send(value);
    });
});

function gzipToText(input) {}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
