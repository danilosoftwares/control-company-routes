const clientModel = require('../models/ClientsModel');
const geolocationTool = require('../tools/GeolocationTool');
const listTool = require('../tools/ListTool');

const getAllBetterRoutes = async () => {
    const allClients = await clientModel.getAllClients();
    let start = { positionx:0, positiony:0};
    let result = [];
    if (allClients.length>0){
        result.push({distance:999999999999});
    }        
    let tempClients = {...allClients};
    while(Object.keys(tempClients).length > 0){
        for (const key in tempClients) {
            const { positionx, positiony } = tempClients[key];
            const distance = geolocationTool.calculateDistance(start.positionx,start.positiony, positionx, positiony);
            if (result[result.length-1].distance > distance){
                result[result.length-1] = {...tempClients[key], distance};
            }
        }  
        tempClients = listTool.findDifference(allClients,result);
        start = { positionx: result[result.length-1].positionx, positiony:result[result.length-1].positiony};   
        if (Object.keys(tempClients).length > 0)
            result.push({distance:999999999999});        
    }
    return result;
};

module.exports = {
    getAllBetterRoutes,
};
