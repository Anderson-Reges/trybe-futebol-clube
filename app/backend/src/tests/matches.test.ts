import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

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


  afterEach(()=>{
    sinon.restore();
  })
})