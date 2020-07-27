const fs = require("fs");

const countriesByAbbreviation = require("./json-data/country-by-abbreviation.json");
const countriesByCallingCode = require("./json-data/country-by-calling-code.json");
const filePath = `./src/json-data/ft-country-by-abbreviation-by-calling-code.json`;

const combinedData = countriesByAbbreviation.map((country) => {
  const findCountry =
    countriesByCallingCode.find(({ country: countryName }) => {
      return (
        String(countryName).toLowerCase() ===
        String(country.country).toLowerCase()
      );
    }) || {};
  const basePath = `./src/country-flags-images/flat/24`;
  const filePath = `${basePath}/${String(
    country.abbreviation
  ).toLowerCase()}.png`;

  if (fs.existsSync(filePath)) {
    return {
      ...country,
      callingCode: findCountry.calling_code,
      flag: `${String(country.abbreviation).toLowerCase()}.png`,
    };
  } else {
    return {
      ...country,
      callingCode: findCountry.calling_code,
    };
  }
});

fs.writeFile(filePath, JSON.stringify(combinedData, null, 2), function (err) {
  if (err) throw err;
  console.log("Saved!");
});
