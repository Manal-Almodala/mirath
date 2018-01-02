const helperModule = require('./shared-functions');
const Alwratha = require("../models/alwratha");

var alwratha = new Alwratha();

module.exports = {
    readAlwrathaList: function(req, res){
        var alwrathaList = alwratha.getList();
        helperModule.sendJsonResponse(res, 200, alwrathaList);
    },
    addAlwrathaData: function(req, res){
        alwratha.data = req.body;
        helperModule.sendJsonResponse(res, 201, alwratha.data);
    },
    calculateMirath: function(req, res){

    },
};