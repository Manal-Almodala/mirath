requirejs(["./helper/form"], function(validateForm) {
});

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
        this.isDataValid = (validateForm.isNumericValues.call(this) && 
                            validateForm.isValuesGreaterThanZero.call(this));
        return this._isDataValid;
    }

    set isDataValid(value)
    {
        this._isDataValid = value;
    }

    isEmpty()
    {
        if(validateForm.isEmpty.call(this))
        {
            alert("الرجاء إدخال معلومات الورثه ومن ثم إضغط علي ذر الحساب");
            return true;
        }
        else 
        {
            return false;
        }
    }
}

var alwratha = new Form("alwrathaData");
var altarika = new Form("altarikaData");

validateForm.onSubmit(alwratha);
validateForm.onSubmit(altarika);

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

$("input[aria-label='زوج']").change(function() {
    if(this.checked)
    {
        $("input[name='زوجه']").val(0);
        $("input[aria-label='زوجه']").prop("checked", false);
        $("input[name='زوجه']").attr("disabled", true);
    }  
});

$("input[aria-label='زوجه']").change(function() {
    if(this.checked)
    {
        $("input[aria-label='زوج']").prop("checked", false);
    }  
});





