import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { teamsList } from './mocks/teams.mock';
import Team from '../database/models/team.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('check a route "/teams"', () => {
  
  it('test if list all teams', async () => {
    const response = await chai
      .request(app)
      .get('/teams');
    
    sinon.stub(Team, 'findAll').resolves(teamsList as Team[])
    
    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(teamsList)
  });

  it('test if list one team', async () => {
    const response = await chai
      .request(app)
      .get('/teams/1');
    
    sinon.stub(Team, 'findByPk').resolves(teamsList[0] as Team)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(teamsList[0])
  })

  afterEach(()=>{
    sinon.restore();
  })
});
