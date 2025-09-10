const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.weatherstack.com/current?access_key=f9b0211828cb8e711e4084672bdf549d&query=' + latitude + ',' + longitude + '&units=f'
//     request({url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unbale to connect to weather services', undefined)
//         } else if (response.body.error) {
//             callback(response.body.error.type, undefined)
//         } else {
//             const str = response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. It feeks like " + response.body.current.feelslike + " degrees out."
//             callback(undefined, str)
//         }
//     })
// }

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=f9b0211828cb8e711e4084672bdf549d&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unbale to connect to weather services', undefined)
        } else if (body.error) {
            callback(body.error.type, undefined)
        } else {
            const str = body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feeks like " + body.current.feelslike + " degrees out. The humidity is " + body.current.humidity + "%."
            callback(undefined, str)
        }
    })
}

module.exports = forecast