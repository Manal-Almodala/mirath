module.exports = {
    /**
     * Checks if the object has own property from the given 
     * properties array 
     * @param {Object} jsonObject
     * @param {Array<String>} properties array of all properties to 
     * be checked  
     */
    isObjectHasSecond: function(jsonObject, properties)
    {
        var isTargetIncluded = false;
        for(var property of properties)
        {
            if(jsonObject.hasOwnProperty(property))
            {
                isTargetIncluded = true;
                break;
            }
        }

        return isTargetIncluded;
    },
}
