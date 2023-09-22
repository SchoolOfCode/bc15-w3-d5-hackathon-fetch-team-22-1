// find the api link
//work out what info we want 
//check what info comes through 
// link the API with async function
//let weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=52.4814&longitude=-1.8998&hourly=temperature_2m,relativehumidity_2m,rain,visibility"

async function retriveWeather(long, lat) {
const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&timezone=GMT`, {
    headers: {
        Accept: "application/json"
        }
    })
let data = await weather.json()
console.log(data)
setWeather(data)
return data
}

async function retrieveGeo(cityIn) {
    const weather = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityIn}`, {
        headers: {
            Accept: "application/json"
        }
    })
    let data = await weather.json()
    let lat = data.results[0].latitude
    let long = data.results[0].longitude

    retriveWeather(long, lat)
    return data
    }


//select the relevent elements in html to input the info from the api
    //Temp
    let temp = document.getElementById("tempTxt")
    //Max and min temps
    let maxTemp = document.getElementById("maxTemp")
    let minTemp = document.getElementById("minTemp")
    //precipitation 
    let precip = document.getElementById("precip")
    //wind speed
    let windSpeed = document.getElementById("windSpeed")
    //humidity
    let weatherCode = document.getElementById("weatherCode")
    //location 
    let locationTxt = document.getElementById("location")

//set the innerText of each of the above to the relevent info from the API
  
 function setWeather(input){
    //Temp
    temp.innerText = (input.daily.temperature_2m_max[0] + input.daily.temperature_2m_min[0])/2 + input.daily_units.temperature_2m_max
    //Max and min temps
    maxTemp.innerText = input.daily.temperature_2m_max[0] + input.daily_units.temperature_2m_max
    minTemp.innerText = input.daily.temperature_2m_min[0] + input.daily_units.temperature_2m_min
    //precipitation 
    precip.innerText = input.daily.precipitation_probability_max[0] + input.daily_units.precipitation_probability_max
    //wind speed
    windSpeed.innerText = input.daily.windspeed_10m_max[0] + input.daily_units.windspeed_10m_max
    //weathercode
    weatherCode.innerText =  input.daily.weathercode[0]
    //location 

}

let locationBtn = document.getElementById("inputBtn")
let locationInput = document.getElementById("locationIn")
locationBtn.addEventListener("click", inputLocation)

function inputLocation(){
    retrieveGeo(locationInput.value)

    locationTxt.innerText = locationInput.value
}