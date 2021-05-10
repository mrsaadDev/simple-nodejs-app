const rp = require('request-promise')

module.exports = async function(city = '' ) {
    if (!city) {
        throw new Error('Not Found')
    }

    const KEY = 'c0fba1642d360c0020f69b1b1f311a06'
    const uri = 'http://api.openweathermap.org/data/2.5/weather'

    const options = {
        uri,
        qs: {
            appId: KEY,
            q: city,
            units: 'imperial'
        },
        json: true
    }

    try {
       const data = await rp(options)
       const celsius = (data.main.temp - 32) * 5/9
       return {
           weather: `${data.name}: ${celsius.toFixed(0)}`,
           error: null
       }
    } catch (error) {
        return {
            weather: null,
            error: error.error.message
        }
    }
}