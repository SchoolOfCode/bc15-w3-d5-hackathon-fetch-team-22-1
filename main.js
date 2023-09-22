//find the api link
//work out what info we want to get from weather api
//check how info comes through so we know how to select and link it with DOM
//use Geo api to convert cities to lat and long? 
//select elements from html that we want to be dynamic 
//select info that we need from the API response
//link html elements with .innerText to the the API responses

//stretch goals
//add input for location - add html code
//add event to input -> functino to set city = input.value
//call geo function with (city) to convert city to lat and long

//add dynamic background images
//based on weathe codes?

//function to fetch weather info from the API
async function retriveWeather(long, lat) {
const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&timezone=GMT`, {
    headers: {
        Accept: "application/json"
        }
    })
let data = await weather.json()
setWeather(data)
return data
}

//function to convert cities to lat and long using Geo api
async function retrieveGeo(cityIn) {
    const weather = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityIn}`, {
        headers: {
            Accept: "application/json"
        }
    })
    let data = await weather.json()
    //set latitude and longitude to be passed to the weatherAPI
    let lat = data.results[0].latitude
    let long = data.results[0].longitude

    //call weather API with lat and long
    retriveWeather(long, lat)
    return data
}


//select the relevent elements in html to input the info from the api
let temp = document.getElementById("tempTxt")
let maxTemp = document.getElementById("maxTemp")
let minTemp = document.getElementById("minTemp")
let precip = document.getElementById("precip")
let windSpeed = document.getElementById("windSpeed")
let weatherCode = document.getElementById("weatherCode")
let locationTxt = document.getElementById("location")
let infoDiv = document.getElementById("info")

//set the innerText of each of the above to the relevent info from the API
function setWeather(input){
    //Temp - working out average based on min and max that day
    temp.innerText = ((input.daily.temperature_2m_max[0] + input.daily.temperature_2m_min[0])/2).toFixed(2) + input.daily_units.temperature_2m_max
    maxTemp.innerText = input.daily.temperature_2m_max[0] + input.daily_units.temperature_2m_max
    minTemp.innerText = input.daily.temperature_2m_min[0] + input.daily_units.temperature_2m_min
    precip.innerText = input.daily.precipitation_probability_max[0] + input.daily_units.precipitation_probability_max
    windSpeed.innerText = input.daily.windspeed_10m_max[0] + input.daily_units.windspeed_10m_max
    //weathercode
    let weathCode = input.daily.weathercode[0]
    //find right weather code description and image
    for(let i = 0; i < weatherCodeDescriptAndImgs.length ; i++){
        //check if id of weathercode from API response matches against the descriptions ID in the array
    if(weatherCodeDescriptAndImgs[i].id.includes(weathCode)){
        //if match - set weathercode txt to that description 
    weatherCode.innerText = weatherCodeDescriptAndImgs[i].description
        //set background image to relevant img
    infoDiv.style.backgroundImage = `url(${weatherCodeDescriptAndImgs[i].img})`}
    }
}

//setting up input for user to be able to search different cities
let locationBtn = document.getElementById("inputBtn")
let locationInput = document.getElementById("locationIn")
//event listened to check when go button is clicked
locationBtn.addEventListener("click", inputLocation)

//function to call the API functions with an argument of the city that has been input by user
function inputLocation(){
    retrieveGeo(locationInput.value)
    //set location text to match the user input
    locationTxt.innerText = locationInput.value
}

//Array to hold weather code descriotions and relevant images

let weatherCodeDescriptAndImgs =[
    {id: [0],
    description: "Clear sky",
    img:"clearSkies.jpg"},
    {id: [1, 2, 3],
    description: "Mainly clear, partly cloudy, and overcast",
    img:"MainlyClear.jpg"},
    {id: [45, 48],
    description: "Fog and depositing rime fog",
    img:"Fog.jpg"},
    {id: [51, 53, 55],
    description: "Drizzle: Light, moderate, and dense intensity",
    img:"drizzle.jpg"},
    {id: [56, 57],
    description: "Freezing Drizzle: Light and dense intensity",
    img:"freezingDrizzle.jpg"},
    {id: [61, 63, 65],
    description: "Rain: Slight, moderate and heavy intensity",
    img:"heavyRain.jpg"},
    {id: [66, 67],
    description: "Freezing Rain: Light and heavy intensity",
    img:"rainShower.jpeg"},
    {id: [71, 73, 75],
    description: "Snow fall: Slight, moderate, and heavy intensity",
    img:"snowShower.jpeg"},
    {id: [77],
    description: "Snow grains",
    img:"snowGrains.jpeg"},
    {id: [80, 81, 82],
    description: "Rain showers: Slight, moderate, and violent",
    img:"rainShower.jpeg"},
    {id: [85, 86],
    description: "Snow showers slight and heavy",
    img:"snowShower.jpeg"},
    {id: [95],
    description: "Thunderstorm: Slight or moderate",
    img:"lightThunder.jpeg"},
    {id: [96, 99],
    description: "Thunderstorm with slight and heavy hail",
    img:"thunder.png"},
]