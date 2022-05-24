import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';

connectDB();

import reaperRoutes from './router/reaper.js';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
app.use('/reaper', reaperRoutes);

app.use(cors());

app.use(express.json());

const PORT = 5000;
app.listen(PORT, console.log(`Server is running on ${PORT}`));
