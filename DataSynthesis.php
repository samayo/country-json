<?php

define('COLS', [
    'abbreviation'=>'abbreviation',
    'avg-male-height' => 'height',
    'barcode-prefix' => 'barcode',
    'calling-code' => 'calling_code',
    'capital-city' => 'city',
    'continent' => 'continent',
    'costline' => 'costline',
    'currency-code' => 'currency_code',
    'currency-name' => 'currency_name',
    'domain-tld' => 'tld',
    'elevation' => 'elevation',
    //'flag' => 'flag_base64',
    'geo-coordinates' => ['north', 'south', 'west', 'east'],
    'government-type' => 'government',
    'independence-date' => 'independence',
    'iso-numeric' => 'iso',
    'landlocked' => 'landlocked',
    'languages' => 'language',
    'life-expectancy' => 'expectancy',
    'national-dish' => 'dish',
    'national-symbol' => 'symbol',
    'population-density' => 'density',
    'population' => 'population',
    'region-in-world' => 'location',
    'surface-area' => 'area',
    'yearly-average-temperature' => 'temperature'
]);

$data = array();
foreach(COLS as $path=>$col) {
    if(is_string($col)) $col = [$col];
    $path = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-'.$path.'.json';
    $content = file_get_contents($path);
    $json = json_decode($content, true);
    foreach($json as $record) {
        foreach($col as $c) {
            $data[$record['country']][$c] = $record[$c];
        }
    }
}

var_dump($data);
file_put_contents(dirname(__FILE__).'/country.json', json_encode($data, JSON_PRETTY_PRINT));

/*

{
    "Afghanistan": {
        "abbreviation": "AF",
        "height": null,
        "barcode": null,
        "calling_code": "93",
        "city": "Kabul",
        "continent": "Asia",
        "costline": "0",
        "currency_code": "AFN",
        "currency_name": "Afghanistan Afghani",
        "tld": ".af",
        "elevation": null,
        "north": "38.4834",
        "south": "29.3775",
        "west": "60.4784",
        "east": "74.8794",
        "government": "Islamic Emirate",
        "independence": "1919",
        "iso": "4",
        "landlocked": "1",
        "language": "Balochi",
        "expectancy": "45.9",
        "dish": "Kabuli Palaw",
        "symbol": null,
        "density": "46.8",
        "population": "22720000",
        "location": "Southern and Central Asia",
        "area": 652090,
        "temperature": "12.6"
    },
    ...
}

*/