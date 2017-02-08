## country>json  [![Build Status](https://travis-ci.org/samayo/country-json.svg?branch=master)](https://travis-ci.org/samayo/country-json)

A simple but useful data of the world (by country) each in JSON format.

### Download
Using npm
```bash
$ npm install country-json
```
Using git
```bash
$ git clone https://github.com/samayo/country-json
```
Using composer
```bash
$ composer require samayo/country-json
```

### Usage
Examples using various languages to integrate/display the data. 

##### PHP 
```php
<?php 

$file = file_get_contents("./src/country-capital-city.json");
$data = json_decode($file, true); 

foreach ($data as $key => $value) {
  var_dump($value); // { country: 'Afghanistan', city: 'Kabul' ..}
} 
```

##### Node.js
```javascript
var fs = require('fs');

fs.readFile('./src/country-capital-city.json', 'utf8', function(err, cities) {

  try {
    cities = JSON.parse(cities);
  } catch (e) {
    console.log('error parsing JSON', e);
  }

  console.log(cities[0]); // { country: 'Afghanistan', city: 'Kabul' }

});
```

##### Ruby
```ruby
require 'json'

file = File.read('./src/country-capital-city.json')
json = JSON.parse(file)

puts json[0] # {"country"=>"Afghanistan", "city"=>"Kabul"}
```

##### Python
```python
import yaml

with open('./src/country-capital-city.json') as json_file:
    for line in yaml.safe_load(json_file):
        print line # {'country': 'Afghanistan', 'city': 'Kabul'}
```

##### Golang

```go
package main

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
)

func main() {
  data, err := ioutil.ReadFile("path/to/country-capital-city.json")
  if err != nil {
    panic(err)
  }

  var entries []struct{ Country, City string }
  if err = json.Unmarshal(data, &entries); err != nil {
    panic(err)
  }

  for _, entry := range entries {
    fmt.Println(entry.Country, entry.City)  # {'country': 'Afghanistan', 'city': 'Kabul'}
  }
}

```  

### Data

- [Countries by Name](https://github.com/samayo/country.json/blob/master/src/countries.json)
- [Countries by Abbreviation](https://github.com/samayo/country.json/blob/master/src/country-abbreviation.json)
- [Countries by Average Male Height](https://github.com/samayo/country.json/blob/master/src/country-avg-male-height.json)
- [Countries by Alphabetical Letters](https://github.com/samayo/country.json/blob/master/src/country-by-alphabet-letters.json)
- [Countries by Coastline Length](https://github.com/samayo/country.json/blob/master/src/country-by-costline.json)
- [Countries by Average Land Elevation](https://github.com/samayo/country.json/blob/master/src/country-by-elevation.json)
- [Countries by National Dish (official/proposed)](https://github.com/samayo/country.json/blob/master/src/country-by-national-dish.json)
- [Countries by International Calling Code](https://github.com/samayo/country.json/blob/master/src/country-calling-code.json)
- [Countries by Capital City](https://github.com/samayo/country.json/blob/master/src/country-capital-city.json)
- [Countries by Continental Location](https://github.com/samayo/country.json/blob/master/src/country-continent.json)
- [Countries by Currency Name & Code](https://github.com/samayo/country.json/blob/master/src/country-currency-name-and-code.json)
- [Countries by TLD](https://github.com/samayo/country.json/blob/master/src/country-domain-tld.json)
- [Countries by Flag in base64 format (experimental)](https://github.com/samayo/country.json/blob/master/src/country-flag.json)
- [Countries by Geo-Coordinates](https://github.com/samayo/country.json/blob/master/src/country-geo-cordinations.json)
- [Countries by Government Type](https://github.com/samayo/country.json/blob/master/src/country-government-type.json)
- [Countries by Independence Year](https://github.com/samayo/country.json/blob/master/src/country-independence-date.json)
- [Countries by ISO Code](https://github.com/samayo/country.json/blob/master/src/country-iso-numeric.json)
- [Countries by Landlocked Status](https://github.com/samayo/country.json/blob/master/src/country-landlocked.json)
- [Countries by Life Expectancy](https://github.com/samayo/country.json/blob/master/src/country-life-expectancy.json)
- [Countries by National Animal/Plant](https://github.com/samayo/country.json/blob/master/src/country-national-animal-or-plant.json)
- [Countries by Population](https://github.com/samayo/country.json/blob/master/src/country-population.json)
- [Countries by Population Density](https://github.com/samayo/country.json/blob/master/src/country-population-density.json)
- [Countries by Region Location](https://github.com/samayo/country.json/blob/master/src/country-region-in-world.json)
- [Countries by Surface Area](https://github.com/samayo/country.json/blob/master/src/country-surface-area.json)
- [Countries by Yearly avg Temperature](https://github.com/samayo/country.json/blob/master/src/country-yearly-average-temperature.json)
- [Countries by Barcode Prefix](https://github.com/samayo/country-json/blob/master/src/country-by-barcode-prefix.json)



### Contribution
Feel free to send a PR anytime, any help or correction is appreciated.    
For non-minor changes about country (ex: name, languages, capital-city, independence date..), please include a source, if possible. 

### Resources
- [Processing country.json data with ramda-cli](https://github.com/raine/ramda-cli/wiki/Cookbook#playing-around-with-countryjson-data)    
