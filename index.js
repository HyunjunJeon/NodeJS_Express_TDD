const express = require('express')
const logger = require('morgan')
const app = express()

app.use(logger('dev'))

// 일반 미들웨어
const mw = (req,res,next)=>{}
// 에러 미들웨어
const errorMw = (err, req, res, next) => {}

const users = [
    { name: "Alice"},
    { name: "Beck" },
    { name: "Goul" }
]

app.get('/',(req,res)=>{
    res.status(200).send("Hello ExpressJS")
})

app.get('/users', (req, res) => {
    res.status(200).send(JSON.stringify(users))
})


app.listen(3000, ()=>{
    console.log("Express Server Running ing.....")
})