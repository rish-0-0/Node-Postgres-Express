import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import Postgres from './models';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended : true }));
app.use(morgan('dev'));

app.use('/api', routes);

Postgres.sequelize.authenticate()
.then(() => {
    console.log("Successfully connected to Postgres");
})
.catch(err => {
    console.log("Unable to connect to the database", err);
});

app.listen(PORT, () => console.log(`Parkpoolr API started on ::${PORT}`));