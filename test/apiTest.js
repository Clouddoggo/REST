const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const Contact = require('../src/model/contactModel');

chai.use(chaiHttp);
chai.should();

// TODO: fix travis

describe("GET /contacts", () => {
    it("should get all contacts", (done) => {
        chai.request(app)
            .get('/api/contacts')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                done();
            });
    }).timeout(10000);
});

describe("POST /contacts", () => {
    const newContact = new Contact({ name: 'Alice', email: 'al1c3@hotmail.com', phone: '01028475621221' });
    after((done) => {
        // TODO: Fix the deletion of added contacts
        newContact.delete((err) => {
            done();
        })
    });

    it("should create a new contact", (done) => {
        chai.request(app)
            .post('/api/contacts')
            .send(newContact)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    }).timeout(10000);
});

describe("DEL /contacts/:contact_id", () => {
    const newContact = new Contact({ name: 'Bob', email: 'bobby11@email.com', phone: '91234567' });
    let id = '';
    before((done) => {
        newContact.save((err) => {
            id = newContact._id;
            done();
        })
    });

    after((done) => {
        newContact.delete((err) => {
            done();
        })
    });

    it("should delete a new contact", (done) => {
        chai.request(app)
            .delete(`/api/contacts/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    }).timeout(10000);
});

describe("GET /contacts/:contact_id", () => {
    const newContact = new Contact({ name: 'Charlie', email: 'charlie@example.com', phone: '87654321' });
    let id = '';
    before((done) => {
        newContact.save((err) => {
            id = newContact._id;
            done();
        })
    });

    after((done) => {
        newContact.delete((err) => {
            done();
        })
    });

    it("should get a contact", (done) => {
        chai.request(app)
            .get(`/api/contacts/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                done();
            }).timeout(10000);
    });
});

describe("UPDATE /contact/:contact_id with PATCH or PUT", () => {
    describe("PATCH /contacts/:contact_id", () => {
        const newContact = new Contact({ name: 'Derrick', email: 'd3rr1c2@example.email.com', phone: '455778796' });
        let id = '';
        before((done) => {
            newContact.save((err) => {
                id = newContact._id;
                done();
            })
        })

        after((done) => {
            newContact.delete((err) => {
                done();
            })
        })

        it("should update the contact's name", (done) => {
            chai.request(app)
                .patch(`/api/contacts/${id}`)
                .send({ name: 'Elinei' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(10000);

        it("should update the contact's email", (done) => {
            chai.request(app)
                .patch(`/api/contacts/${id}`)
                .send({ email: 'Elineyparky@gmail.com' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(10000);
    });

    describe("PUT /contacts/:contact_id", () => {
        const newContact = new Contact({ name: 'Felix', email: 'kjellberg@example.email.com', phone: '435257667' });
        let id = '';
        before((done) => {
            newContact.save((err) => {
                id = newContact._id;
                done();
            })
        })

        after((done) => {
            newContact.delete((err) => {
                done();
            })
        })

        it("should update the contact's name", (done) => {
            chai.request(app)
                .put(`/api/contacts/${id}`)
                .send({ name: 'Philipe' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(10000);

        it("should update the contact's phone", (done) => {
            chai.request(app)
                .put(`/api/contacts/${id}`)
                .send({ phone: '001340658356' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(10000);
    });
});