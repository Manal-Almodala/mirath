const formValidation =  require("./validation.js");
class Form
{
    constructor(id){
        this.Id = id;
        this.data = [];
        this.invalidData = [];
    }

    get data()
    {
        return this._data;
    }

    set data(value)
    {
        this._data = value;
    }

    get invalidData()
    {
        return this._invalidData;
    }

    set invalidData(value)
    {
        this._invalidData = value;
    }
    
    addInvalidData(invalidElement)
    {
        this._invalidData.push(invalidElement);
    }

    get isDataValid()
    {
        this.isDataValid = (formValidation.isNumericValues.call(this) && 
                            formValidation.isValuesGreaterThanZero.call(this));
        return this._isDataValid;
    }

    set isDataValid(value)
    {
        this._isDataValid = value;
    }

    isEmpty()
    {
        if(formValidation.isEmpty.call(this))
        {
            // Display empty message 
            return true;
        }
        else 
        {
            return false;
        }
    }
}
module.exports = Form;