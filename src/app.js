const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const port = process.env.PORT || 3000

/****** setup routes ******/
// req is incoming ms and res is outcoming
// app.get('/about', (req, res) => {
//     res.send('About')
// })

// app.get('/weather', (req, res) => {
//     res.send('Your weather')
// })



/****** send html/json ******/
// app.get('/help', (req, res) => {
//     res.send('<h1>weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Emma'
//     }, {
//         name: 'Andrew'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

// app.get('/weather', (req, res) => {
//     res.send([{
//         forecast: 'It is snowing',
//         location: 'Philadephi'
//     }])
// })


/****** serving up static assets ******/
//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
// setup static directory to serve
app.use(express.static(publicDirPath))


/****** Dynamic Pages with Templating ******/
// https://expressjs.com/en/5x/api.html#app.set
// setup handlebar engine and view location
const veiewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.set('view engine', 'hbs')
app.set('views', veiewPath)

// root
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jiabao Yao'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jiabao Yao'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Jiabao Yao'
    })
})

/****** Accessing API from Browser ******/
// The query string
// query: http://localhost:3000/products?address=Boston
app.get('/products', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address'
        })
    }

    console.log(req.query)
    res.send({
        forecast: 'It is snowing',
        location: 'Philadephia',
        address: req.query.address,
    })
})

// Building a JSON HTTP Endpoint
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    // Give default values to avoid error that { latitude, longitude, location } are null
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastDate) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastDate,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Jiabao Yao'
    })
})

// '*' match everything
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Jiabao Yao'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})