import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { teams, avaiTteam } from './mocks/TeamMocks';
import SequelizeTeam from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });
  beforeEach(function () { sinon.restore(); });

  it('Return all teams', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Return a team by id', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(avaiTteam as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(avaiTteam);
  });

  // it('Return an empty array', async () => {
  //   sinon.stub(SequelizeTeam, "findAll").resolves([] as any);

  //   const { body, status } = await chai.request(app).get('/teams');

  //   expect(status).to.be.equal(200);
  //   expect(body).to.be.deep.equal([]);
  // });

  it('Return not found if the team doesn\'t exists', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1');    
    
    expect(status).to.equal(404);
    expect(body).to.equal('Team not found');
  });
  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
