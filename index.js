const pako = require("pako");
const express = require("express");
const zlib = require("zlib");

const app = express();
const port = 3001;

app.get("*", (req, res) => {
    var input = req.path.slice(1);
    if (input == "") {
    	res.redirect("https://gzip.obtuse.kr/G8MZIJyFsXtiUlZXpkOUxYvYdr9c/r2X03y+kZVoxdiK2QkSNqGL5MGkngRRSOkUH5Cu6SJ1dnTvp5YqeoLnH/Aa8IHd7MzO1ZJWys7O7LtSiwVLBwsFMYAxC33AYADPxlDr3D9woR5gTJMfhpdg/IUnmgMAY4a0exhsBy4ATCOS7d86LogcljwxIiIlH7O7hXFc+EmRfrD+Uu3d9SmfmIN8dSmlL9GjQbGB7zkkkRq0kv5dy2nDP9T1lkWIUIhYCkC2R3aj9uGvc2IQhwVn6dYciJcyyp4qnwOoLwjqS9l61cT/tZQdzti4L/pMSM8aZfEXJ/th59hcb9NDdIjWxqZa+sAc1zPtRN5+GDzw8bhT7wgwrZlnTQ5XX/w8qDyIz0wqKuIshhRdwH7qsrMcHZR8BEVJDkDHS344sAQVZLZ3rkNfvuv0l0auOG5xxomfvgOM+ejQC/oMAy7elKAQsMiPyya9kh6rYQkcOqlIWMXwmuSci36vqq4hFJpWKuNne5tu4eEFhhPrLZxGW8Yg9G1B2vYOtULrZIcF9T4PnlW7Y7xWvom80psgA6CH2A8Youp/VTIxyqrpJ4e9nlHVKxosf3pLKk+WR2QyGQ7WAzLL6QKHQnMItjk6rzbEWcXCD1KxN0bwnTWryjcUnnNHa8SgGuyLAwPV7KQiZrLD4AUoLTbnhYayTYssL1H86xQMh5jnJykf3RMeXgFxPYKd/kDabJpj1CN81+IMHX7qWladrbjFDtoZ+oFKGmhZQ7MFpAYFagjuJ7sgO1uf33UlrjNxibmziTs3N24mfrxZQH/RAB32/VLqI2CT/XvjwMCvUdKcvb4H7WrKo/V4epJJ7mvMQMmr21vAGAMiSMWxxPMyAkpdHXrC9+xZmTYuX90rAQDCnU5ZXP71KJ4RPsbBmxRlLL3ZD+VRtGeFPKNQbrR85mKp76rwI4BuFZl9yc1bPw9t/BvmNjOAzIQ1BPtnxU5gF2Q88wmBIQh0nIbF+Hq4jSXIfQH7sI/vG1cfEN10Kv3wzBsM0o9l09NGf6IEZsSrJM5wbqF0QYtPEAs2vrcrGLJw7YUHzURMEcxbzfWdhvuds/u1zjhDWIRzMnTCiDxB1SgssckwB8lybSl/ATQLIyQrtC7gMRHPW2fes8g0iUt1N1EpJoH3k2xFJNd3nRHpQrN68O/fMkqtRUzSsdAapV8cqKNADB386A2xb99oHppZFCArm8fBmYVrGQm1uGCUCqfjsbSAdg71UtFREQmm0v7OWiIgQKaDo9+UWB0X7eiXg80e43QcW2gfful1gVGm1ULRqRFEm0IMQKYIf4AiX1pcjlgUCcGjAAuQvOC0K+iQi529DxWgyVBHglGgq+kvzrit+UdcK2w6ESuXNGj0uAa8pKRPKhXwq36jtD+lhGUi1iPUU1b++0nitfr2xAu2NUlBwbjAJ0ocor4K5sRDOP0a4oneXtTcy4a8MfhbY1LrXuPmqSRXWPwahSr9DuYA/q9A4ScjoeELWT4ui3O9PFx6/vTs5rbyZjHPPpdm05W34mb30jYfp+dN+bp/LE72du6teT68rdzwqIt0IZyf3h4mu8Xb1mKXPRa5bNzpztLD/n3VyJqxoF3rKP7vEXFjnyTzPYnxv4TojHXjrwa0IQ9Ti0pT2NbXhtuTd2uUbBs3XPYm3ZeAmZ1JK6Uhr4Y6ENdem58BVLT+qBpua33+T7kPS7S98/OMAjI/l1605Of1H+WBPUeoQ6XDBh2agVfV8WZJEjXoNDCAtJmU4Hw/QRQRK5dEC+w/Lpzje7Oz7axGzp8L71Cr8TsPZjNTyAZjnXiXYkgNzoZwOzO02LSb30EMS7DQKhjVx0BasF9FhQcGPnLskyK/ycmdwIt8kcz4fWOUPki/uSSXir+3O1PForOVlgqXPkJTa7Cz47mA9Mxzk70si09sCD8=");
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
