const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
const expect = chai.expect

describe('Frontend Routes', function() {
  it('Show the main page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
      done();
      })
  })

  it('Show the add PCB page', (done) => {
    chai.request(app)
      .get('/add')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
      done();
      })
  })

  it('Show a page with all PCBs', (done) => {
    chai.request(app)
      .get('/view')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
      done();
      })
  })
});

describe('API Routes', () => {
  it('GET a list of all PCBs', (done) => {
    chai.request(app)
      .get('/pcbs')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        expect(res.body).length.to.be.gt(0)
      done()
      })
  })

  it('GET a single PCB', (done) => {
    chai.request(app)
      .get('/pcbs/tim')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('object')
        expect(res.body).to.include.keys('name', 'type', 'productCode', 'bom', 'image_url')
      done()
      })
  })

})