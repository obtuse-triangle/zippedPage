const pako = require("pako");
const express = require("express");
const zlib = require("zlib");

const app = express();
const port = 3001;

app.get("*", (req, res) => {
    var input = req.path.slice(1);
    if (input == "robots.txt") {
        res.sendFile(__dirname + "/robots.txt");
    }
    input = input.replaceAll("/***", "//");
    if (input == "") {
        if (req.acceptsLanguages()[0].includes("ko")) {
            res.sendFile(__dirname + "/index_ko.html");
        } else {
            res.sendFile(__dirname + "/index.html");
        }
    } else if (input == "ko" || input == "en") {
        if (input == "ko") {
            res.sendFile(__dirname + "/index_ko.html");
        } else {
            res.sendFile(__dirname + "/index.html");
        }
    } else {
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
                        reject();
                    } else {
                        resolve(Buffer.from(data, "base64").toString("utf8"));
                    }
                });
            }
        });
        decomp
            .then((value) => {
                res.send(value);
            })
            .catch(() => {
                if (req.acceptsLanguages()[0].includes("ko")) {
                    res.status(404).sendFile(__dirname + "/error_ko.html");
                } else {
                    res.status(404).sendFile(__dirname + "/error.html");
                }
            });
    }
});

function gzipToText(input) {}

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
