import express from 'express';
import cors from 'cors';
import path from 'path';
import DefaultRouter from './routers/sightings.js';
import pg from 'pg';
import dotenv from 'dotenv';


const {Client}= pg;
const PORT = process.env.PORT || 3000;
const app = express();
const envFilePath = '.env';


const pgConnectionConfigs = {
  user:'Zach',
  host:'localhost',
  database:'Zach',
  port:5432,
}
const client= new Client(pgConnectionConfigs);

client.connect();

const whenQueryDone= (error, result)=>{
  if(error){
    console.log('error:',error);
  }

  else{
    console.log(result.rows);
  }
  client.end()
}

const sqlQuery= 'SELECT * FROM students';

client.query(sqlQuery, whenQueryDone);



dotenv.config({ path: path.normalize(envFilePath) });
app.use(cors());

app.use('/', DefaultRouter);



app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});