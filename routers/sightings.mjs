import express from 'express';
import getSightings from '../utils.mjs';
import searchRecordByReportNumber from '../findCase.mjs';

const DefaultRouter = express.Router();

DefaultRouter.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

DefaultRouter.get("/sightings/:REPORT_NUMBER", (req, res) => {
  const { REPORT_NUMBER } = req.params;

  searchRecordByReportNumber(REPORT_NUMBER, (err, record) => {
    if (err) {
      console.error('Error:', err);
      res.send({ success: false, message: 'Error occurred', error: err });
      return;
    }

    if (record) {
      console.log('Found record:', record);
      res.status(200).json({ success: true, data: record });
    } else {
      console.log('Record not found');
      res.send({ success: false, message: 'Record not found' });
    }
  });
});

export default DefaultRouter

