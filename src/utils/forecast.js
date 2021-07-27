const request = require("request")

const forecast = (longitude,lattitude,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=6d1566c6c49b620c8cc7dea3a185e603&query='+longitude+','+lattitude+'&units=m'

    request({url,json:true},(error,{body})=>{

        if(error){
            callback('please check internet connection',undefined)
        }
        else if(body.error){
            callback('Some information are missing please give all',undefined)
        }
        else{
            callback(undefined,{
                description:body.current.weather_descriptions[0],
                Actual_tempreture:body.current.temperature,
                feel_like_tempreture:body.current.feelslike,
                Humidity:body.current.humidity,
                Wind_Speed:body.current.wind_speed
            })
        }
    })

 }
 
 module.exports=forecast