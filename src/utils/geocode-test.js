request = require('request')


const geocode = (address, callback)=>{
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWRpdHlhMjIwOTE5OTgiLCJhIjoiY2sxdGRrYWlyMG42YTNodDZhN3h3NG1xcCJ9._cbKt7XpLDhqTRclnbBvaw&limit=1'
    request({url: geocodeURL, json: true},(error, response)=>{
        //for low level errors like os errors eg:not connected to network
        if(error){
            callback('Unable to connect to locations services.', undefined)
        }else if(response.body.error||response.body.message||response.body.features.length===0){
             //bad input
             callback('Unable to find location, try another', undefined)
        }else{
            callback(undefined, {
                longitude : response.body.features[0].geometry.coordinates[0],
                latitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode