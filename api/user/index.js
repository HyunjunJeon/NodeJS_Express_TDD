// 라우팅 로직
module.exports = function(express){
    const router = express.Router()
    const ctrl = require('./user.ctrl')

    router.get('/', ctrl.index)
    router.get('/:id', ctrl.show)
    router.delete('/:id', ctrl.destroy)
    router.post('/', ctrl.create)
    router.put('/:id', ctrl.update)    
    
    return router
}