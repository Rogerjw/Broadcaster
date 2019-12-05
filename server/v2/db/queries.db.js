
const createUserTable = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    phonenumber VARCHAR(128) NOT NULL,
    username VARCHAR(128) NOT NULL UNIQUE,
    type VARCHAR(128) NOT NULL
  )`;
const createRedflagTable = `CREATE TABLE IF NOT EXISTS
      redflag(
        id SERIAL PRIMARY KEY,
        createdOn VARCHAR(128) NOT NULL,
        createdBy VARCHAR(128) NOT NULL,
        title VARCHAR(128) NOT NULL,
        type VARCHAR(128) NOT NULL,
        location VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        images VARCHAR(128) NOT NULL,
        videos VARCHAR(128) NOT NULL,
        comment VARCHAR(128) NOT NULL
      )`;
const deleteAllTables = `
      DROP TABLE IF EXISTS
          users, redflag`;
const findUser = 'select * from users where email= $1';
const findUserWithUsername = 'select * from users where username = $1';
const addUser = `
    INSERT INTO
        users (firstname, lastname, email, password, phonenumber, username, type)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
const addRedflag = `INSERT INTO redflag(createdOn, createdBy, title, type, location, status, images, videos, comment)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`;
const getAllRedflags = 'SELECT * FROM redflag';
const findOneRedflag = 'SELECT * FROM redflag WHERE id = $1';
const deleteOneRedflag = 'DELETE FROM redflag WHERE id = $1 RETURNING *';
const editOneLocation = 'UPDATE redflag SET location = $1 WHERE id = $2 RETURNING *';
const editOneComment = 'UPDATE redflag SET comment = $1 WHERE id = $2 RETURNING *';
const deleteAllvaluesRedflag = 'DELETE FROM redflag';
const deleteAllvaluesUsers = 'DELETE FROM users';
export default {
  createUserTable,
  createRedflagTable,
  deleteAllTables,
  findUser,
  findUserWithUsername,
  addUser,
  addRedflag,
  getAllRedflags,
  findOneRedflag,
  deleteOneRedflag,
  editOneLocation,
  editOneComment,
  deleteAllvaluesRedflag,
  deleteAllvaluesUsers,
};
