module.exports = {
    /**
     * Sends HTTP response with JSON formatted body contents.
     * @param {Object} res
     * @param {Number} status
     * @param {Object} content
     */
    sendJsonResponse: function(res, status, content){
        res.status(status);
        res.json(content);
    },

    /**
     * Checks if querry did not find any matching document, 
     * then responds with status 404 and error message 
     * @param {Object} res
     * @param {Object} document DB instance of the queried
     * document 
     * @param {String} resMsg A user friendly message to 
     * describe the incurred error 
     */
    isNoDocumentFound: function (res, document, resMsg)
    {
        if(!document){
            this.sendJsonResponse(res, 404, {
                message: resMsg
            }); 
            return true;
        }
        return false;
    },

    /**
     * Checks if the request returned error, then
     * responds with error object and appropriate status.
     * @param {Object} error
     * @param {Object} res
     * @param {Number} status
     */
    isResError: function(error, res, status)
    {
        if(error){
            this.sendJsonResponse(res, status, error);
            return true;
        }
        return false;
    },

    /**
     * Checks if the requests includes document/subdocument ID
     * @param {Object} req
     * @param {Object} res
     * @param {String} ID The name of request parameter that 
     * holds the ID object
     * @param {String} resMsg 
     */
    isIDInRequest: function(req, res, ID, resMsg)
    {
        if(!(req.params && req.params[ID])){
            this.sendJsonResponse(res, 404, {
                message: resMsg
            });
            return true;
        }
        return false;
    }
}




