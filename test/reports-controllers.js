process.env.NODE_ENV = 'test';

let chai = require('chai');
let server = require('../app');
let should = chai.should();
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Reports Controller - getReports', function () {
    describe('/GET reports', () => {
        it('Checks success response', function (done) {
            chai.request(server)
                .get('/reports')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("data");
                    done();
                })
        });
    });
});