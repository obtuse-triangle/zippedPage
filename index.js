const pako = require("pako");
const express = require("express");
const zlib = require("zlib");

const app = express();
const port = 3001;

const KOPage = `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`;

const ENGPage =
    "/G8QdAByHsfOkCasvkjdCMY7639zqzuX0N2stkhpiYUQ1bUPJEOE1KXiANEiKTxe/Wn6zSakzEhuyMChLT8/0pRgUVTP7evfCftL+T1oOsqLOQVYhKQprkRr1hUQikZgMVxk9Uf4PCxLoJC1dVfzrTWDYVgkApoY0WQrhQThAAgXldseO83LHrBfMRLTl5/auJ1UeJspFWp8t+eTh9ryipArlGwkZ1NG3JanCP+aY6g05Q35eTaQ3oWPtpdzYv0ANRiYrbvkAQGLox+BTTZkQNGeckEKPrWDZ45LZ5oU4wk1HRzZM3DsLqb8F3C4IMiPaCMJaEl2KdqWV1c8v7u7TXDbDYNEaDzvT6G7/Wo3m55ej5OfwND472HtU8vX4PtWVk9srv2Euz++Pvf1outMsgucoZCN9vtd6OnxMRywjhLbpXnznlRFuiQjneJHZbJkgpWvOXmBlJe4fLJPxBMhdd1lqc6FQk3H28+M411bw2owauR3gCAfjYf+MxV2e+bkdeX18XO5IF8gAJObmG90eOerLeXHey4KNXp3nrUrWcpwDgYj+Y1biUEjbUKQROW/IWRK27W/CeWNO6n7NtVS+XLMsNyzfbuEQ+yxLYZz5Di5kiuNCpYKlJq86VaQpnR0cTDKTCyAQwbolWWjQ4HYlGZpiWGbFYsJ7dPy/dIcknQvM9a2VNAglOIwGXvASDrrtYWyDgA4n7ogmcwj9X0zVx1IXaPyN3LHqxXKa8sJ0EzpwUy+HHFCum1sV+Aum4uAneLVrZYNcBgxf1gOXgZxTenEejNTLtyTCUkcRYManBxSnJdsbga2q/PYuHojXNIR2tMxQeMBwC+FkDn64IuC/OoBRO7T0jV9sOnyL3GjvzvoweDWwq6F2oaBoiz+tzuNQYh7TF4hqhEumTo9hjZpdcc1FHVjDzp5XPxIsATQQRG8PInt3GsDAoYa34/p6kyIf2rAqAIO09Gq1Jc/VuECY5WNzs75H6J9S/BdUBTLGoEIctl5vN4pgXHbwEKYVW91TgFYzJFq9kIBk92u922qAh1mjIDxJA+IslpEoSE7PmlFF09TD7fkvtRWIXa81eO5EkOjwAPR3PUysIeFhgQG3ANjdhO8wrTBlSwyRDCB7P0dlWRQRvgWjy8qgQ6urA2lj4rgIeJqcL0KoDGyMjOlw4UDM+74EJNSKJTROHgAooiZi1C7+E6EndsyK7BmPXvnkRcQe4wtqNxRxZXjg7GdJVCinQBvwBhfICTWHk96PdeK7SHX0sndwulYiWCOjY4gKfasfbg0VrkDNAdHC4oaM21ER4/Nf1rEtDKvZnFOVCeZ1vA6UCoGva/aGo6h04jmauiEZH4oJol9/WuIwd6Q5kEm7Ak4jEPkzKSCgR5ngSMxIID5pFzADFuakWCkdgzzLv38l6zmOo4CA8WVHVVf7AZqZOUaOt1uVOGTO3t2dY8upIXWDPTr30p2gZnR+CazILxOCuqmYCMTRjwYb3Wp27Vk2PpLQmaMCv1QUIwip6e6ELsd3YfPS45JgFqxahSYttR+ooTU1b+kaAACzXHBl29di5XCc4+414VjMkqByoG85yTT0bvQDxOTcRotWd9HZSC3GJjVlNTRr875AILaaOka2wh0gIk+4MxhFYbPD7T99+6haIOD3LPSB6Rq/bKFCorDVbLtK7cUJ03lFsheNheaDmaupxyj2Fxg2RXxZuNttNRFrYOGthq1eXVE9pSFUQpEb86BWGwqwBmfrmKqMzvEglMG1kAzkYlHnJEIsMnTcfNWa5WIhqRp4yESXbKxp7Dq8wo20QC2eek6hZNptKkZRWZ4USH9cL4f7ciXzl9LcPLGatjwXHo3L89GNY+X5/YdSUz/***UWG5MIZjans5BhSZnqf8Ep3cfjSo9CDVYSpEQgaCjTNE48MKoY21errVuEMZlbTEkqVEIOqYCHzE/OKtD4JFkvl62y1LC5VSZad0J5QAb9KhbTLJLySv0qaWhH8HCsOmZPfv60TGiB1NIF9CEa7s1JS20RtoxHVWClWOq4FjidQNn7qBY3G7CEaXhEIJjUpPQRn7NyxYBiub2XLSFGdIjzZPA70GG/wpoy3Ra8Ty3HY8zj0EFWwqh0r78I4QDvI8VEVe2brqCLQaF56+rhg518XFcMjy3ZjnCfjz9hZnHLghQbiF9SCwt3+XkPY+K7lPUMcq8eFxQERwcgWv4MFv7LYT+HyaEuMauUEX";

app.get("*", (req, res) => {
    var input = req.path.slice(1);
    input = input.replaceAll("/***", "//");
    if (input == "") {
        if (req.acceptsLanguages()[0] == "ko") {
            res.redirect(KOPage);
        } else {
            res.redirect(ENGPage);
        }
    } else if (input == "ko" || input == "en") {
        if (input == "ko") {
            res.redirect(KOPage);
        } else {
            res.redirect(ENGPage);
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
    }
});

function gzipToText(input) {}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
