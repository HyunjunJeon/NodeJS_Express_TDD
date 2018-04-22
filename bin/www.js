// app 가져와서 서버 구동 하는 모듈
const app = require('../index')

// db sync
const DbSync = require('./sync-db')

DbSync.then(()=>{
    console.log('Sync Database')
    app.listen(3003, () => {
        console.log("잘 동작하고 있다. 포트는 : 3003")
    })
})
