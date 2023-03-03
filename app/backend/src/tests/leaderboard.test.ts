import { ILeaderboard } from './../interfaces/leaderboard.interface';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('checking the route "/leaderboard"', () => {
  it('test if is possible list all leaderboard', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard')
      .then((res) => {
        expect(res.status).to.be.equal(200)
        expect(res.body).not.to.be.empty
        res.body.forEach((obj: ILeaderboard) => {
          expect(obj).to.be.an('object')
          expect(obj).not.to.be.empty
        })
      }) as Response
  })

  it('test if is possible list all leaderboard', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
      .then((res) => {
        expect(res.status).to.be.equal(200)
        expect(res.body).not.to.be.empty
        res.body.forEach((obj: ILeaderboard) => {
          expect(obj).to.be.an('object')
          expect(obj).not.to.be.empty
        })
      }) as Response
  })

  it('test if is possible list all leaderboard', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away')
      .then((res) => {
        expect(res.status).to.be.equal(200)
        expect(res.body).not.to.be.empty
        res.body.forEach((obj: ILeaderboard) => {
          expect(obj).to.be.an('object')
          expect(obj).not.to.be.empty
        })
      }) as Response
  })

  afterEach(() => {
    sinon.restore
  })
})