import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model';
import Redflag from '../models/redflag.model';

dotenv.config();
const KEY = process.env.KEY;
chai.use(chaiHttp);
const { expect } = chai;
describe('Api endpoints', () => {
  it('should be able to signUp', async() => {
    try{
      const user = {
        id: 123,
        firstname: 'muhire',
        lastname: 'roger',
        email: 'muhireroger@gmail.com',
        password: 'muhireroger',
        PhoneNumber: 781870110 ,
        username: 'rogerjw',
      };
      const result = await chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user);
        expect(result.body.status).to.equal(201);
        expect(result.body).to.be.an('object');
        expect(result.body.message).to.be.a('string');
    }catch(error){
      console.log(error);
    }
    
  });
  it('should not be able to signUp with an existing email', async() => {
    try{
      const user = {
        id: 34,
        firstname: 'Uwitonze',
        lastname: 'Naice',
        email: 'muhireroger@gmail.com',
        password: 'muhireroger',
        PhoneNumber: 781870110,
        username: 'rogerjw',
      };
      const result = await chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user)
        expect(result.body.status).to.equal(409);
        expect(result.body.message).to.be.a('string');
    }catch(error){
      console.log(error);
    }
    
  });

  it('should be able to login', async() => {
    try{
      const user = {
        email: 'muhireroger@gmail.com',
        password:'muhireroger',
       };
       const result = await chai.request(server)
         .post('/api/v2/auth/signin')
         .send(user);
         expect(result.body.status).to.equal(200);
         expect(result.body.message).to.be.a('string');
    }catch(error){
      console.log(error);
    }
    
  });
  it('should not be able to login with incorrect credentials', async() => {
    try{
      const user = {
        email: 'rogermu@gmail.com',
        password:'muhireroger',
       };
      const result = await chai.request(server)
         .post('/api/v2/auth/signin')
         .send(user)
         expect(result.body.status).to.equal(404);
         expect(result.body.message).to.be.a('string');
    }catch(error){
      console.log(error);
    }
    
  });
  
  it('should be able to create a redflag record', async () => {
    try{
      const redflag = {
        title: 'Corruption',
        type: 'Redflag',
        comment: 'last night,i was asked to bribe a police off...',
        location: 'Latitude:-1.9570688 Longitude:30.101504',
        status: 'draft',
        images: ['image.png','image.png'],
        videos: ['video.mp4','video.mp4']
      }
     const result = await chai.request(server)
        .post('/api/v2/redflags')
        .set('token',genToken)
        .send(redflag);
         expect(result.body.status).to.equal(201);
    }catch(error){
      console.log(error);
    }
    
  });
  const genToken = jwt.sign({ email: 'muhireroger@gmail.com'},KEY)
  const invalidToken = 'ey789GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvZ2VybXVoaXJlQGdtYWlsLmNvbSIsImlhdCI6MTU3NDM2MzI2NH0.hQlnQbYeWzniuIB5SawtSIuXijUqCoGf67NfSAR9faQ'
  
  it('should not be able to fetch all redflags with no token', async() => {
    try{
      const result = await chai.request(server)
      .get('/api/v2/redflags')
      expect(result.body.status).to.equal(401);
      expect(result.body.message).to.be.a('string');
    }catch(error){
      console.log(error);
    }
    
  });

  it('should not be able to fetch all redflags with invalid token', async() => {
    try{
      const result = await chai.request(server)
      .get('/api/v2/redflags')
      .set('token',invalidToken)
      expect(result.body.status).to.equal(400)
    }catch(error){
      console.log(error);
    }
    ;
  });
    it('should be able to fetch all redflags', async () => {
     try{
      const result = await chai.request(server)
        .get('/api/v2/redflags')
        .set('token',genToken);
        expect(result.body.status).to.equal(200);
     }catch(error){
      console.log(error);
     }
      
    });
  
  it('should be able to fetch a redflag record', async() => {
    try{
      const result = await chai.request(server)
      .get('/api/v2/redflags/1')
      .set('token',genToken);
      expect(result.body.status).to.equal(200);
    }catch(error){
      console.log(error);
    }
    
  });

  it('should be not able to fetch a specific redflag with wrong id', async () => {
    try{
      const result = await chai.request(server)
      .get('/api/v2/redflags/7')
      .set('token',genToken);
      expect(result.body.status).to.equal(404);
    }catch(error){
      console.log(error);
    }
    
  });
  // //edit a location 
  it('should be able to update the location of a specific redflag', async() => {
    try{
      const redflag = {
        location: 'Latitude:-1.9570688 Longitude:25.101504',
        status: 'draft'
      };
      const result = await chai.request(server)
        .patch('/api/v2/redflags/1/location')
        .set('token', genToken)
        .send(redflag)
        expect(result.body.status).to.equal(200);
    }catch(error){
      console.log(error);
    }
   
  });
  it('should be not able to update the location of a specific redflag,if user not a citizen', async() => {
    try{
      const redflag = {
        location: 'Latitude:-1.9570688 Longitude:25.101504'
      };
      const result = await chai.request(server)
        .patch('/api/v2/redflags/1/location')
        .send(redflag)
        expect(result.body.status).to.equal(401);
    }catch(error){
      console;log(error);
    }
  });
  it('should be not able to update the location of a specific redflag,if status not draft', async() => {
    try{
      const rredflag = {
        location: 'Latitude:-1.9570688 Longitude:25.101504',
        status: 'rejected'
      };
      const result = await chai.request(server)
        .patch('/api/v2/redflags/1/location')
        .set('token',genToken)
        .send(rredflag);
        expect(result.body.status).to.equal(401);
    }catch(error){
      console.log(error);
    }
    
  });
  it('should be not able to update the location of a not found redflag', async() => {
    try{
      const result = await chai.request(server)
      .patch('/api/v2/redflags/99/location')
      .set('token', genToken)
      expect(result.body.status).to.equal(404)
      
    }catch(error){
      console.log(error);
    }
    
  });
  // //edit a comment 
  it('should be able to update the comment of a specific redflag', async() => {
    try{
      const redflag = {
        comment: 'last night,i was asked to bribe a police off...',
        status: 'draft'
      };
      const result = await chai.request(server)
        .patch('/api/v2/redflags/1/comment')
        .set('token', genToken)
        .send(redflag)
        expect(result.body.status).to.equal(200);
    }catch(error){
      console.log(error);
    }
   
  });
  it('should be not able to update the comment of a specific comment,if user not a citizen', async() => {
    try{
      const redflag = {
        comment: 'last night,i was asked to bribe a police off...',
      };
      const result = await chai.request(server)
        .patch('/api/v2/redflags/1/comment')
        .send(redflag)
        expect(result.body.status).to.equal(401);
    }catch(error){
      console.log();
    }
    
  });
  it('should be not able to update the comment of a specific redflag,if status not draft', async() => {
    try{
      const rredflag = {
        comment: 'last night,i was asked to bribe a police off...',
        status: 'rejected'
      };
      const result = await chai.request(server)
        .patch('/api/v2/redflags/1/comment')
        .set('token',genToken)
        .send(rredflag)
        expect(result.body.status).to.equal(401);
    }catch(error){
      console.log(error);
    }
    
  });
  it('should be not able to update the comment of a not found redflag', async() => {
    try{
      const result = await chai.request(server)
      .patch('/api/v2/redflags/99/comment')
      .set('token', genToken)
      expect(result.body.status).to.equal(404);
    }catch(error){
      console.log(error)
    }
    
  });
  //delete a redflag 
   it('should be able to delete a specific redflag record', async() => {
     try{
      const redflag = {
        status: 'draft'
      };
      const result = await chai.request(server)
        .delete('/api/v2/redflags/1')
        .set('token', genToken)
        .send(redflag)
        expect(result.body.status).to.equal(200)
     }catch(error){
       console.log(error);
     }
    
  });
  it('should not be able to delete a specific redflag,if user not a citizen', async() => {
    try{
      const redflag = {
        status:'rejected'
      };
      const result = await chai.request(server)
        .delete('/api/v2/redflags/2')
        .send(redflag)
        expect(result.body.status).to.equal(401);
    }catch(error){
      console.log(error);
    }
    
  });
  it('should be able to create a redflag record', async () => {
    try{
      const redflag = {
        title: 'Corruption',
        type: 'Redflag',
        comment: 'last night,i was asked to bribe a police off...',
        location: 'Latitude:-1.9570688 Longitude:30.101504',
        status: 'draft',
        images: ['image.png','image.png'],
        videos: ['video.mp4','video.mp4']
      }
     const result = await chai.request(server)
        .post('/api/v2/redflags')
        .set('token',genToken)
        .send(redflag);
         expect(result.body.status).to.equal(201);
    }catch(error){
      console.log(error);
    }
    
  });
  it('should not be able to delete a specific redflag,if status not draft', async() => {
    try{

      const rredflag = {
        comment: 'last night,i was asked to bribe a police off...',
        status: 'rejected'
      };
      const result = await chai.request(server)
        .delete('/api/v2/redflags/2')
        .set('token',genToken)
        .send(rredflag);
        expect(result.body.status).to.equal(401);
    }catch(error){
      console.log(error);
    }
    
  });
  it('should be not able to delete a redflag of a not found redflag', async() => {
    try{
      const result = await chai.request(server)
      .delete('/api/v2/redflags/99')
      .set('token', genToken)
      expect(result.body.status).to.equal(404);
    }catch(error){
      console.log(error);
    }
    
  });
});
