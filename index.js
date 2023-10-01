const pako = require("pako");
const express = require("express");

const app = express();
const port = 3001;

app.get("*", (req, res) => {
    res.send(gzipToText(req.path.slice(1)));
});

function gzipToText(input) {
    try {
        var stringValue = Buffer.from(input.trim(), "base64").toString("binary");
        var charArray = stringValue.split("").map(function (x) {
            return x.charCodeAt(0);
        });
        return pako.ungzip(charArray, { to: "string" });
    } catch (error) {
        return "Value is not a valid GZIP compressed text.";
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
