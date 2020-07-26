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

  return {
    ...country,
    callingCode: findCountry.calling_code,
  };
});

fs.writeFile(filePath, JSON.stringify(combinedData, null, 2), function (err) {
  if (err) throw err;
  console.log("Saved!");
});
