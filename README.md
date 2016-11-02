## country-data  [![Build Status](https://travis-ci.org/samayo/country-data.svg?branch=master)](https://travis-ci.org/samayo/country-data)

A simple but useful data of the world (by country) each in JSON formats.

### Download
Using git
```bash
$ git clone https://github.com/samayo/country-data
```
Using composer
```bash
$ composer require samayo/country-data
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

- [List of countries](https://github.com/samayo/country.json/blob/master/src/countries.json)
- [Countries abbreviation](https://github.com/samayo/country.json/blob/master/src/country-abbreviation.json)
- [Countries average male height](https://github.com/samayo/country.json/blob/master/src/country-avg-male-height.json)
- [Countries by alphabet letter](https://github.com/samayo/country.json/blob/master/src/country-by-alphabet-letters.json)
- [Countries by coastline length](https://github.com/samayo/country.json/blob/master/src/country-by-costline.json)
- [Countries by average land elevation](https://github.com/samayo/country.json/blob/master/src/country-by-elevation.json)
- [Countries by their national dish (official or proposed)](https://github.com/samayo/country.json/blob/master/src/country-by-national-dish.json)
- [Countries international calling code](https://github.com/samayo/country.json/blob/master/src/country-calling-code.json)
- [Countries capital city list](https://github.com/samayo/country.json/blob/master/src/country-capital-city.json)
- [Countries with their continent location](https://github.com/samayo/country.json/blob/master/src/country-continent.json)
- [Countries currency name and code](https://github.com/samayo/country.json/blob/master/src/country-currency-name-and-code.json)
- [Countries by their national domain TLD](https://github.com/samayo/country.json/blob/master/src/country-domain-tld.json)
- [Countries flag in base64 format (experimental)](https://github.com/samayo/country.json/blob/master/src/country-flag.json)
- [Countries geo-coordinate](https://github.com/samayo/country.json/blob/master/src/country-geo-cordinations.json)
- [Countries government type](https://github.com/samayo/country.json/blob/master/src/country-government-type.json)
- [Countries independence year](https://github.com/samayo/country.json/blob/master/src/country-independence-date.json)
- [Countries ISO code](https://github.com/samayo/country.json/blob/master/src/country-iso-numeric.json)
- [Countries landlocked status](https://github.com/samayo/country.json/blob/master/src/country-landlocked.json)
- [Countries life expectancy](https://github.com/samayo/country.json/blob/master/src/country-life-expectancy.json)
- [Countries national animal/plant](https://github.com/samayo/country.json/blob/master/src/country-national-animal-or-plant.json)
- [Countries population](https://github.com/samayo/country.json/blob/master/src/country-population.json)
- [Countries population density](https://github.com/samayo/country.json/blob/master/src/country-population-density.json)
- [Countries by region location](https://github.com/samayo/country.json/blob/master/src/country-region-in-world.json)
- [Countries surface area](https://github.com/samayo/country.json/blob/master/src/country-surface-area.json)
- [Countries yearly average temperature](https://github.com/samayo/country.json/blob/master/src/country-yearly-average-temperature.json)


### Contributing
Contributions are needed. Feel free to send a PR anytime specially for minior changes (like typo..) for much more complex/bigger changes then please include a source, if possible. 

### Resources
- [Processing country.json data with ramda-cli](https://github.com/raine/ramda-cli/wiki/Cookbook#playing-around-with-countryjson-data)    
