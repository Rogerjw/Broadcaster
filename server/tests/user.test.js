import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import User from '../models/user.model';
chai.use(chaiHttp);
chai.should();
describe('BroadCaster Api', () => {
    // signUp test
    it('should be able to signUp', (done) => {
        const user = {
            id: 1234567890123456,
            firstname: 'muhire',
            lastname: 'roger',
            email: 'rogermuhi@gmail.com',
            password: 'ajkldfjla',
            PhoneNumber: 99305657657,
            username: 'rogerjw'
          };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, res) => {
          res.status.should.be.equal(201);
          res.body.message.should.be.equal('User created successfully');
        });
      done();
    });
});