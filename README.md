SingleStore Code Challenge for January
======================================

**Attention**: The code in this repository is intended for experimental use only and is not fully tested, documented, or supported by SingleStore. Visit the [SingleStore Forums](https://www.singlestore.com/forum/) to ask questions about this repository.

In this code challenge we'll work with geographic data. SingleStore natively supports WKT-formatted polygon shapes and points. We'll build a stored procedure to identify planes flying over the desired country.


Goal
----

Craft a stored procedure that takes in a country and returns the planes flying over the country.


Given
-----

1. `natural_earth_countries_110m.csv` is a public domain file built from https://github.com/nvkelso/natural-earth-vector. It includes WKT-formatted polygons for each country.

2. OpenSky is an API for returning locations of planes. Visit https://opensky-network.org/apidoc/rest.html to understand the API. The data is a JSON file showing an array per plane. Note that this API needs no authentication, but is rate limited.

3. index.js is a Node.js program that fetches the JSON data from OpenSky and converts it into a json file suitable for a SingleStore pipeline. You could run this every few minutes to get fresh plane data. To use it, grab `index.js` and `package.json`, then run `npm install` and then `npm start`. Switch the comments to use the cached copy and avoid the rate limits.


Tasks
-----

1. Create tables for both countries and planes.

2. Import the country data.

3. Create a pipeline to continuously import flight data.

4. Create a stored procedure that given a country name (or short name or ...) returns the set of planes currently over that country.


How to Win
----------

1. Post your solution as a public repo or gist on GitHub.

2. Submit your GitHub URL to https://msql.co/3oDSoTD.

3. All complete entries will receive this month's Code Challenge badge in the forum.
