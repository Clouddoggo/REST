const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../src/index');

chai.use(chaiHttp);

describe("GET /contacts", () => {
    it("should get all contacts", (done) => {
        chai.request(app)
            .get('/api/contacts')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                done();
            });
    }).timeout(10000);
});