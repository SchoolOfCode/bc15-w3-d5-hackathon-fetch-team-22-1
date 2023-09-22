// find the api link
//work out what info we want 
//check what info comes through 
// link the API with async function
async function retriveWeather() {
const weather = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.4814&longitude=-1.8998&hourly=temperature_2m,relativehumidity_2m,rain,visibility", {
    headers: {
    Accept: "application/json"
    }
})

let data = await weather.json()
console.log(data)
return data

}
//retriveWeather()

let city = "berlin"

async function retrieveGeo(city) {
    const weather = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=berlin", {
        headers: {
            Accept: "application/json"
        }
    })
    let data = await weather.json()
    console.log(data)
    return data
    }

    retrieveGeo()
//select the relevent elements in html to input the info from the api
    //Temp
    //Max and min temps
    //precipitation 
    //wind speed
    //humidity

//set the innerText of each of the above to the relevent info from the API
    //Temp
    //Max and min temps
    //precipitation 
    //wind speed
    //humidity

