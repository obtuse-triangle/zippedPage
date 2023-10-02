const pako = require("pako");
const express = require("express");
const zlib = require("zlib");

const app = express();
const port = 3001;

app.get("*", (req, res) => {
    var input = req.path.slice(1);
    if (input == "") {
        res.redirect("https://gzip.obtuse.kr/G+AZIJyHsTOiE0YXukMJg7fR/Zr591xO8/kNt9lSGpvS2gkUlSzFB2O6CaKQ0ik+IF3L5Wxpv1cLaGyNrP9CloSucA1cijxgulxy7w2IHbJwU5Ny1k19IScnZG0Mtc79AxfqAcY0+eF4icZf2K85ADBmyLCHw3aQAiA0KtnhreOiyFHJUyMicvIpuwcYx5WfHOnd6y/V3l2f8kk4KFdMKX+JHz2aGPiewxKpRyvJ37UsM/xDXR9YhAiDSKQAZHtid9o+/LucGsThmtNk6w4kSBljz5UPAeorgvpStl418X8rZc9nbNwXfSGkK4yy+EuT/fBz7Epv1SE5ROveKi19EI7bmbaQtR8GD3x81ol3DJjezPMmR6ovfR5VHsJnIVUV8TKGFF3Afu6yczM6KPkEipocgE6W8kCwBBXkcu9ch153d336SyM3HA844yRM3wHGfET0gj7DgItbJCgELArjsmmvtMdmWAqHligSVgm8ZjmXoj+pymsMha6VyfjLvVVbeASBgWJ9gNNYyxSEnihI296hVmid7bCmfsqDZ9XuBK+NbxKv7CbICOgh9jOGqPoT8VRLuFL1yeGgZ7QNiobIn8mCypObIzKdDIfoAYXldI0joVnCtkIX1IY0q0T4QSqejBF8Z81t5RsKzytHa8SgGjwVBwaq2RJFzGSHwwtQWnzOaw1nmxVZWZL4tykEDinPl1A+umc8ggKCPYJRf2BtNs8xaDn8pqAv5Ubz0OxI/whdkgvcfe5alp0tucWO3QX6QcodaGflbAHhQfEq4b6kC7KT9qpdV+C6EJeUq/dx5+bGzbkfb66hv0iB7vthKfURsOkeKsm1+TVKtgg+xES7mvLIydn0JOe5r2kzBa+mJwBjDIggFc4Tz3UIKHV86EE/sWdl4Vl5mGgFAAjbO2Vx+dequFz4CX5uoSgn0punoTyK9qLIFxTK5pbP3ERbwKq/F6BbRWZ78v6tn4c+/p3kNu8GAh2nweuz66E4FWn8AvVvP7tvzN1NdFUl/bDOzQySj2Wz1Ee/UAAz8E0SNKoHKF3UGhTFQgzzhxUMWbj+AkImJKUI5rtm007D/c4Zf+UzaCSrcJaEThiYC1SNwlKbAnOJrdqB4pdDc22EZIXVPTwl/mWLpr+IU5coNXfnKkUo8P48W/EpddpmRL5AbR/8+3cTpdZaZslZa52SMQ3GSbC1RCO+NxBb4DJ+zmW4loNQU2tGuZB5NpYWEA2RLRcBDdh3lfYX1hIBQTAfAMOmwdrY50e4Sm35OHatffgldcFGmUELRUtHEG1qMQKZOvwJ8mxpcTliUSQGjxqsQfZC0m6gQyX28n2oAM2JNhKcBrqh/uaM25p/TGqFTScmysUNGj2uAUco6eNSBfxq2BhtUzlhuYjtCE0Upf9hcnmDvq1xtW1NXFAoLvCJEYekr4o56RCWvYbJBHHXaO5lI98Z+Ntmcstf7+aAOJNb/BqHqv2O5g7+r0DhJyOh4QtpNi7yc708XDp/enZzW3qzmKWfS7Nq5S2/2b20zcfpeVO87h+Lk72de2ueD29LNzy6vkgWwvnp7WG8m79tLXbpY57Jxp3uLD3s35eNrBkLGltO6f+SSBoCNVnoZUz/QUTLrRt/NaKNeZhbVPrCtrs23C65qzVKDo0bNSfj7kvAzNG4BdORV2UHgm251RlAS+sXq+G21uf/lPuwJLu8Os8kIKtzGURLdV7/UR7Ys4g6VDpsyKEXeG0d7zJxrAZNA/vPBj+V4Pw0QZRYrxUtsP/GcInvls62sxo5fy28Q63G7zyYzVQuHcS18C7FUByaReFhpma9GTa/nxiWYNoqOK2PgbZSv4kKDwx85DgkRX9TknsOL/JFM+PPjVH6IP3mkkwi/k7sTDkRnS21VFj7EZpahy2dzgWiF567bGJdfJKDOgE=");
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
