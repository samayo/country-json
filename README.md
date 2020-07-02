## country>json   [![Build Status](https://travis-ci.org/samayo/country-json.svg?branch=master)](https://travis-ci.org/samayo/country-json)

A simple data of the world (by country) each in JSON format.

### Download
Using npm
```bash
$ npm install country-json
```
or composer
```bash
$ composer require samayo/country-json
```
or  git
```bash
$ git clone https://github.com/samayo/country-json
```
### List of contents provided in JSON formats:
- [Country by Name](https://github.com/samayo/country-json/blob/master/src/country-by-name.json)
- [Country by Abbreviation](https://github.com/samayo/country-json/blob/master/src/country-by-abbreviation.json)
- [Country by Alphabet Letters](https://github.com/samayo/country-json/blob/master/src/country-by-alphabet-letters.json)
- [Country by Avg Male Height](https://github.com/samayo/country-json/blob/master/src/country-by-avg-male-height.json)
- [Country by Barcode Prefix](https://github.com/samayo/country-json/blob/master/src/country-by-barcode-prefix.json)
- [Country by Calling Code](https://github.com/samayo/country-json/blob/master/src/country-by-calling-code.json)
- [Country by Capital City](https://github.com/samayo/country-json/blob/master/src/country-by-capital-city.json)
- [Country by Continent](https://github.com/samayo/country-json/blob/master/src/country-by-continent.json)
- [Country by Costline](https://github.com/samayo/country-json/blob/master/src/country-by-costline.json)
- [Country by Currency Name](https://github.com/samayo/country-json/blob/master/src/country-by-currency-name.json)
- [Country by Religion](https://github.com/samayo/country-json/blob/master/src/country-by-religion.json)
- [Country by Currency Code](https://github.com/samayo/country-json/blob/master/src/country-by-currency-code.json)
- [Country by Domain Tld](https://github.com/samayo/country-json/blob/master/src/country-by-domain-tld.json)
- [Country by Elevation](https://github.com/samayo/country-json/blob/master/src/country-by-elevation.json)
- [Country by Flag](https://github.com/samayo/country-json/blob/master/src/country-by-flag.json)
- [Country by Geo Coordinates](https://github.com/samayo/country-json/blob/master/src/country-by-geo-cordinations.json)
- [Country by Government Type](https://github.com/samayo/country-json/blob/master/src/country-by-government-type.json)
- [Country by Independence Date](https://github.com/samayo/country-json/blob/master/src/country-by-independence-date.json)
- [Country by Iso Numeric](https://github.com/samayo/country-json/blob/master/src/country-by-iso-numeric.json)
- [Country by Landlocked](https://github.com/samayo/country-json/blob/master/src/country-by-landlocked.json)
- [Country by Languages](https://github.com/samayo/country-json/blob/master/src/country-by-languages.json)
- [Country by Life Expectancy](https://github.com/samayo/country-json/blob/master/src/country-by-life-expectancy.json)
- [Country by National Symbol](https://github.com/samayo/country-json/blob/master/src/country-by-national-symbol.json)
- [Country by National Dish](https://github.com/samayo/country-json/blob/master/src/country-by-national-dish.json)
- [Country by Population Density](https://github.com/samayo/country-json/blob/master/src/country-by-population-density.json)
- [Country by Population](https://github.com/samayo/country-json/blob/master/src/country-by-population.json)
- [Country by Region In World](https://github.com/samayo/country-json/blob/master/src/country-by-region-in-world.json)
- [Country by Surface Area](https://github.com/samayo/country-json/blob/master/src/country-by-surface-area.json)
- [Country by Yearly Average Temperature](https://github.com/samayo/country-json/blob/master/src/country-by-yearly-average-temperature.json)

### Usage
Examples using various languages on how display/integrate the data.

##### PHP
```php
$file = file_get_contents("./src/country-by-capital-city.json");

foreach (json_decode($file, true) as $key => $value) {
  var_dump($value); // { country: 'Afghanistan', city: 'Kabul' ..}
}
```

##### Node.js
```javascript
var cities = require('./src/country-by-capital-city.json')

console.log(cities[0]); // { country: 'Afghanistan', city: 'Kabul' }
```

##### Ruby
```ruby
require 'json'

file = File.read('./src/country-by-capital-city.json')
json = JSON.parse(file)

puts json[0] # {"country"=>"Afghanistan", "city"=>"Kabul"}
```

##### Python
```python
import yaml

with open('./src/country-by-capital-city.json') as json_file:
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
  data, err := ioutil.ReadFile("path/to/country-by-capital-city.json")
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





### Contribution
Feel free to send a PR to fix, update or add new entry anytime.
For non-minor changes (ex: country: name, language, city, independence date..), please include a source, if possible.

### Resources
- [Processing country-json data with ramda-cli](https://github.com/raine/ramda-cli/wiki/Cookbook#playing-around-with-countryjson-data)
