// 테스트 로직
const request = require('supertest')
const should = require('should')
const app = require('../../index')
//DB_Sync하도록 추가
const models = require('../../model')

describe('GET /users는', () => {
    const tests = [
        { name: 'alice' },
        { name: 'bek' },
        { name: 'chris' }
    ]
    before(() => models.sequelize.sync({ force: true }))
    //DB에 자료가 없기 때문에 샘플을 넣어줌
    before(() => models.User.bulkCreate(tests))
    describe('성공시', () => {
        const tests = [
            {name:'alice'},
            {name:'bek'},
            {name:'chris'}
        ]
        before(()=>models.sequelize.sync({force:true}))
        //DB에 자료가 없기 때문에 샘플을 넣어줌
        before(()=>models.User.bulkCreate(tests))
        it('users 객체를 담은 배열을 응답한다', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array)
                    done()
                })
        })
        it('최대 Limit 개수만큼 응답한다', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2)
                    done()
                })
        })
    })
    describe('실패시', () => {
        it('limit 이 숫자형이 아니면 status:400 응답한다', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done)
        })
    })
})

describe('GET /users/1 는', () => {
    const tests = [
        { name: 'alice' },
        { name: 'bek' },
        { name: 'chris' }
    ]
    before(() => models.sequelize.sync({ force: true }))
    //DB에 자료가 없기 때문에 샘플을 넣어줌
    before(() => models.User.bulkCreate(tests))
    describe('성공시', () => {
        it('id가 1인 유저 객체를 반환한다.', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property("id", 1)
                    done()
                })
        })
    })
    describe('실패시', () => {
        it('Id가 숫자가 아닐 경우, status:400을 반환', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done)
        })
        it('id로 유저를 찾을 수 없는 경우, status:404을 반환', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done)
        })
    })
})

describe('DELETE /users/1 는', () => {
    const tests = [
        { name: 'alice' },
        { name: 'bek' },
        { name: 'chris' }
    ]
    before(() => models.sequelize.sync({ force: true }))
    //DB에 자료가 없기 때문에 샘플을 넣어줌
    before(() => models.User.bulkCreate(tests))
    describe('성공시', () => {
        it('status:204를 응답한다', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done)
        })
    })
    describe('실패시', () => {
        it('id가 숫자가 아닐경우, status:400를 응답한다', (done) => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done)
        })
    })
})

describe('POST /users 는', () => {
    const tests = [
        { name: 'alice' },
        { name: 'bek' },
        { name: 'chris' }
    ]
    before(() => models.sequelize.sync({ force: true }))
    //DB에 자료가 없기 때문에 샘플을 넣어줌
    before(() => models.User.bulkCreate(tests))
    describe('성공시', () => {
        let name = 'daniel',
            body;
        before(done => {
            request(app)
                .post('/users')
                .send({ name: 'daniel' })
                .expect(201)
                .end((err, res) => {
                    body = res.body
                    done()
                })
        })
        it('생성된 유저 객체 반환한다', () => {
            body.should.have.property('id')
        })
        it('입력한 유저 name을 반환한다', () => {
            body.should.have.property('name', name)
        })
    })
    describe('실패시', () => {
        it('name 파라미터 누락시 status:400 을 반환한다', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        })
        it('name이 중복일 경우 status:409를 반환한다', (done) => {
            request(app)
                .post('/users')
                .send({name:'null'})
                .expect(409)
                .end(done)
        })
    })
})
describe('PUT /users 는', () => {
    const tests = [
        { name: 'alice' },
        { name: 'bek' },
        { name: 'chris' }
    ]
    before(() => models.sequelize.sync({ force: true }))
    //DB에 자료가 없기 때문에 샘플을 넣어줌
    before(() => models.User.bulkCreate(tests))
    describe('성공시', () => {
        it('변경된 name을 응답한다', (done) => {
            const name = 'charlie'
            request(app)
                .put('/users/3')
                .send({name: name})
                .end((err, res) => {
                    res.body.should.have.property('name', name)
                    done()
                })
        })
    })
    describe('실패시', () => {
        it('정수가 아닌 id일 경우 400응답', (done) => {
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done)
        })
        it('name이 없을 경우 400을 응답', (done) => {
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done)
        })
        it('없는 유저일 경우 404응답', (done) => {
            request(app)
                .put('/users/999')
                .send({ name: 'dumy' })//테스트 코드 실패로 더미데이터 넣어줌
                .expect(404)
                .end(done)
        })
        it('이름이 중복일 경우 409응답', (done) => {
            request(app)
                .put('/users/2')
                .send({ name: 'chcol' })
                .expect(409)
                .end(done)
        })
    })
})