const models = require('../model')

module.exports = models.sequelize.sync({force:true})