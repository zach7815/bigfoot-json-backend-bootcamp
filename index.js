import express from 'express';
import cors from 'cors';
import path from 'path';
import DefaultRouter from './routers/sightings.js';
import pg from 'pg';
import dotenv from 'dotenv';


const {Pool}= pg;
const PORT = process.env.PORT || 3000;
const app = express();
const envFilePath = '.env';
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const pgConnectionConfigs = {
  user:'Zach',
  host:'localhost',
  database:'Zach',
  port:5432,
}
const pool= new Pool(pgConnectionConfigs);

pool.connect()

const whenQueryDone= (error, result)=>{
  if(error){
    console.log('error:',error);
  }

  else{
    console.log(result.row);
  }
  pool.end()
}

const inputData = ['Eric', 'Marsh', 874480753, true];

// in this example, $1 is going to be replaced with 'Eric'
const sqlQuery = 'INSERT INTO students (first_name, last_name, mobile, gender) VALUES ($1, $2, $3, $4)';

pool.query(sqlQuery, inputData, whenQueryDone);



dotenv.config({ path: path.normalize(envFilePath) });
app.use(cors());

app.use('/', DefaultRouter);



app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});