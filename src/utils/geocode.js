const request = require('request')

// const geocode = (addr, callback) => {
//     const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(addr) + '&access_token=pk.eyJ1IjoiYm9iby15YW8iLCJhIjoiY21lbHoyaDlwMGgxOTJqcHhyMzczMDFuciJ9.NVxaZYLVzpZsQHXQ1RGQmg&limit=1'
    
//     request({url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unbale to connect to location services', undefined)
//         } else if (response.body.features.length === 0) {
//             callback('Unable to find location. Try another search.', undefined)
//         } else {
//             callback(undefined, {
//                 latitude: response.body.features[0].properties.coordinates.latitude,
//                 longitude: response.body.features[0].properties.coordinates.longitude,
//                 location: response.body.features[0].properties.full_address
//             })
//         }
//     })
// }

const geocode = (addr, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(addr) + '&access_token=pk.eyJ1IjoiYm9iby15YW8iLCJhIjoiY21lbHoyaDlwMGgxOTJqcHhyMzczMDFuciJ9.NVxaZYLVzpZsQHXQ1RGQmg&limit=1'
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unbale to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].properties.coordinates.latitude,
                longitude: body.features[0].properties.coordinates.longitude,
                location: body.features[0].properties.full_address,
            })
        }
    })
}

module.exports = geocode