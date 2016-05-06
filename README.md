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

```golang
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


### Contributing
Contributions are needed. Feel free to send a PR anytime specially for minior changes (like typo..) for much more complex/bigger changes then please include a source, if possible. 

### Resources
- [Processing country.json data with ramda-cli](https://github.com/raine/ramda-cli/wiki/Cookbook#playing-around-with-countryjson-data)    
