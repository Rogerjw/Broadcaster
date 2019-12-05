import { Pool } from 'pg';
import { config } from 'dotenv';

config();
// eslint-disable-next-line import/no-mutable-exports
let pool;

if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL_TEST,
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}
export default pool;
