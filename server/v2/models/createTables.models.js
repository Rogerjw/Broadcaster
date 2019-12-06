import pool from '../db/config.db';
import queries from '../db/queries.db';

const newTables = async () => {
  try {
    await pool.query(queries.createUserTable);
    await pool.query(queries.createRedflagTable);
    console.log('Two tables created successfully(Users and Redflag) ');
  } catch (error) {
    console.log(error);
  }
};

export default newTables();
