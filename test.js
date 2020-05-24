const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "45c8c623dce1aa994da85f004cb2949d";
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +
        apiKey + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);

            const discripiton = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const weatherIcon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write(" <h1> the weather in " + query + " is " + discripiton + "</h1>");
            res.write("<h3>the temp is " + temp + "</h3>");
            res.write("<img src=" + weatherIcon + ">");



        })

    })

});



const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`Our app is running on port ${ PORT }`);
})