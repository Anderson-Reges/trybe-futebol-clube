import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import TeamService from '../services/TeamsService';
import { teamsList } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('testa a rota "/teams"', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(new TeamService, 'findAll')
      .resolves(teamsList);
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('Testa a listagem de todos os times', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams');

    expect(chaiHttpResponse).to.have.property('status')
    expect(chaiHttpResponse.status).to.be.equal(200)
  });
});
