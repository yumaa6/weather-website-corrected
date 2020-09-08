const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a51e51a3ffc83ccdb88c6db940bb219b&query=${latitude},${longtitude}&units=m`
    
    request ({url, json:true}, (error, {body})=> {
        if (error){
            callback('Unable to connect to service')
      } else if (body.error) {
            callback('Invalid Latitude & Longtitude')
            console.log(url)

      } else {
          callback(null, `It is currently ${body.current.temperature}°C out` )

      }
    })
}
module.exports = forecast 