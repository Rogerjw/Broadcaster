import express from 'express';
import userRouter from './routes/authentication.route';
import redflagRouter from './routes/redflags.route';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(userRouter);
app.use(redflagRouter);
app.listen(PORT, () => console.log(`listening on ${PORT}...`));
export default app;




