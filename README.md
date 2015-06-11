## country.json  [![Build Status](https://api.travis-ci.org/samayo/country.json.svg)](https://travis-ci.org/samayo/country.json)

A simple but useful data of the world (by country) in JSON format.

### Download
Using git

```bash
$ git clone https://github.com/samayo/country.json
```

### Usage
Below, You'll find examples using various languages to integrate/display the data. 

##### PHP 
```php
<?php 

$file = file_get_contents("/src/country-capital-city.json");
$data = json_decode($file, true); 

foreach ($data as $key => $value) {
  list($country, $city) = $value;
  
  // initialize your database .. 
  $db->query("INSERT INTO countries (country, city) VALUES ($country, $city)"); 
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

### Contributing
So contributions are welcome. Feel free to PR anything. 

#### Big Changes
If you are fixing a minor typo or something similar, you can do a PR anytime. However, for bigger Changes like country and/or city names, language, population change .. then please include a source, if possible. 

### LICENSE
MIT
