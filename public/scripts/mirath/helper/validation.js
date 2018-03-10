module.exports = {
    onSubmit: function(form)
    {
        const selector = "#" + form.Id;
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