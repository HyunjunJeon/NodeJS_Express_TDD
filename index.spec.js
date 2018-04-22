const mocha = require('mocha')
const should = require('should')
const request = require('supertest')
const app = require('./index')

describe('GET /users', ()=>{
    it('배열을 리턴한다', (done)=>{
        request(app)
            .get('/users')
            .end((err,res)=>{
                res.body.should.be.instanceof(Array)
                res.body.forEach(user=>{
                    user.should.have.property('name')
                })
                done()
            })
    })
})