/* global describe it */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);




describe('Reports', () => {

      describe('GET /', () => {
          it('200 HAPPY PATH', (done) => {
              chai.request(server)
                  .get("/reports/week/1")
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.an("object");
                      res.body.text.should.be.an("string");
                      res.body.text.length.should.be.above(0);

                      done();
                  });
          });
      });

      describe('GET /reports/week/1', () => {
          it('200 HAPPY PATH', (done) => {
              chai.request(server)
                  .get("/reports/week/1")
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.an("object");
                      res.body.text.should.be.an("string");
                      res.body.text.length.should.be.above(0);

                      done();
                  });
          });
      });

      describe('GET /reports/week/2', () => {
          it('200 HAPPY PATH', (done) => {
              chai.request(server)
                  .get("/reports/week/2")
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.an("object");
                      res.body.text.should.be.an("string");
                      res.body.text.length.should.be.above(0);

                      done();
                  });
          });
      });

      describe('GET /reports/week/3', () => {
          it('200 HAPPY PATH', (done) => {
              chai.request(server)
                  .get("/reports/week/2")
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.an("object");
                      res.body.text.should.be.an("string");
                      res.body.text.length.should.be.above(0);

                      done();
                  });
          });
      });


      describe('GET /login/test_user', () => {
          it('Test', (done) => {
              chai.request(server)
                  .get("/login/test_user")
                  .end((err, res) => {
                      console.log(err);
                      console.log(res.body);

                      done();
                  });
          });
      });



});
