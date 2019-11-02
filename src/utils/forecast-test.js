request = require('request')

const forecast = (latitude, longitude, callback)=>{

    const urldarksky = 'https://api.darksky.net/forecast/122deb47799ec5b2d873b7f505a28299/'+latitude+','+longitude+'?units=si&lang=en'
    request({url: urldarksky, json: true}, (error, response)=>{
        if(error){
            callback('Unable connect to weather services', undefined)
        }else if(response.body.error){
            callback('Unable to find weather forecast of typed location, try other', undefined)
        }else{
            callback(undefined, response.body.daily.data[0].summary+'Today temperature is '+response.body.currently.temperature+'C with '+response.body.currently.precipProbability+'% chance of rain')
        }
    })
}

module.exports = forecast