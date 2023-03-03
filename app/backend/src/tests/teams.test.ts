import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

import { app } from '../app';
import { teamsList } from './mocks/teams.mock';
import Team from '../database/models/team.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('checking the route "/teams"', () => {
  
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

  it('test if is return a error to the search for a id noexistente', async () => {
    let response: Response;

    sinon.stub(Team, 'findByPk').resolves(null);
    response = await chai.request(app).get('/teams/100');

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Team not found' });
  });

  afterEach(()=>{
    sinon.restore();
  })
});
