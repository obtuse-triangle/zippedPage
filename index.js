const pako = require("pako");
const express = require("express");
const zlib = require("zlib");

const app = express();
const port = 3001;

app.get("*", (req, res) => {
    var input = req.path.slice(1);
    if (input == "") {
        res.redirect(
            "/G/wZIByHsXtkUm4gyuJFbPt/zeyey+kv23CKdZKOKbWCMkqG4gNMN0EUUtJF6uzo3k8tVfQEzz/gNeADu9mZnWs9rbSdndl3pRZLrHSwUBADGLPQBwwG8GwMtc79AxfqAcY0+WF4CcZfeCyfAgBjhrR7GGwHLgBMI5Lt3zouiByWPDEiIiUfs7uFcFz4SZG+v/oSzeXZAZ+Yg3x1KaUv0aNBoYLvKSSRGjQf/13MKUU/1PWWGYhQiFgKQLZHdiN24a8x14vDvJN4aw7ESxllT5XPAdQXOPEldLVg4v9ayg5mqMwXfSakZ5TQ+IuT/bBzbLa38SE6RGt9Y8l9YI7rmXY8bT4MHvh4zLF3BJjWzLMmh6svfh5UHsRnJhUVcQaFii5gP3XZWeoNlHwERUkOQMdLfjiwBBVkpneqQ1+67OCXRq44bjHGiZ++A4z56NAL+gwDLt7gIDxgkR+XTXolPVbDEjh0QqAcqxhek5xz0e8V5TWEQtNKZfxMb+MtPLzAcGK9hdJoyxiEvslQvmaNlwKtkx0WVHvcvhPNjvFa+SbySm+CDIAeYj+gkKr/VVGuhBbjTw57PaOqVzRY/vQWWJ4sDVA+GQ7WAzLL6QKDQnMQtjkarzbEWcXCD1Kxuw/gO2tW5G9eeM4eLBKDarAnCgRUsxMCBTPZYfAClBab80JF2aZFlpco/nUKhkPM8xOYDu4JD6+AuB7BTn8gbTbNMWg59Kag7+RcUlfvUP/wXZIz3H3qjJetLqn2Hbsz9AOVO9DOBmcLCA+K1yDcT7SOd9I+t2EKv87EJebqBq6fn7sZ/95mHt1FCnTf94uxDYDke6gk87OLlGQRvI9QmgrTwMlYOpIJ7mraQEGr6RtACAHEUIWzxPOSB891fOhB37OpZeGYLExUAgC4263Qfu7Xqnia2RA/b2DPQ+7NXjANgj0r8hmFcr2hExNqC67qPwTeLECzPblx0M1DG/+GmM00QDNvDcH+WaFhvnU8nNgIQR+YNxS7xdg6mI4lyH0B+76P7RuP72PteMztcNDrBOKPOZPVRn+8AGL8qyTO4G7BdEFLURALNtq3CuiTcO2FB81LTBHMk8219Zra9bP7ddA4A1qEc8K1zPg8jsUgLLHJMAfJ4m0pfnE080MoK7Su4zHVgLdgjktRq4tZdTdeLl6B9xOsRSvXd50R6cK2evDv3xKMtSVNUrVQG6VmHKijQKyJTfe+QWSd87g7M1ApI6EWFwxS4XQsmhbQzqFeKjoqIsFU2t9acg8eINPB0W9KtI6LdvTLQWePcTqOzbcLv7gu6CjTqqHo5IBHm0IfgEyR/wGydHZmLqBRJASPAl/gyQtOu4IOueiZu1ABmhp1JBgBuqj+4oTqin6ElfB1y0JhotorOawBLwhuo1I4/1W/UdqtUsIyEesR6ilK//2k9FptO+R53aiooGBc4BMlDlFfBXPiIZx6deHEci9IankD4Cj0LTWpVbBx80SUysx8jUKVfgdzDv9XIPwnQa6m00k6LLIjOdeffXRweH5RWjWTJp+zk/H8W3a+caLrj4Ojunjd2mP7m+tXWt3tXJSmv9txPO2ODi52oo3sbXWmTW6ylNfmYH32euuqrHlFSNCuVRX/Z4m4kVCS+R7I+N9FdFqb4VcD2pCHqUWlyW3rS0X1icslSrYNGzx7o/ZLwMzOqHXTkFeDHYhr583PACoae1gV1ZU8/6fUuiXa7Pl5RgGZn0svWvLz+o9Sx55D1Hoh3QYdWoFX1/FmiCI16BQQgLTpGOF8PwqIImLlImuA/KeGc3xvtLqZVMj5c2aNl2L4Tp1aSWSSwV/H3zkbwoOzL9wemKHFql397mJIgkmrYEQbA2nBfhVmFgjYwLFPivwmJ3cc9/JFMuP3DT23jtuVWalY/L3ZqjJkrS6lVLj4OIBTa7Cz47mA9Mxzk70si090MCg="
        );
    }
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
