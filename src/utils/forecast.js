const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a51e51a3ffc83ccdb88c6db940bb219b&query=${longtitude},${latitude}&units=m`
    
    request ({url, json:true}, (error, {body})=> {
        if (error){
            callback('Unable to connect to service', undefined)
      } else if (body.error) {
            callback('Invalid Latitude & Longtitude', undefined)
            console.log(url)

      } else {
          callback(null, `It is currently ${body.current.temperature}°C out.
                          It feels like ${body.current.feelslike}°C out.` )

      }
    })
}
module.exports = forecast 