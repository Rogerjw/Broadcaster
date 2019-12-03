import pool from '../db/config.db';
import queries from '../db/queries.db';

const newTables = async()=>{
    try{
    await pool.query(queries.deleteAllTables);
    console.log("Two tables deleted successfully(User and Redflag) ");
    }catch(error) {
        console.log(error)
    }
};

export default newTables();