class Alwratha{
    constructor(data){
        this.data = data;
    }

    get data()
    {
        return this._data;
    }

    set data(value)
    {
        this._data = value;
    }

    get dataIsValid()
    {
        this.dataIsValid = (this.isNumericValues() && this.isValuesGreaterThanZero());
        return this._dataIsValid;
    }

    set dataIsValid(value)
    {
        this._dataIsValid = value;
    }

    isNumericValues()
    {
        var isValid = true;
        this.data.forEach(warith => {
            if(isNaN(warith.value))
            {
                isValid = false;
            }  
        }); 
        return isValid;
    }

    isValuesGreaterThanZero()
    {
        var isValid = true;
        this.data.forEach(warith => {
            if(warith.value <= 0)
            {
                isValid = false;
            }  
        }); 
        return isValid;
    }
}

$("#alwrathaData").submit(function(event) {
    var  alwratha = new Alwratha($("#alwrathaData").serializeArray());
    if(!alwratha.dataIsValid)
    {
        event.preventDefault();
    }
});

$("input[type='checkbox']").change(function() {
    if(this.checked)
    {
        $(this).closest("span").siblings().last().attr("disabled", false);
    }  
    else
    {
        $(this).closest("span").siblings().last().val(0);
        $(this).closest("span").siblings().last().attr("disabled", true);  
    }
});





