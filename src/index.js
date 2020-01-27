import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended : true }));
app.use(morgan('dev'));

app.use('/api', routes);

app.listen(PORT, () => console.log(`Parkpoolr API started on ::${PORT}`));