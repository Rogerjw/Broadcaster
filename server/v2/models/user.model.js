import pool from '../db/config.db';
import queries from '../db/queries.db'

class User {
    constructor( id, firstname, lastname, email, password, PhoneNumber, username, type = 'citizen') {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.password = password;
      this.PhoneNumber = PhoneNumber;
      this.username = username;
      this.type = type;
    }
    static findUser (email){
      return pool.query(queries.findUser,[email]);
    }
    static addUser(user){
      return pool.query(queries.addUser,[user.id,user.firstname,user.lastname,user.email,user.password,user.PhoneNumber,
        user.username,user.type]);
    }
    
  }
  export default User;