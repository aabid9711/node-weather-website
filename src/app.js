const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/Geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//Define the path for express config
const publicDirect = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directorary to serve
app.use(express.static(publicDirect))

app.get('',(req,res)=>{

    res.render('index',{
        title:'Weather',
        name:'Aabid Hasan'
    })
})

app.get('/about',(req,res)=>{

    res.render('about',{
        title:'About us',
        name:'Aabid'
    })
})

app.get('/help',(req,res)=>{

    res.render('help',{
        title:'Help Page',
        name:'Aabid'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'Please give Address'
        })
    }


    geocode(req.query.address,(error,{longitude,lattitude,location} = {})=>{
    
       if(error){
    
          return res.send({
            error
        })
       }
    
        forecast(longitude,lattitude, (error, forcastData) => {
            
            if(error){
                return res.send({
                    error
                })
            }
    
            res.send({

                forecast:forcastData.description+'. It is Currently '+forcastData.Actual_tempreture+' degree out But it feels like '+forcastData.feel_like_tempreture+' degree.Humidity is '+forcastData.Humidity+' and wind speed is '+forcastData.Wind_Speed,
                 location,
                 address:req.query.address
            })
        })
    })

})

app.get('/products',(req,res)=>{

    if(!req.query.search){

        return res.send({
            error:'please type some query'
        })
    }
    res.send({
        ans:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Aabid',
        error:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Aabid',
        error:'Page not found'
    })
})



app.listen(port,(req,res)=>{
    console.log('Server up on port '+port)
})