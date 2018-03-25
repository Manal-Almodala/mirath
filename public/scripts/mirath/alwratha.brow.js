(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
const formValidation =  require("./helper/validation.js");
const Form = require("./helper/form.js");

var alwratha = new Form("alwrathaData");
var altarika = new Form("altarikaData");

formValidation.onSubmit(alwratha);
formValidation.onSubmit(altarika);

$(function () {
        $('[data-toggle="tooltip"]').tooltip();
    }
);

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

$("input[placeholder=0]").on("focus", function() {
        $(this).attr("placeholder", " ");
    }
);

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
},{"./helper/form.js":2,"./helper/validation.js":3}],2:[function(require,module,exports){
const formValidation =  require("./validation.js");

class Form
{
    constructor(ID){
        this.id = ID;
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
        if(formValidation.isNumericValues.call(this) && 
            formValidation.isValuesGreaterThanZero.call(this))
        {
            this.isDataValid = true;
                
        }
        else
        {
            this.isDataValid = false;

            this.errorMsg = "تأكد من إدخال تفاصيل التركة باﻷرقام!";
            if(this.id == "alwrathaData")
                this.errorMsg = "تأكد من إدخال عدد كل من الورثة باﻷرقام!";
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
            this.errorMsg = "الرجاء إدخال تفاصيل التركة!";
            if(this.id == "alwrathaData")
                this.errorMsg = "الرجاء إدخال معلومات الورثة!";

            return true;
        }
        else 
        {
            return false;
        }
    }
}
module.exports = Form;
},{"./validation.js":3}],3:[function(require,module,exports){
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
},{}]},{},[1]);
