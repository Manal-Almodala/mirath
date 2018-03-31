const formValidation =  require("./validation.js");

class Form
{
    constructor(ID){
        this.id = ID;
        this.restoreData();
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

    saveData()
    {
        sessionStorage.setItem(this.id, JSON.stringify(this.data));
    }

    restoreData()
    {
        this.data = JSON.parse(sessionStorage.getItem(this.id));
        if(this.data == null)
            this.data = [];
    }

    restoreState()
    {
        if(this.data.length > 0)
        {
            for(var record of this.data)
            {
                //console.log(inputField);
                var formInputField = $("input[name=record.name]");
                formInputField.val(record.value);
                activateCheckbox(formInputField); 
            } 
        }  
    }
}
module.exports = Form;

function activateCheckbox(formInputField)
{  
    formInputField.prevAll(".addon-checkbox-right")
        .children("input[type='checkbox']").click();
}