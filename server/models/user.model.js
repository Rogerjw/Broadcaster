

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
  }
  export default User;