import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('checking the route "/login"', () => {

  it('test if is possible to login', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: "admin@admin.com", password: "secret_admin"})
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token')
      }) as Response
  })

  it('test if is possible to login without email', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: "secret_admin" })
      .then((res) => {
        expect(res.status).to.be.equal(400)
        expect(res.body.message).to.be.equal('All fields must be filled')
      }) as Response
  })

  it('test if is possible to login without password', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: "admin@admin.com" })
      .then((res) => {
        expect(res.status).to.be.equal(400)
        expect(res.body.message).to.be.equal('All fields must be filled')
      }) as Response   
  })

  it('test if is possible to login with email invalid', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: "admin@admin", password: "secret_admin"})
      .then((res) => {
        expect(res.status).to.be.equal(401)
        expect(res.body.message).to.be.deep.equal('Invalid email or password')
      }) as Response
  })

  it('test if is possible to login with password invalid', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: "admin@admin.com", password: "12345"})
      .then((res) => {
        expect(res.status).to.be.equal(401)
        expect(res.body.message).to.be.deep.equal('Invalid email or password')
      }) as Response
  })

  afterEach(()=>{
    sinon.restore();
  })
})

describe('checking the route "/login/role"', () => {
  it('test if is possible know the role of user', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: "admin@admin.com", password: "secret_admin"})
      const token = chaiHttpResponse.body.token;

      chaiHttpResponse = await chai
        .request(app)
        .get('/login/role')
        .set('authorization', token)
        .then((res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.have.property('role');
      }) as Response;
  })

  it('test if is possible know the role without token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/role')
        .then((res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body.message).to.be.equal('Token not found');
      }) as Response;
  })

  it('test if is possible know the role with invalid token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('authorization', '9999')
      .then((res) => {
        expect(res.status).to.be.equal(401);
        expect(res.body.message).to.be.equal('Token must be a valid token');
    }) as Response;
})

  afterEach(()=>{
    sinon.restore();
  })
})