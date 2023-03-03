import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('checking the route "/matches"', () => {
  it('test if list all matches', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .then((res) => {
        expect(res.status).to.be.equal(200)
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an('array') && expect(res.body[0]).to.be.a('object');
      }) as Response
  })

  it('test if list all matches in progress or not', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .query({inProgress: true})
      .then((res) => {
        expect(res.status).to.be.equal(200)
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an('array') && expect(res.body[0]).to.be.a('object');
      }) as Response
  })

  it('test if is possible finish a match', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: "admin@admin.com", password: "secret_admin"})
      const token = chaiHttpResponse.body.token;

      chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/48/finish')
      .set('authorization', token)
      .then((res) => {
        expect(res.status).to.be.equal(200)
        expect(res.body.message).to.be.equal('Finished')
      }) as Response
  })

  it('test if is possible update a match', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: "admin@admin.com", password: "secret_admin"})
      const token = chaiHttpResponse.body.token;

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .set('authorization', token)
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 1
      })
      .then((res) => {
        expect(res.status).to.be.equal(200)
        expect(res.body.message).to.be.equal('Match updated with success')
      }) as Response
  })

  it('test if is possible create a match', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: "admin@admin.com", password: "secret_admin"})
      const token = chaiHttpResponse.body.token;

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', token)
      .send({
        homeTeamId: 16,
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      })
      .then((res) => {
        expect(res.status).to.be.equal(201)
        expect(res.body).not.to.be.empty
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('homeTeamId')
        expect(res.body).to.have.property('awayTeamId')
        expect(res.body).to.have.property('homeTeamGoals')
        expect(res.body).to.have.property('awayTeamGoals')
        expect(res.body).to.have.property('inProgress')
      }) as Response
  })

  it('test if is possible create a match with teamId nonexistent', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: "admin@admin.com", password: "secret_admin"})
      const token = chaiHttpResponse.body.token;
    
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', token)
      .send({
        "homeTeamId": 999,
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      })
      .then((res) => {
        expect(res.status).to.be.equal(404)
        expect(res.body).not.to.be.empty
        expect(res.body.message).to.be.equal('There is no team with such id!')
      }) as Response
  })

  it('test if is possible create a match with teamId identical', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: "admin@admin.com", password: "secret_admin"})
      const token = chaiHttpResponse.body.token;

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', token)
      .send({
        "homeTeamId": 8,
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      })
      .then((res) => {
        expect(res.status).to.be.equal(422)
        expect(res.body).not.to.be.empty
        expect(res.body.message).to.be.equal('It is not possible to create a match with two equal teams')
      }) as Response
  })

  afterEach(()=>{
    sinon.restore();
  })
})