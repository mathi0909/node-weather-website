const request = require('request')

const geoCode = (address,callback)=>{

    const locationURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWF0aGkwOSIsImEiOiJjazk1eTdyOXIwZm12M2hsMmFnYmR6a2dtIn0.IlcMPQiWIaAOomFHVlyURg&limit=1'

    request({url:locationURL, json:true},(err,response)=>{

        var coordinate=""
        if(err){
            callback('unable to connect location service',undefined)
        }
        else if(response.body.features.length === 0){
            callback("Couldn't find the city. Try different city name")
        }
        else  {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }

       
    })

}

module.exports = geoCode