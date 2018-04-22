const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const user = require('./api/user/index')

const app = express()

if(process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev')) // 서버로그 발생
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Routing
app.use('/users', user(express))

module.exports = app