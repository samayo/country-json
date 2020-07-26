const fs = require("fs");
const stream = require("stream");
const util = require("util");
const axios = require("axios");

const pipeline = util.promisify(stream.pipeline);

const countries = require("./src/country-by-abbreviation.json");
const basePath = "./country-flags-images";

const downloadFlag = ({ countryCode = "", style = "flat", size = 24 }) => {
  try {
    [basePath, `${basePath}/${style}`, `${basePath}/${style}/${size}`].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }
      }
    );
    const path = `${basePath}/${style}/${size}`;
    const filePath = `${path}/${String(countryCode).toLowerCase()}.png`;

    if (!fs.existsSync(filePath)) {
      axios({
        method: "get",
        url: `https://www.countryflags.io/${String(
          countryCode
        ).toLowerCase()}/${style}/${size}.png`,
        responseType: "stream",
      })
        .then(({ data }) => {
          pipeline(data, fs.createWriteStream(filePath))
            .then(() => {
              console.log(filePath)
            })
            .catch((error) => {
              resolve(error);
              console.log(error.message)
            });
        })
        .catch((error) => {
          console.log(error.message)
        });
    }
  } catch (error) {
    console.log(error.message);
  }
};

countries.forEach((country) => {
  const countryCode = country.abbreviation;
  // flat
  downloadFlag({ countryCode, style: "flat", size: 16 });
  downloadFlag({ countryCode, style: "flat", size: 24 });
  downloadFlag({ countryCode, style: "flat", size: 32 });
  downloadFlag({ countryCode, style: "flat", size: 48 });
  downloadFlag({ countryCode, style: "flat", size: 64 });
  // shiny
  downloadFlag({ countryCode, style: "shiny", size: 16 });
  downloadFlag({ countryCode, style: "shiny", size: 24 });
  downloadFlag({ countryCode, style: "shiny", size: 32 });
  downloadFlag({ countryCode, style: "shiny", size: 48 });
  downloadFlag({ countryCode, style: "shiny", size: 64 });
});

console.log("countries.length :>> ", countries.length);
