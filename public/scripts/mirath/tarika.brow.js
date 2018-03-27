(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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

var tarika = new Form("tarikaForm");
// Error message to be displayed when an empty tarika form is submitted  
tarika.emptyFormMsg = "الرجاء إدخال تفاصيل التركة!";
// Error message to be displayed when user submits invalid tarika data   
tarika.invalidDataMsg = "تأكد من إدخال تفاصيل التركة باﻷرقام!";

formValidation.onSubmit(tarika);






/*
$("#submitTarika").on("click", function(){
    var tarikaHtml = $("#tarikaForm").html();
    localStorage.setItem("tarika", tarikaHtml);
});

$(document).ready(function(){
    var tarikaHtml = localStorage.getItem("tarika");
    if(tarikaHtml != null)
    {
        $("#tarikaForm").html(tarikaHtml);
    }
}); 
*/
},{"./helper/form.js":1,"./helper/utils.js":2,"./helper/validation.js":3}]},{},[4]);
