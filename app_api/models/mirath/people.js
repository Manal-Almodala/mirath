const alwratha = require("../../controllers/mirath").alwratha;

module.exports = {
    "زوج": (function(){

        type = "أصحاب الفروض"; 
        isSingular = true;
        
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.5;

            if(alwratha.includesAnyOf(children))
            {
                fortuneRatio = 0.25;
            }
                
            return fortuneRatio;
        };

        return publicProperties.call(this);  

    }()), 

    "زوجة": (function(){

        type = "أصحاب الفروض"; 
        isSingular = false;
        
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.25;
            var count = alwratha.data["زوجة"].count;

            if(alwratha.includesAnyOf(children))
            {
                fortuneRatio = 0.125;
            }
                
            return fortuneRatio / count;
        };

        return publicProperties.call(this);  

    }()), 

    "ابن": (function(){

        type = "العصبات"; 
        isSingular = false;
        
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0;
            var count = alwratha.data["ابن"].count;
            
            if(alwratha.isAlone(getMhgobenBy.call(this, "ابن")))
            {
                fortuneRatio = 1;
            }
            else if(alwratha.includes("بنت"))
            {
                var remainderRatio = 2 * count * getFemaleFotuneRatio("بنت", 
                                                                      "ابن");
                fortuneRatio = setRemainderRatio("ابن", 
                                                 fortuneRatio,
                                                 remainderRatio);
            }
            else 
            {
                fortuneRatio = setRemainderRatio("ابن", fortuneRatio, 1);
            }
                
            return fortuneRatio / count;
        };

        getPeopleTheyBlock = function()
        {
            var people = ["ابن ابن", "بنت ابن", "أخ شقيق", "أخ ﻷب",
                            "ابن أخ شقيق", "ابن أخ ﻷب", "أخت شقيقة", 
                            "أخت ﻷب", "إخوة ﻷم", "عم شقيق", "عم ﻷب",
                            "ابن عم شقيق", "ابن عم ﻷب"
                        ];
            return people;
        };

        return publicProperties.call(this);  
            
    }()),

    "ابن ابن": (function(){

        type = "العصبات"; 
        isSingular = false;
        
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0;
            var count = alwratha.data["ابن ابن"].count;

            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "ابن ابن")))
            {
                fortuneRatio = 1;
            }
            else if(alwratha.includes("بنت ابن"))
            {
                var remainderRatio = 2* count * getFemaleFotuneRatio("بنت ابن", 
                                                                     "ابن ابن");
                fortuneRatio = setRemainderRatio("ابن ابن", 
                                                 fortuneRatio, 
                                                 remainderRatio);
            }
            else 
            {
                fortuneRatio = setRemainderRatio("ابن ابن", fortuneRatio, 1);
            }
                
            return fortuneRatio / count;
        };

        getSuperiors = function()
        {
            var superiors = ["ابن"];
            return superiors;
        };

        getPeopleTheyBlock = function()
        {
            var people = ["أخ شقيق", "أخ ﻷب",
                            "ابن أخ شقيق", "ابن أخ ﻷب", "أخت شقيقة", 
                            "أخت ﻷب", "إخوة ﻷم", "عم شقيق", "عم ﻷب",
                            "ابن عم شقيق", "ابن عم ﻷب"
                        ];

            return people;
        };

        return publicProperties.call(this);  
            
    }()),

    "بنت": (function(){

        type = "أصحاب الفروض"; 
        isSingular = false;
        
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.5;
            var count = alwratha.data["بنت"].count;
            
            if(alwratha.isAlone(getMhgobenBy.call(this, "بنت")))
            {
                if(count > 1)
                {
                    fortuneRatio = 0.667;
                }

                fortuneRatio = setRemainderRatio("بنت", fortuneRatio, 1);
            }
            else if(alwratha.includes("ابن"))
            {
                fortuneRatio = 0;
                var remainderRatio = count * getFemaleFotuneRatio("بنت", "ابن");
                fortuneRatio = setRemainderRatio("بنت", fortuneRatio, remainderRatio);
            }
            else 
            {
                if(count > 1){
                    fortuneRatio = 0.667;
                } 
            }
                
            return fortuneRatio / count;
        };

        getPeopleTheyBlock = function()
        {
            var people = [];

            if(alwratha.data["بنت"].count > 1)
            {
                people.push("إخوة ﻷم");
                if(!alwratha.includes("ابن ابن"))
                {
                    people.push("بنت ابن");
                }   
               
            }
            
            return people;
        };

        return publicProperties.call(this);  
   
    }()),
    
    "بنت ابن" : (function(){

        type = "أصحاب الفروض"; 
        isSingular = false;
    
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.5;
            var count = alwratha.data["بنت ابن"].count;

            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "بنت ابن")))
            {
                if(count > 1)
                {
                    fortuneRatio = 0.667;
                }

                fortuneRatio = setRemainderRatio("بنت ابن", fortuneRatio, 1);
            }
            else if(alwratha.includes("ابن ابن"))
            {
                fortuneRatio = 0;
                var remainderRatio = count * getFemaleFotuneRatio("بنت ابن", 
                                                                  "ابن ابن");
                fortuneRatio = setRemainderRatio("بنت ابن",
                                                 fortuneRatio,
                                                 0.333);
            }
            else if(alwratha.includes("بنت"))
            {
                fortuneRatio = 0.167;
            }
            else 
            {
                if(count > 1){
                    fortuneRatio = 0.667;
                } 
            }
            
            return fortuneRatio / count;
        };

        getSuperiors = function()
        {
            var superiors = ["ابن"];
            
            if(!alwratha.includes("ابن ابن") && 
                alwratha.includes("بنت"))
            {
                if(alwratha.data["بنت"].count > 1)
                {
                    superiors.push("بنت");
                }
            }

            return superiors;
        };
       
        getPeopleTheyBlock = function()
        {
            var people = ["إخوة ﻷم"];
            return people;
        };

        return publicProperties.call(this);  

    }()), 
    
    "أب": (function(){

        type = "أصحاب فروض وعصبات"; 
        isSingular = true;
       
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0;
            
            if(alwratha.isAlone(getMhgobenBy.call(this, "أب")))
            {
                fortuneRatio = 1;
            }
            else if(alwratha.hasParentsAndSpouse)
            {
                fortuneRatio = setRemainderRatio("أب", fortuneRatio, 0.667);
            }
            else if(alwratha.includesAnyOf(maleChildren))
            {
                fortuneRatio = 0.167;
            }
            else 
            {
                fortuneRatio = 0.167;
                fortuneRatio = setRemainderRatio("أب", fortuneRatio, 1);
            }
                
            return fortuneRatio;
        };

        getPeopleTheyBlock = function()
        {
            var people = ["جد", "أخ شقيق", "أخت شقيقة", "أخ ﻷب", "أخت ﻷب",
                            "إخوة ﻷم", "ابن أخ شقيق", "ابن أخ ﻷب", "عم شقيق",
                            "عم ﻷب", "ابن عم شقيق", "ابن عم ﻷب"
                        ];
            return people;
        };

        return publicProperties.call(this);  
            
    }()),

    "جد": (function(){

        type = "أصحاب فروض وعصبات"; 
        isSingular = true;
       
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.167;
            
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "جد")))
            {
                fortuneRatio = 1;
            }
            else if(alwratha.includesAnyOf(maleChildren))
            {
                fortuneRatio = 0.167;
            }
            else 
            {
                fortuneRatio = setRemainderRatio("جد", fortuneRatio, 1);
            }
                
            return fortuneRatio;
        };

        getSuperiors = function()
        {
            var people = ["أب"];
            return people;
        };

        getPeopleTheyBlock = function()
        {
            var people = ["إخوة ﻷم", "ابن أخ شقيق", "ابن أخ ﻷب", "عم شقيق",
                            "عم ﻷب", "ابن عم شقيق", "ابن عم ﻷب"
                        ];

            return people;
        };

        return publicProperties.call(this);  
            
    }()),

    "أم": (function(){

        type = "أصحاب الفروض"; 
        isSingular = true;

        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.333;
            
            if(alwratha.isAlone(getMhgobenBy.call(this, "أم")))
            {
                fortuneRatio = setRemainderRatio("أم", fortuneRatio, 1);
            }
            else if(alwratha.hasParentsAndSpouse)
            {
                fortuneRatio = 0;
                fortuneRatio = setRemainderRatio("أم", fortuneRatio, 0.333);
            }
            else if(alwratha.includesAnyOf(children) || 
                        alwratha.hasBrothersOrSisters)
            {
                fortuneRatio = 0.167;
            }
                
            return fortuneRatio;
        };

        getPeopleTheyBlock = function()
        {
            var people = ["أم أم", "أم ﻷب"];
            return people;
        };

        return publicProperties.call(this);  

    }()),

    "أم أم": (function(){

        type = "أصحاب الفروض"; 
        isSingular = true;
        
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.167; 
            
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(["أم أم", "أم ﻷب"]))
            {
                fortuneRatio = setRemainderRatio("أم أم", fortuneRatio, 1);
            }
                
            return fortuneRatio / alwratha.grandMothersCount;
        };

        getSuperiors = function()
        {
            var people = ["أم"];
            return people;
        };

        return publicProperties.call(this);  

    }()),

    "أم ﻷب": (function(){

        type = "أصحاب الفروض"; 
        isSingular = true;
        
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.167; 
            
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(["أم أم", "أم ﻷب"]))
            {
                fortuneRatio = setRemainderRatio("أم ﻷب", fortuneRatio, 1);
            }
                
            return fortuneRatio / alwratha.grandMothersCount;
        };

        getSuperiors = function()
        {
            var people = ["أم", "أب"];
            return people;
        };

        return publicProperties.call(this);  
            
    }()),
    
    "أخ شقيق": (function(){

        type = "العصبات"; 
        isSingular = false;
       
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0;
            var count = alwratha.data["أخ شقيق"].count;
        
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "أخ شقيق")))
            {
                fortuneRatio = 1;
            }
            else if(alwratha.includes("أخت شقيقة"))
            {
                var remainderRatio = 2*count*getFemaleFotuneRatio("أخت شقيقة", 
                                                                  "أخ شقيق");
                fortuneRatio = setRemainderRatio("أخ شقيق", 
                                                 fortuneRatio, 
                                                 remainderRatio);
            }
            else 
            {
                fortuneRatio = setRemainderRatio("أخ شقيق", fortuneRatio, 1);
            }
            
            return fortuneRatio / count;
        };

        getSuperiors = function()
        {
            var superiors = ["ابن", "ابن ابن", "أب", "جد"];
            return superiors;
        };

        getPeopleTheyBlock = function()
        {
            var people = ["أخ ﻷب", "أخت ﻷب", "ابن أخ شقيق", "ابن أخ ﻷب",
                            "عم شقيق", "عم ﻷب", "ابن عم شقيق", "ابن عم ﻷب"];

            return people;
        };

        return publicProperties.call(this);  

    }()),

    "أخ ﻷب": (function(){

        type = "العصبات"; 
        isSingular = false;
        
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0;
            var count = alwratha.data["أخ ﻷب"].count;
        
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "أخ ﻷب")))
            {
                fortuneRatio = 1;
            }
            else if(alwratha.includes("أخت ﻷب"))
            {
                var remainderRatio = 2*count*getFemaleFotuneRatio("أخت ﻷب", 
                                                                  "أخ ﻷب");
                fortuneRatio = setRemainderRatio("أخ ﻷب", 
                                                 fortuneRatio, 
                                                 remainderRatio);
            }
            else 
            {
                fortuneRatio = setRemainderRatio("أخ ﻷب", fortuneRatio, 1);
            }
            
            return fortuneRatio / count;
        };

        getSuperiors = function()
        {
            var superiors = ["ابن", "ابن ابن", "أب", "جد", "أخ شقيق"];

            if(alwratha.includesAnyOf(["بنت", "بنت ابن"]))
            {
                superiors.push("أخت شقيقة");
            }

            return superiors;
        };

        getPeopleTheyBlock = function()
        {
            var people = ["ابن أخ شقيق", "ابن أخ ﻷب", "عم شقيق", "عم ﻷب",
                            "ابن عم شقيق", "ابن عم ﻷب"];

            return people;
        };

        return publicProperties.call(this);  

    }()),

    "أخت شقيقة": (function(){

        type = "أصحاب الفروض"; 
        isSingular = false;
        
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.5;
            var count = alwratha.data["أخت شقيقة"].count;
        
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "أخت شقيقة")))
            {
                if(count > 1)
                {
                    fortuneRatio = 0.667;
                }

                fortuneRatio = setRemainderRatio("أخت شقيقة", fortuneRatio, 1);
            }
            else if(alwratha.includes("أخ شقيق"))
            {
                fortuneRatio = 0;
                var remainderRatio = count*getFemaleFotuneRatio("أخت شقيقة", 
                                                                "أخ شقيق");
                fortuneRatio = setRemainderRatio("أخت شقيقة", 
                                                 fortuneRatio, 
                                                 remainderRatio);
            }
            else 
            {
                if(alwratha.includesAnyOf(["بنت", "بنت ابن"]))
                {
                    fortuneRatio = 0;
                    fortuneRatio = setRemainderRatio("أخت شقيقة", fortuneRatio, 1);
                }
                else if(count > 1){
                    fortuneRatio = 0.667;
                } 
            }
            
            return fortuneRatio / count;
        };

        getSuperiors = function()
        {
            var superiors = ["ابن", "ابن ابن", "أب", "جد"];
            return superiors;
        };

        getPeopleTheyBlock = function()
        {
            var people = [];

            if(alwratha.includesAnyOf(["بنت", "بنت ابن"]))
            {
                people = ["أخ ﻷب", "أخت ﻷب", "ابن أخ شقيق", "ابن أخ ﻷب",
                        "عم شقيق", "عم ﻷب", "ابن عم شقيق", "ابن عم ﻷب"];
            }
            else if(alwratha.data["أخت شقيقة"].count > 1 && 
                        !alwratha.includes("أخ ﻷب"))
            {
                people.push("أخت ﻷب");
            }
        
            return people;
        };

        return publicProperties.call(this); 

    }()),

    "أخت ﻷب": (function(){

        type = "أصحاب الفروض"; 
        isSingular = false;
        
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.5;
            var count = alwratha.data["أخت ﻷب"].count;
        
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "أخت ﻷب")))
            {
                if(count > 1)
                {
                    fortuneRatio = 0.667;
                }

                fortuneRatio = setRemainderRatio("أخت ﻷب", fortuneRatio, 1);
            }
            else if(alwratha.includes("أخت شقيقة"))
            {
                fortuneRatio = 0.167;
            }
            else if(alwratha.includes("أخ ﻷب"))
            {
                fortuneRatio = 0;
                var remainderRatio = count*getFemaleFotuneRatio("أخت ﻷب", 
                                                                "أخ ﻷب");
                fortuneRatio = setRemainderRatio("أخت ﻷب", 
                                                 fortuneRatio,
                                                 remainderRatio);
            }
            else 
            {
                if(alwratha.includesAnyOf(["بنت", "بنت ابن"]))
                {
                    fortuneRatio = 0;
                    fortuneRatio = setRemainderRatio("أخت ﻷب", fortuneRatio, 1);
                }
                else if(count > 1){
                    fortuneRatio = 0.667;
                } 
            }
            
            return fortuneRatio / count;
        };

        getSuperiors = function()
        {
            var superiors = ["ابن", "ابن ابن", "أب", "جد",  "أخ شقيق"];
            if(!alwratha.includes("أخ ﻷب") &&
                    alwratha.includes("أخت شقيقة"))
            {
                if(alwratha.data["أخت شقيقة"].count > 1 ||
                    alwratha.includesAnyOf(["بنت", "بنت ابن"]))
                {
                    superiors.push("أخت شقيقة");
                }
            } 
            return superiors;
        };

        getPeopleTheyBlock = function()
        {
            var people = [];

            if(alwratha.includesAnyOf(["بنت", "بنت ابن"]))
            {
                people = ["ابن أخ شقيق", "ابن أخ ﻷب",
                        "عم شقيق", "عم ﻷب", "ابن عم شقيق", "ابن عم ﻷب"];
            }
        
            return people;
        };

        return publicProperties.call(this);  

    }()),
    
    "إخوة ﻷم": (function(){

        type = "أصحاب الفروض"; 
        isSingular = false;
       
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.167;
            var count = alwratha.data["إخوة ﻷم"].count;
        
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "إخوة ﻷم")))
            {
                if(count > 1)
                {
                    fortuneRatio = 0.333;
                }

                fortuneRatio = setRemainderRatio("إخوة ﻷم", fortuneRatio, 1);
            }
            else 
            {
                if(count > 1){
                    fortuneRatio = 0.333;
                } 
            }
            
            return fortuneRatio / count;
        };

        getSuperiors = function()
        {
            var superiors = ["ابن", "ابن ابن", "بنت", "بنت ابن",
                                "أب", "جد"];
            return superiors;
        };

        return publicProperties.call(this);  

    }()),

    "ابن أخ شقيق": (function(){

        type = "العصبات"; 
        isSingular = false;
       
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0;
            var count = alwratha.data["ابن أخ شقيق"].count;
        
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "ابن أخ شقيق")))
            {
                fortuneRatio = 1;
            }
            else 
            {
                fortuneRatio = setRemainderRatio("ابن أخ شقيق", fortuneRatio, 1);
            }
            
            return fortuneRatio / count;
        };

        getSuperiors = function()
        {
            var superiors = ["ابن", "ابن ابن", "أب", "جد", 
                                "أخ شقيق", "أخ ﻷب"];
            
            if(alwratha.includesAnyOf(["بنت ابن", "بنت"]))
            {
                superiors.push("أخت شقيقة");
                superiors.push("أخت ﻷب");
            }

            return superiors;
        };

        getPeopleTheyBlock = function()
        {
            var people = ["ابن أخ ﻷب", "عم شقيق", "عم ﻷب", 
                            "ابن عم شقيق", "ابن عم ﻷب"];

            return people;
        };

        return publicProperties.call(this); 

    }()),

    "ابن أخ ﻷب": (function(){

        type = "العصبات"; 
        isSingular = false;
        
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0;
            var count = alwratha.data["ابن أخ ﻷب"].count;
        
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "ابن أخ ﻷب")))
            {
                fortuneRatio = 1;
            }
            else 
            {
                fortuneRatio = setRemainderRatio("ابن أخ ﻷب", fortuneRatio, 1);
            }
            
            return fortuneRatio / count;
        };

        getSuperiors = function()
        {
            var superiors = ["ابن", "ابن ابن", "أب", "جد", 
                                "أخ شقيق", "أخ ﻷب", "ابن أخ شقيق"];
            
            if(alwratha.includesAnyOf(["بنت ابن", "بنت"]))
            {
                superiors.push("أخت شقيقة");
                superiors.push("أخت ﻷب");
            }

            return superiors;
        };

        getPeopleTheyBlock = function()
        {
            var people = [ "عم شقيق", "عم ﻷب", "ابن عم شقيق",
                             "ابن عم ﻷب"];

            return people;
        };

        return publicProperties.call(this); 

    }()),

    "عم شقيق": (function(){

        type = "العصبات"; 
        isSingular = false;
        
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0;
            var count = alwratha.data["عم شقيق"].count;
        
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "عم شقيق")))
            {
                fortuneRatio = 1;
            }
            else 
            {
                fortuneRatio = setRemainderRatio("عم شقيق", fortuneRatio, 1);
            }
            
            return fortuneRatio / count;
        };

        getSuperiors = function()
        {
            var superiors = ["ابن", "ابن ابن", "أب", "جد", "أخ شقيق", 
                                "أخ ﻷب", "ابن أخ شقيق", "ابن أخ ﻷب"];
            
            if(alwratha.includesAnyOf(["بنت ابن", "بنت"]))
            {
                superiors.push("أخت شقيقة");
                superiors.push("أخت ﻷب");
            }

            return superiors;
        };

        getPeopleTheyBlock = function()
        {
            var people = ["عم ﻷب", "ابن عم شقيق", "ابن عم ﻷب"];
            return people;
        };

        return publicProperties.call(this); 

    }()),

    "عم ﻷب": (function(){

        type = "العصبات"; 
        isSingular = false;

        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0;
            var count = alwratha.data["عم ﻷب"].count;
        
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "عم ﻷب")))
            {
                fortuneRatio = 1;
            }
            else 
            {
                fortuneRatio = setRemainderRatio("عم ﻷب", fortuneRatio, 1);
            }
            
            return fortuneRatio / count;
        };

        getSuperiors = function()
        {
            var superiors = ["ابن", "ابن ابن", "أب", "جد", "أخ شقيق", 
                                "أخ ﻷب", "ابن أخ شقيق", "ابن أخ ﻷب",
                                "عم شقيق"
                            ];
            
            if(alwratha.includesAnyOf(["بنت ابن", "بنت"]))
            {
                superiors.push("أخت شقيقة");
                superiors.push("أخت ﻷب");
            }

            return superiors;
        };

        getPeopleTheyBlock = function()
        {
            var people = ["ابن عم شقيق", "ابن عم ﻷب"];
            return people;
        };

        return publicProperties.call(this);  

    }()),

    "ابن عم شقيق": (function(){

        type = "العصبات"; 
        isSingular = false;

        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0;
            var count = alwratha.data["ابن عم شقيق"].count;
        
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "ابن عم شقيق")))
            {
                fortuneRatio = 1;
            }
            else 
            {
                fortuneRatio = setRemainderRatio("ابن عم شقيق", fortuneRatio, 1);
            }
            
            return fortuneRatio / count;
        };

        getSuperiors = function()
        {
            var superiors = ["ابن", "ابن ابن", "أب", "جد", "أخ شقيق", 
                                "أخ ﻷب", "ابن أخ شقيق", "ابن أخ ﻷب",
                                "عم شقيق", "عم ﻷب"
                            ];
            
            if(alwratha.includesAnyOf(["بنت ابن", "بنت"]))
            {
                superiors.push("أخت شقيقة");
                superiors.push("أخت ﻷب");
            }

            return superiors;
        };

        getPeopleTheyBlock = function()
        {
            var people = ["ابن عم ﻷب"];
            return people;
        };

        return publicProperties.call(this);  

    }()),

    "ابن عم ﻷب": (function(){

        type = "العصبات"; 
        isSingular = false;

        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0;
            var count = alwratha.data["ابن عم ﻷب"].count;
        
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "ابن عم ﻷب")))
            {
                fortuneRatio = 1;
            }
            else 
            {
                fortuneRatio = setRemainderRatio("ابن عم ﻷب", fortuneRatio, 1);
            }
            
            return fortuneRatio / count;
        };

        getSuperiors = function()
        {
            var superiors = ["ابن", "ابن ابن", "أب", "جد", "أخ شقيق", 
                                "أخ ﻷب", "ابن أخ شقيق", "ابن أخ ﻷب",
                                "عم شقيق", "عم ﻷب", "ابن عم شقيق"
                            ];
            
            if(alwratha.includesAnyOf(["بنت ابن", "بنت"]))
            {
                superiors.push("أخت شقيقة");
                superiors.push("أخت ﻷب");
            }

            return superiors;
        };

        return publicProperties.call(this);  

    }()),
};

var children = ["ابن", "ابن ابن", "بنت ابن", "بنت"];
var maleChildren = ["ابن", "ابن ابن"];
var fathers = ["أب", "جد"];
var siblings = ["أخت شقيقة", "أخ شقيق"];

function setRemainderRatio(person, ratio, value)
{
    if(alwratha.data[person].fortune.hasRemainder)
    {
        ratio = value; 
    }
    alwratha.data[person].fortune.hasRemainder = true;

    return ratio;
}

function getMhgobenBy(warith)
{
    var warithAndMhgoben = this.getPeopleTheyBlock();
    warithAndMhgoben[warithAndMhgoben.length] = warith;
    return warithAndMhgoben;
}

function isBlocked(){
    return alwratha.includesAnyOf(this.getSuperiors());
}

function getFemaleFotuneRatio(femaleSibling, maleSibling)
{
    var femalesCount = alwratha.data[femaleSibling].count;
    var malesCount = alwratha.data[maleSibling].count;

    return 1 / (femalesCount + 2 * malesCount);
}

function publicProperties()
{
    return{
        /**
         * Applies the person's respective mirath rules to
         * calculate and then return their fortune ratio 
         * @returns {Number} 
         */
        calculateFotuneRatio: this.calculateFotuneRatio,

        /**
         * Returns list of wratha who are 
         * eliminated by the current warith
         * @returns {Array<String>}
         */
        getPeopleTheyBlock: this.getPeopleTheyBlock,

        /**
         * Returns list of people who can
         * eliminate the current warith
         * @returns {Array<String>}
         */
        getSuperiors: this.getSuperiors,

        /**
         * @type {String} 
         */    
        type: this.type,
        
        /**
         * @type {Boolean} 
         */
        isSingular: this.isSingular,
    };       
}