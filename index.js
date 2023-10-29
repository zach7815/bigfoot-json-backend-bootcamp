import  express from 'express';
import getSightings from './utils.js'
import cors from 'cors'
import path from 'path'

import dotenv from 'dotenv'

const PORT = process.env.PORT||3000;
const app = express();
const envFilePath = '.env';
dotenv.config({ path: path.normalize(envFilePath) });
app.use(cors())

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
