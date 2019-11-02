request = require('request')


const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWRpdHlhMjIwOTE5OTgiLCJhIjoiY2sxdGRrYWlyMG42YTNodDZhN3h3NG1xcCJ9._cbKt7XpLDhqTRclnbBvaw&limit=1'
    request({url, json: true},(error, {body}={})=>{
        //for low level errors like os errors eg:not connected to network
        if(error){
            callback('Unable to connect to locations services.', undefined) //we cannot destructure undefined or null values so use {} here or use deafult values in function calling
        }else if(body.error||body.message||body.features.length===0){
             //bad input
             callback('Unable to find location, try another', {})
        }else{
            callback(undefined, {
                longitude : body.features[0].geometry.coordinates[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}


module.exports = geocode