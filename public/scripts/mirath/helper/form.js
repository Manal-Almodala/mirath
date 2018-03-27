const formValidation =  require("./validation.js");

class Form
{
    constructor(ID){
        this.id = ID;
        this.data = [];
        this.invalidData = [];
        this.emptyFormMsg = "";
        this.invalidDataMsg = "";
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
        if(formValidation.isNumericValues.call(this) && 
            formValidation.isValuesGreaterThanZero.call(this))
        {
            this.isDataValid = true;
                
        }
        else
        {
            this.isDataValid = false;
            this.errorMsg = this.invalidDataMsg;
        }
        return this._isDataValid;
    }

    set isDataValid(value)
    {
        this._isDataValid = value;
    }

    get isEmpty()
    {
        if(this.data.length == 0)
        {
            this.errorMsg = this.emptyFormMsg;
            return true;
        }
        else 
        {
            return false;
        }
    }
}
module.exports = Form;