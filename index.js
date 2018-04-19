const express = require('express')
const logger = require('morgan')
const app = express()

app.use(logger('dev'))

const mw = (req,res,next)=>{

}

const errorMw = (err, req, res, next) => {

}

app.listen(3000, ()=>{
    console.log("Express Server Running ing.....")
})