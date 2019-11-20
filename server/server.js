import express from 'express';
import router from './routes/auth.route';
import bodyParser from 'body-parser';


const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.listen(PORT, () => console.log(`listening on ${PORT}...`));




