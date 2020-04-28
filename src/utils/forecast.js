const request = require('request')

const forecast = (lat,long,callback)=>{

const url = 'http://api.weatherstack.com/current?access_key=170b8d1c136ebff38809ca07211b741e&query='+lat+','+long

request({url: url, json:true},(error,response)=>{

    if(error){
        callback('error occured while calling the forecast service',undefined)
    }else if(response.body.error){
        callback('Invalid address coordinates')
    }else{
        callback(undefined,response.body.current.weather_descriptions[0]+ ' and the current temp is '+
             response.body.current.temperature+' it feels like '+response.body.current.feelslike)
    }
    
 

})

}

module.exports = forecast