const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const { runInNewContext } = require('vm')
const app = express()

//Define paths for Express config
const views_path = path.join(__dirname, '../templates/views')
const public_path = path.join(__dirname, '../public')
const partials_path = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', views_path)
hbs.registerPartials(partials_path)

// Setup static directory to serve
app.use(express.static(public_path))



app.get('',  (req,res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Aj'
    })

})

app.get('/help', (req,res) => {
    res.render('help', {
        msg: 'Help me, my monkey is broken',
        title: 'Help',
        name: 'Aj'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aj'
    })
})
app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        if (error) {
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, data)=>{
            if (error) {
                return res.send({error})
            }

            res.send({data, location, address: req.query.address})
        })
    })
})

app.get('/products', (req,res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a serch term'
        })

    }
    console.log(req.query.search)
    res.send({
        prodcuts:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        msg: 'Help article not found',
        name: 'Aj',
        title: '404 Page'
    })

})

app.get('*', (req,res)=> {
    res.render('404', {
        msg: 'Page not found',
        name: 'Aj',
        title: '404 Page'
    })

})
//app.com
//app.com/help
//app.com/about

 app.listen(3000, ()=> {
    console.log('server is up on port 3000.')

 })