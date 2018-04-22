const Sequelize = require('sequelize')

const sequelize = new Sequelize('wp', 'wp', 'wp', {
    host: 'localhost',
    dialect: 'mysql',
    logging:false,//로그가 너무 지저분하게 나와서 TEST에 방해되니 잠시...
    pool: {
        max: 100,
        min: 1,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
})

const User = sequelize.define('TDD_user', {
    username: {
        type:Sequelize.STRING,
        unique:true,
    }
})

module.exports = { Sequelize, sequelize, User }