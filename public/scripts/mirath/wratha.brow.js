(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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
                var formInputField = $("input[name=" + "'" + record.name + "'" + "]");
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
},{"./validation.js":3}],2:[function(require,module,exports){
var crossPageUtilities = {
    enableTooltips: function(){
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });
    },

    clearPlaceholder: function(selector, event){
        $(selector).on(event, function() {
            $(this).attr("placeholder", " ");
        });
    }, 
    
    toggleInputOnCheckboxChange: function(){
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
    }
};
module.exports = crossPageUtilities;
},{}],3:[function(require,module,exports){
module.exports = {
    onSubmit: function(form)
    {
        const selector = "#" + form.id;
        $(selector).submit(function(event) {
            $("input").removeClass("invalid");
            form.invalidData = [];
            
            form.data =  $(selector).serializeArray();
            
            if(form.isEmpty || !form.isDataValid)
            {
                form.invalidData.forEach(inputName => {
                    var inputSelector = "input[name='" + inputName +"']"; 
                    $(inputSelector).addClass("invalid"); 
                }); 
                event.preventDefault();
                showErrorMsg(form);
            }

            form.saveData();
        });

    },

    isNumericValues: function(data)
    {
        var isValid = true;
        this.data.forEach(field => {
            if(isNaN(field.value) || field.value == "")
            {
                isValid = false;
                this.addInvalidData(field.name);
            }  
        }); 
        return isValid;
    },

    isValuesGreaterThanZero: function()
    {
        var isValid = true;
        this.data.forEach(field => {
            if(field.value <= 0)
            {
                isValid = false;
                this.addInvalidData(field.name);

            }  
        }); 
        return isValid;
    }
};

function showErrorMsg(form){
    $(".modal-body span").text(form.errorMsg);
    $("#errorModal").modal("show");
}
},{}],4:[function(require,module,exports){
const formValidation =  require("./helper/validation.js");
const Form = require("./helper/form.js");
const utils  = require("./helper/utils.js");

utils.enableTooltips();
utils.clearPlaceholder("input[placeholder=0]", "focus");
utils.toggleInputOnCheckboxChange();

var wratha = new Form("wrathaForm");
// Error message to be displayed when an empty wratha form is submitted  
wratha.emptyFormMsg = "الرجاء إدخال معلومات الورثة!";
// Error message to be displayed when user submits invalid wratha counts   
wratha.invalidDataMsg = "تأكد من إدخال عدد كل من الورثة باﻷرقام!";
// When the user returns to page by clicking back button 
// This restores the data that had been entered by user 
wratha.restoreState();

formValidation.onSubmit(wratha);

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
},{"./helper/form.js":1,"./helper/utils.js":2,"./helper/validation.js":3}]},{},[4]);
