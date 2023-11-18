import express from 'express';
import cors from 'cors';
import path from 'path';
import DefaultRouter from './routers/sightings.mjs';
import pg from 'pg';
import dotenv from 'dotenv';

//! to do: make dotenv file for config details
//!add config to pool
const { Pool } = pg;
const PORT = process.env.PORT || 3000;
const app = express();
const envFilePath = '.env';
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const pool = new Pool();

pool.connect();

const whenQueryDone = (error, result) => {
  if (error) {
    console.log('error:', error);
  } else {
    console.log(result.row);
  }
  pool.end();
};

//! Change input data to dynamically take user input from front end
const inputData = ['Eric', 'Marsh', 874480753, true];

// in this example, $1 is going to be replaced with 'Eric'

pool.query(inputData, inputData, whenQueryDone);

dotenv.config({ path: path.normalize(envFilePath) });
app.use(cors());

app.use('/', DefaultRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
