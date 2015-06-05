country.json
=======================================

A simple useful data of the world (by country).

[![Build Status](https://api.travis-ci.org/samayo/country.json.svg)](https://travis-ci.org/samayo/country.json)

Usage & Examples
-----
All information is stored in `.json` format, for easier integration. Simply import download and keep going.

##### PHP 
```php
<?php 

$file = file_get_contents("/src/country-city.json");
$data = json_decode($file, true); 

foreach ($data as $key => $value) {
 	list($country, $city) = $value;

 	 // initialize your database .. 
 	$db->query("INSERT INTO countries (country, city) VALUES ($country, $city)"); 
 } 

 ```

#### Contribution.

So contributions are welcome, in fact that is the reason behind this repo, so 
we can all share upto-date data made by people all over the world. 

##### Please note: 

If you are fixing a minor typo or something alike, you can do a PR anytime, if you want to 
modify something more like a country language, population change .. then make sure to include a source in your commit, if possible.

#### LICENSE
MIT
