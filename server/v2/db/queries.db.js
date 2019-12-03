
  const createUserTable = `CREATE TABLE IF NOT EXISTS
  users(
    id VARCHAR(128) PRIMARY KEY,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    phonenumber VARCHAR(128) NOT NULL,
    username VARCHAR(128) NOT NULL,
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
    const findUser = `select * from users where email= $1`;
    const addUser = `
    INSERT INTO
        users (id, firstname, lastname, email, password, phonenumber, username, type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`;
export default {
    createUserTable,
    createRedflagTable,
    deleteAllTables,
    findUser,
    addUser
}