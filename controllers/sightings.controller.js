import getSightings from '../utils.js';
import searchRecordByReportNumber from '../findCase.js';



class SightingController {

    constructor(){

    }

    getAllSightings= async function(req,res){
        const sightings= await getSightings()
        res.json(sightings)
    }



    getSightingByReportID = function (reportNumber, callback){
        const sighting =searchRecordByReportNumber(reportNumber, callback)
        return sighting;
    }


}

export default SightingController;