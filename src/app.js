const express = require('express')
const path  =  require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

console.log(__dirname)

// path for express
const publicStaticHomePage = path.join(__dirname,"../public")
const viewPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")


console.log(publicStaticHomePage)

// this is to set the template engine and the path
app.set('view engine','hbs')
app.set('views',viewPath) 
hbs.registerPartials(partialsPath)

// set the root path for the application.
app.use(express.static(publicStaticHomePage))

app.get('',(req,res)=>{
    console.log(publicStaticHomePage)
    res.render('index',{ 
        title: 'Weather App',
        owner: 'Mithran'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{ 
        title: "About Us !",
        owner: 'Mithran'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help instruction.",
        owner: 'Mithran'
    })
})
  
app.get("/weather",(req,res)=>{

    console.log(req.query)
    console.log(!req.query.address)
    if(!req.query.address){

        let rst= { errorMsg:"Please provide the address to forecast"}
        return res.send(rst)
    }

    geocode(req.query.address,(err,data)=>{

        if(err){
            return res.send({
                errorMsg: err
            })
        } 

        forecast(data.latitude,data.longitude,(err,foreCastData)=>{
            if(err){
               return  res.send({
                    errorMsg:err
                })
            }

            return res.send({
                forecast: foreCastData,
                location: data.location
                 
            })

        })

    })
    
    // console.log("inside")
    // let rst= { location : "chennai",
    //             degree: 39,
    //             owner: 'Mithran'
    //             }
    
    // rst.address = req.query.address

    // return res.send(rst)

   
})


app.get("/product",(req,res)=>{
    
    console.log(!req.query.search)
    if(!req.query.search){
        return res.send({
            errorMsg:"No search term provided"
        })
    }

    
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get("/help/*",(req,res)=>{
    res.render("custom404",{
        errorMsg: "Help article is not available",
        owner: 'Mithran',
        title:"404"
    })
})

app.get("*",(req,res)=>{

    res.render("custom404",{
        errorMsg: "My custom 404 Msg"
    })
})


app.listen(3000,()=>{    
    console.log("server started at 3000")
})