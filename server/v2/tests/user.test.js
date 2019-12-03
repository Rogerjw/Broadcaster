import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const KEY = process.env.KEY;
const { expect } = chai;
chai.use(chaiHttp);

describe('Api endpoints', () => {
  it('should be able to signUp',(done) => {
      const user = {
        id: 14,
        firstname: 'muhire',
        lastname: 'roger',
        email: 'muhireroger@gmail.com',
        password: 'ajkldfjla',
        PhoneNumber: 781870110 ,
        username: 'rogerjw',
      };
      chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((error, res) => {
        res.status.should.be.equal(201);
        res.body.message.should.be.equal('User created successfully');
      });
    done();
    });
  it('should not be able to signUp with an existing email', (done) => {
    const user = {
      id: 1234567890123456,
      firstname: 'muhire',
      lastname: 'roger',
      email: 'rogermuhire@gmail.com',
      password: 'ajkldfjla',
      PhoneNumber: 99305657657,
      username: 'rogerjw',
    };
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((error, res) => {
        res.status.should.be.equal(409);
        res.body.message.should.be.equal('Email already exists');
      });
    done();
  });

  it('should be able to login', (done) => {
    const user = {
     email: 'rogermuhire@gmail.com',
     password:'muhireroger',
    };
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((error, res) => {
        res.status.should.be.equal(200);
        res.body.message.should.be.equal('User is successfully logged in');
      });
    done();
  });
  it('should not be able to login with incorrect credentials', (done) => {
    const user = {
     email: 'rogermu@gmail.com',
     password:'muhireroger',
    };
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((error, res) => {
        res.status.should.be.equal(404);
        res.body.message.should.be.equal('incorrect email or password');
      });
    done();
  });
  it('should not be able to fetch all redflags with no token', (done) => {
    
    chai.request(server)
      .get('/api/v2/redflags')
      .end((error, res) => {
        res.status.should.be.equal(401);
        res.body.message.should.be.equal('Please sign in first.');
      });
    done();
  });
  const genToken = jwt.sign({ email: 'unaice@gmail.com'},KEY)
  const invalidToken = 'ey789GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvZ2VybXVoaXJlQGdtYWlsLmNvbSIsImlhdCI6MTU3NDM2MzI2NH0.hQlnQbYeWzniuIB5SawtSIuXijUqCoGf67NfSAR9faQ'
  it('should not be able to fetch all redflags with invalid token', (done) => {
    
    chai.request(server)
      .get('/api/v2/redflags')
      .set('token',invalidToken)
      .end((error, res) => {
        res.status.should.be.equal(400);
      });
    done();
  });
    it('should be able to fetch all redflags', (done) => {
    
      chai.request(server)
        .get('/api/v2/redflags')
        .set('token',genToken)
        .end((error, res) => {
          res.status.should.be.equal(200);
        });
      done();
    });
  
  it('should be able to fetch a redflag record', (done) => {
    
    chai.request(server)
      .get('/api/v2/redflags/1')
      .set('token',genToken)
      .end((error, res) => {
        res.status.should.be.equal(200);
      });
    done();
  });

  it('should be not able to fetch a specific redflag with wrong id', (done) => {
    chai.request(server)
      .get('/api/v2/redflags/7')
      .set('token',genToken)
      .end((error, res) => {
        res.status.should.be.equal(404);
      });
    done();
  });
  it('should be able to create a redflag record', (done) => {
    const redflag = {
      title: 'Corruption',
      type: 'Redflag',
      comment: 'last night,i was asked to bribe a police off...',
      location: 'Latitude:-1.9570688 Longitude:30.101504',
      status: 'draft',
      images: ['image.png','image.png'],
      videos: ['video.mp4','video.mp4']
    }
    chai.request(server)
      .post('/api/v2/redflags')
      .set('token',genToken)
      .send(redflag)
      .end((error, res) => {
        res.status.should.be.equal(201);
      });
    done();
  });
  //edit a location 
  it('should be able to update the location of a specific redflag', (done) => {
    const redflag = {
      location: 'Latitude:-1.9570688 Longitude:25.101504',
      status: 'draft'
    };
    chai.request(server)
      .patch('/api/v2/redflags/2/location')
      .set('token', genToken)
      .send(redflag)
      .end((error, res) => {
        res.status.should.be.equal(200);
      });
    done();
  });
  it('should be not able to update the location of a specific redflag,if user not a citizen', (done) => {
    const redflag = {
      location: 'Latitude:-1.9570688 Longitude:25.101504'
    };
    chai.request(server)
      .patch('/api/v2/redflags/2/location')
      .send(redflag)
      .end((error, res) => {
        res.status.should.be.equal(401);
      });
    done();
  });
  it('should be not able to update the location of a specific redflag,if status not draft', (done) => {
    const rredflag = {
      location: 'Latitude:-1.9570688 Longitude:25.101504',
      status: 'rejected'
    };
    chai.request(server)
      .patch('/api/v2/redflags/2/location')
      .set('token',genToken)
      .send(rredflag)
      .end((error, res) => {
        res.status.should.be.equal(401);
      });
    done();
  });
  it('should be not able to update the location of a not found redflag', (done) => {
    chai.request(server)
      .patch('/api/v2/redflags/6/location')
      .set('token', genToken)
      .end((error, res) => {
        res.status.should.be.equal(404);
      });
    done();
  });
  //edit a comment 
  it('should be able to update the comment of a specific redflag', (done) => {
    const redflag = {
      comment: 'last night,i was asked to bribe a police off...',
      status: 'draft'
    };
    chai.request(server)
      .patch('/api/v2/redflags/2/comment')
      .set('token', genToken)
      .send(redflag)
      .end((error, res) => {
        res.status.should.be.equal(200);
      });
    done();
  });
  it('should be not able to update the comment of a specific comment,if user not a citizen', (done) => {
    const redflag = {
      comment: 'last night,i was asked to bribe a police off...',
    };
    chai.request(server)
      .patch('/api/v2/redflags/2/comment')
      .send(redflag)
      .end((error, res) => {
        res.status.should.be.equal(401);
      });
    done();
  });
  it('should be not able to update the comment of a specific redflag,if status not draft', (done) => {
    const rredflag = {
      comment: 'last night,i was asked to bribe a police off...',
      status: 'rejected'
    };
    chai.request(server)
      .patch('/api/v2/redflags/2/comment')
      .set('token',genToken)
      .send(rredflag)
      .end((error, res) => {
        res.status.should.be.equal(401);
      });
    done();
  });
  it('should be not able to update the comment of a not found redflag', (done) => {
    chai.request(server)
      .patch('/api/v2/redflags/6/comment')
      .set('token', genToken)
      .end((error, res) => {
        res.status.should.be.equal(404);
      });
    done();
  });
  //delete a redflag 
   it('should be able to delete a specific redflag record', (done) => {
    const redflag = {
      status: 'draft'
    };
    chai.request(server)
      .delete('/api/v2/redflags/2')
      .set('token', genToken)
      .send(redflag)
      .end((error, res) => {
        res.status.should.be.equal(200);
      });
    done();
  });
  it('should not be able to delete a specific redflag,if user not a citizen', (done) => {
    const redflag = {
      status:'rejected'
    };
    chai.request(server)
      .delete('/api/v2/redflags/2')
      .send(redflag)
      .end((error, res) => {
        res.status.should.be.equal(401);
      });
    done();
  });
  it('should not be able to delete a specific redflag,if status not draft', (done) => {
    const rredflag = {
      comment: 'last night,i was asked to bribe a police off...',
      status: 'rejected'
    };
    chai.request(server)
      .delete('/api/v2/redflags/1')
      .set('token',genToken)
      .send(rredflag)
      .end((error, res) => {
        res.status.should.be.equal(401);
      });
    done();
  });
  it('should be not able to delete a redflag of a not found redflag', (done) => {
    chai.request(server)
      .delete('/api/v2/redflags/6')
      .set('token', genToken)
      .end((error, res) => {
        res.status.should.be.equal(404);
      });
    done();
  });
});
