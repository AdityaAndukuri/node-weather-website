request = require('request')

const forecast = (latitude, longitude, callback)=>{

    const url = 'https://api.darksky.net/forecast/122deb47799ec5b2d873b7f505a28299/'+latitude+','+longitude+'?units=si&lang=en'
    request({url, json: true}, (error, response={})=>{
        if(error){
            callback('Unable connect to weather services', undefined)
        }else if(response.body.error){
            callback('Unable to find weather forecast of typed location, try other', undefined)
        }else{
            callback(undefined, response.body.daily.data[0].summary+'Today temperature is '+response.body.currently.temperature+'C with '+response.body.currently.precipProbability+'% chance of rain\nMax Temperatuure is: '+response.body.daily.data[0].temperatureHigh+'\nMin Temperature is '+response.body.daily.data[0].temperatureLow)
        }
    })
}

module.exports = forecast