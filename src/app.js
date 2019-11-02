const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//express is a function that returns an object, its documentation can be found at expressjs.com
const app = express()

//to get port number dynamically from heroku
const port = process.env.PORT || 3000

//Setup paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') //headers, footers etc i.e reusable stuff

//Setup handlebars view engine and location for views search
app.set('views', viewsPath) //by default nodejs search for views folder to load hbs file templates
app.set('view engine','hbs') //views contains dynamic webpages
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath)) //public contains static files and webpages

// app.get('',(req, res)=>{
//     res.send('<h1>Home Page!!</h1>')
// }

// app.get('/help',(req, res)=>{
//     res.send([{
//         name: 'Aditya',
//         age: 20
//     },{
//         weight: 75
//     }])
// })

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Aditya',
        footer: 'Home Footer'
    }) //rendering pages from views folder
})

app.get('/about', (req, res)=>{
    //res.send('<h2>About page</h2>')
    res.render('about',{
        title: 'Abount Page',
        description: 'Weather app',
        footer: 'About Footer',
        name: 'Aditya'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Contact page',
        contact: 9704959277,
        footer: 'Contact Footer',
        name: 'Aditya'
    })
})

// app.get('/weather', (req, res)=>{
//     res.send({
//         location: 'Hyderabad',
//         forecast: 'Its rainy today'
//     })
// })


app.get('/weather', (req, res)=>{

    if(!req.query.address)
    {
        return res.send({
            error: "Provide address!!"
        })
    }
    // res.send({
    //     address: req.query.address
    // })
    geocode(req.query.address.toString(), (error, {latitude, longitude, location}={})=>{ //use default values when incoming value is undefined since undefined cannot be destructured
        // console.log('Error', error)
        // console.log('Data', data)
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData={}) => { 
            // console.log('Error', error)
            // console.log('Data', data)
            if(error){
                return res.send({
                    error
                })
            }
            return res.send({
                location,
                address: req.query.address,
                forecast: forecastData
            })
          })
        
    })
})


app.get('/help/*', (req,res)=>{
   // res.send('Help page with given route doesnot exist')
   res.render('404',{
       title:'Helper Error page',
       name: 'Aditya',
       message: 'Helper page doesnot exist'
   })
})

//all other routes 
app.get('*',(req, res)=>{
    //res.send('My 404 page')
    res.render('404',{
        title:'Error page',
        name: 'Aditya',
        message: 'Page doesnot exist'
    })
 
})

app.listen(port, ()=>{
    console.log('Web server started and listening on port '+port)
})