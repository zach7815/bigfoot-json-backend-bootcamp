import fs from 'fs';

const searchRecordByReportNumber = (reportNumber, callback) => {
  fs.readFile("./sightings.json", 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }

    const records = JSON.parse(data);
    const foundRecord = records.find(record => record.REPORT_NUMBER === reportNumber);

    if (foundRecord) {
      callback(null, foundRecord);
    } else {
      callback('Record not found', null);
    }
  });
};

export default searchRecordByReportNumber;