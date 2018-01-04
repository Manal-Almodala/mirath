class Alwratha
{
    constructor(data){
        this.data = data;
        this._invalidData = new Array(this.data.length);
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
    
    addInvalidData(invalidElement)
    {
        this._invalidData.push(invalidElement);
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
            if(isNaN(warith.value) || warith.value == "")
            {
                isValid = false;
                this.addInvalidData(warith.name);
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
                this.addInvalidData(warith.name);

            }  
        }); 
        return isValid;
    }

    isEmpty()
    {
        let isDataEmpty = false;
        if(jQuery.isEmptyObject(this.data));
        {
            isDataEmpty = true;
            alert("الرجاء إدخال معلومات الورثه ومن ثم إضغط علي ذر الحساب");
        }
        return isDataEmpty;
    }
}

$("#alwrathaData").submit(function(event) {
    $("input").removeClass("invalid");
    var alwratha = new Alwratha($("#alwrathaData").serializeArray());
    
    if(alwratha.isEmpty() || !alwratha.dataIsValid)
    {
        alwratha.invalidData.forEach(warithName => {
            var inputSelector = "input[name='" + warithName +"']"; 
            $(inputSelector).addClass("invalid"); 
        }); 
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





