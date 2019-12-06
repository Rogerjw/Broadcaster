
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../server';
import generateToken from '../helpers/generateToken';

dotenv.config();
chai.use(chaiHttp);
const { expect } = chai;
const mochaAsync = (fn) => async () => {
  try {
    await fn();
  } catch (err) {
    console.error(err);
  }
};

describe('Api endpoints', () => {
  it('should be able to signUp', mochaAsync(async () => {
    const user = {
      firstname: 'muhire',
      lastname: 'roger',
      email: 'muhireroger@gmail.com',
      password: 'Vanrogo1997',
      PhoneNumber: '0781870110',
      username: 'rogerjw',
    };
    const result = await chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user);
    expect(result.body.status).to.equal(201);
    expect(result.body).to.be.an('object');
    expect(result.body.message).to.be.a('string');
  }));
  it('should not be able to signUp with an existing email', mochaAsync(async () => {
    const user = {
      firstname: 'muhire',
      lastname: 'roger',
      email: 'muhireroger@gmail.com',
      password: 'Vanrogo1997',
      PhoneNumber: '0781870110',
      username: 'rogerjw',
    };
    const result = await chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user);
    expect(result.body.status).to.equal(409);
    expect(result.body.message).to.be.a('string');
  }));

  it('should be able to login', mochaAsync(async () => {
    const user = {
      email: 'muhireroger@gmail.com',
      password: 'Vanrogo1997',
    };
    const result = await chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user);
    expect(result.body.status).to.equal(200);
    expect(result.body.message).to.be.a('string');
  }));
  it('should not be able to login with incorrect credentials', mochaAsync(async () => {
    const user = {
      email: 'muhireroger@gmail.com',
      password: 'muhirero',
    };
    const result = await chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user);
    expect(result.body.status).to.equal(404);
    expect(result.body.message).to.be.a('string');
  }));
  const genToken = generateToken('muhireroger@gmail.com');
  const invalidToken = 'ey789GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvZ2VybXVoaXJlQGdtYWlsLmNvbSIsImlhdCI6MTU3NDM2MzI2NH0.hQlnQbYeWzniuIB5SawtSIuXijUqCoGf67NfSAR9faQ';

  it('should be able to create a redflag record', mochaAsync(async () => {
    const redflag = {
      title: 'Corruption',
      type: 'Redflag',
      comment: 'last night,i was asked to bribe a police off...',
      location: 'Latitude:-1.9570688 Longitude:30.101504',
      status: 'pending',
      images: ['image.png', 'image.png'],
      videos: ['video.mp4', 'video.mp4'],
    };
    const result = await chai.request(server)
      .post('/api/v2/redflags')
      .set('token', genToken)
      .send(redflag);
    expect(result.body.status).to.equal(201);
  }));

  it('should not be able to fetch all redflags with no token', mochaAsync(async () => {
    const result = await chai.request(server)
      .get('/api/v2/redflags');
    expect(result.body.status).to.equal(401);
    expect(result.body.message).to.be.a('string');
  }));

  it('should not be able to fetch all redflags with invalid token', mochaAsync(async () => {
    const result = await chai.request(server)
      .get('/api/v2/redflags')
      .set('token', invalidToken);
    expect(result.body.status).to.equal(500);
  }));
  it('should be able to fetch all redflags', mochaAsync(async () => {
    const result = await chai.request(server)
      .get('/api/v2/redflags')
      .set('token', genToken);
    expect(result.body.status).to.equal(200);
  }));

  it('should be able to fetch a redflag record', mochaAsync(async () => {
    const result = await chai.request(server)
      .get('/api/v2/redflags/1')
      .set('token', genToken);
    expect(result.body.status).to.equal(200);
  }));

  it('should be not able to fetch a specific redflag with wrong id', mochaAsync(async () => {
    const result = await chai.request(server)
      .get('/api/v2/redflags/7')
      .set('token', genToken);
    expect(result.body.status).to.equal(404);
  }));
  // //edit a location
  it('should be able to update the location of a specific redflag', mochaAsync(async () => {
    const redflag = {
      location: 'Latitude:-1.9570688 Longitude:25.101504',
      status: 'pending',
    };
    const result = await chai.request(server)
      .patch('/api/v2/redflags/1/location')
      .set('token', genToken)
      .send(redflag);
    expect(result.body.status).to.equal(200);
  }));
  it('should be not able to update the location of a specific redflag,if user not a citizen', mochaAsync(async () => {
    const redflag = {
      location: 'Latitude:-1.9570688 Longitude:25.101504',
    };
    const result = await chai.request(server)
      .patch('/api/v2/redflags/1/location')
      .send(redflag);
    expect(result.body.status).to.equal(401);
  }));
  it('should be not able to update the location of a specific redflag,if status not pending', mochaAsync(async () => {
    const rredflag = {
      location: 'Latitude:-1.9570688 Longitude:25.101504',
      status: 'rejected',
    };
    const result = await chai.request(server)
      .patch('/api/v2/redflags/1/location')
      .set('token', genToken)
      .send(rredflag);
    expect(result.body.status).to.equal(401);
  }));
  it('should be not able to update the location of a not found redflag', mochaAsync(async () => {
    const result = await chai.request(server)
      .patch('/api/v2/redflags/99/location')
      .set('token', genToken);
    expect(result.body.status).to.equal(404);
  }));
  // //edit a comment
  it('should be able to update the comment of a specific redflag', mochaAsync(async () => {
    const redflag = {
      comment: 'last night,i was asked to bribe a police off...',
      status: 'pending',
    };
    const result = await chai.request(server)
      .patch('/api/v2/redflags/1/comment')
      .set('token', genToken)
      .send(redflag);
    expect(result.body.status).to.equal(200);
  }));
  it('should be not able to update the comment of a specific comment,if user not a citizen', mochaAsync(async () => {
    const redflag = {
      comment: 'last night,i was asked to bribe a police off...',
    };
    const result = await chai.request(server)
      .patch('/api/v2/redflags/1/comment')
      .send(redflag);
    expect(result.body.status).to.equal(401);
  }));
  it('should be not able to update the comment of a specific redflag,if status not pending', mochaAsync(async () => {
    const rredflag = {
      comment: 'last night,i was asked to bribe a police off...',
      status: 'rejected',
    };
    const result = await chai.request(server)
      .patch('/api/v2/redflags/1/comment')
      .set('token', genToken)
      .send(rredflag);
    expect(result.body.status).to.equal(401);
  }));
  it('should be not able to update the comment of a not found redflag', mochaAsync(async () => {
    const result = await chai.request(server)
      .patch('/api/v2/redflags/99/comment')
      .set('token', genToken);
    expect(result.body.status).to.equal(404);
  }));
  // delete a redflag
  it('should be able to delete a specific redflag record', mochaAsync(async () => {
    const redflag = {
      status: 'pending',
    };
    const result = await chai.request(server)
      .delete('/api/v2/redflags/1')
      .set('token', genToken)
      .send(redflag);
    expect(result.body.status).to.equal(200);
  }));
  it('should not be able to delete a specific redflag,if user not a citizen', mochaAsync(async () => {
    const redflag = {
      status: 'rejected',
    };
    const result = await chai.request(server)
      .delete('/api/v2/redflags/2')
      .send(redflag);
    expect(result.body.status).to.equal(401);
  }));
  it('should be able to create a redflag record', mochaAsync(async () => {
    const redflag = {
      title: 'Corruption',
      type: 'Redflag',
      comment: 'last night,i was asked to bribe a police off...',
      location: 'Latitude:-1.9570688 Longitude:30.101504',
      status: 'pending',
      images: ['image.png', 'image.png'],
      videos: ['video.mp4', 'video.mp4'],
    };
    const result = await chai.request(server)
      .post('/api/v2/redflags')
      .set('token', genToken)
      .send(redflag);
    expect(result.body.status).to.equal(201);
  }));
  it('should not be able to delete a specific redflag,if status not pending', mochaAsync(async () => {
    const rredflag = {
      comment: 'last night,i was asked to bribe a police off...',
      status: 'rejected',
    };
    const result = await chai.request(server)
      .delete('/api/v2/redflags/2')
      .set('token', genToken)
      .send(rredflag);
    expect(result.body.status).to.equal(401);
  }));
  it('should be not able to delete a redflag of a not found redflag', mochaAsync(async () => {
    const result = await chai.request(server)
      .delete('/api/v2/redflags/99')
      .set('token', genToken);
    expect(result.body.status).to.equal(404);
  }));
});
