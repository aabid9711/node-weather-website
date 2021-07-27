const request = require("request")

const geocode = (address,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiaGFzYW5hYWJpZCIsImEiOiJja3I0Z3ZwMDgwZ3FrMndsdDViOTMxNjM5In0.FCi5TA4vHtMeIW0QFybZhw&limit=1'
 
    request({url,json:true},(error,{body})=>{

          if(error){
              callback('please check your internet',undefined)
          }
          else if(body.features.length == 0){
              callback('Some information are missing please give all',undefined)
          }
          else{
              callback(undefined,{
                  lattitude:body.features[0].center[0],
                  longitude:body.features[0].center[1],
                  location:body.features[0].place_name
              })
          }
    })
 
 }

 
 module.exports=geocode
//  geocode('mumbai',(error,=>{
 
//    console.log(error)
//    console.log(
//  })