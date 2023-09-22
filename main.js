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
  

