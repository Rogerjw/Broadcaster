import express from 'express';
import userRouter from './routes/auth.route';
import redflagRouter from './routes/redflags.route';
import bodyParser from 'body-parser';


const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(userRouter);
app.use(redflagRouter);
app.listen(PORT, () => console.log(`listening on ${PORT}...`));




