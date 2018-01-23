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

    "زوجه": (function(){

        type = "أصحاب الفروض"; 
        isSingular = false;
        
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.25;
            var count = alwratha.data["زوجه"].count;

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
            else if(alwratha.includesAnyOf("بنت"))
            {
                fortuneRatio = setRemainderRatio("ابن", fortuneRatio, 0.667);
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
                            "ابن أخ شقيق", "ابن أخ ﻷب", "أخت شقيقه", 
                            "أخت ﻷب", "إخوه ﻷم", "عم شقيق", "عم ﻷب",
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
            else if(alwratha.includesAnyOf("بنت ابن"))
            {
                fortuneRatio = setRemainderRatio("ابن ابن", fortuneRatio, 0.667);
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
                            "ابن أخ شقيق", "ابن أخ ﻷب", "أخت شقيقه", 
                            "أخت ﻷب", "إخوه ﻷم", "عم شقيق", "عم ﻷب",
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
            else if(alwratha.includesAnyOf("ابن"))
            {
                fortuneRatio = 0;
                fortuneRatio = setRemainderRatio("بنت", fortuneRatio, 0.333);
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
                people.push("إخوه ﻷم");
                if(!alwratha.includesAnyOf(["ابن ابن"]))
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
            else if(alwratha.includesAnyOf("ابن ابن"))
            {
                fortuneRatio = 0;
                fortuneRatio = setRemainderRatio("بنت ابن", fortuneRatio, 0.333);
            }
            else if(alwratha.includesAnyOf("بنت"))
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
            
            if(!alwratha.includesAnyOf(["ابن ابن"]) && 
                alwratha.includesAnyOf(["بنت"]))
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
            var people = ["إخوه ﻷم"];
            return people;
        };

        return publicProperties.call(this);  

    }()), 
    
    "أب": (function(){

        type = "أصحاب فروض وعصبات"; 
        isSingular = true;
       
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.167;
            
            if(alwratha.isAlone(getMhgobenBy.call(this, "أب")))
            {
                fortuneRatio = 1;
            }
            else if(alwratha.hasParentsAndSpouse)
            {
                fortuneRatio = 0;
                fortuneRatio = setRemainderRatio("أب", fortuneRatio, 0.667);
            }
            else if(alwratha.includesAnyOf(maleChildren))
            {
                fortuneRatio = 0.167;
            }
            else 
            {
                fortuneRatio = setRemainderRatio("أب", fortuneRatio, 1);
            }
                
            return fortuneRatio;
        };

        getPeopleTheyBlock = function()
        {
            var people = ["جد", "أخ شقيق", "أخت شقيقه", "أخ ﻷب", "أخت ﻷب",
                            "إخوه ﻷم", "ابن أخ شقيق", "ابن أخ ﻷب", "عم شقيق",
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
            var people = ["إخوه ﻷم", "ابن أخ شقيق", "ابن أخ ﻷب", "عم شقيق",
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
            else if(alwratha.includesAnyOf("أخت شقيقه"))
            {
                fortuneRatio = setRemainderRatio("أخ شقيق", fortuneRatio, 0.667);
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
            else if(alwratha.includesAnyOf("أخت ﻷب"))
            {
                fortuneRatio = setRemainderRatio("أخ ﻷب", fortuneRatio, 0.667);
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
                superiors.push("أخت شقيقه");
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

    "أخت شقيقه": (function(){

        type = "أصحاب الفروض"; 
        isSingular = false;
        
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.5;
            var count = alwratha.data["أخت شقيقه"].count;
        
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "أخت شقيقه")))
            {
                if(count > 1)
                {
                    fortuneRatio = 0.667;
                }

                fortuneRatio = setRemainderRatio("أخت شقيقه", fortuneRatio, 1);
            }
            else if(alwratha.includesAnyOf("أخ شقيق"))
            {
                fortuneRatio = 0;
                fortuneRatio = setRemainderRatio("أخت شقيقه", fortuneRatio, 0.333);
            }
            else 
            {
                if(alwratha.includesAnyOf(["بنت", "بنت ابن"]))
                {
                    fortuneRatio = 0;
                    fortuneRatio = setRemainderRatio("أخت شقيقه", fortuneRatio, 1);
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
            else if(alwratha.data["أخت شقيقه"].count > 1 && 
                        !alwratha.includesAnyOf(["أخ ﻷب"]))
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
            else if(alwratha.includesAnyOf("أخت شقيقه"))
            {
                fortuneRatio = 0.167;
            }
            else if(alwratha.includesAnyOf("أخ ﻷب"))
            {
                fortuneRatio = 0;
                fortuneRatio = setRemainderRatio("أخت ﻷب", fortuneRatio, 0.333);
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
            if(!alwratha.includesAnyOf("أخ ﻷب") &&
                    alwratha.includesAnyOf("أخت شقيقه"))
            {
                if(alwratha.data["أخت شقيقه"].count > 1 ||
                    alwratha.includesAnyOf(["بنت", "بنت ابن"]))
                {
                    superiors.push("أخت شقيقه");
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
    
    "إخوه ﻷم": (function(){

        type = "أصحاب الفروض"; 
        isSingular = false;
       
        calculateFotuneRatio = function()
        {
            var fortuneRatio = 0.167;
            var count = alwratha.data["إخوه ﻷم"].count;
        
            if(isBlocked.call(this))
            {
                fortuneRatio = 0;
            }
            else if(alwratha.isAlone(getMhgobenBy.call(this, "إخوه ﻷم")))
            {
                if(count > 1)
                {
                    fortuneRatio = 0.333;
                }

                fortuneRatio = setRemainderRatio("إخوه ﻷم", fortuneRatio, 1);
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
                superiors.push("أخت شقيقه");
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
                superiors.push("أخت شقيقه");
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
                superiors.push("أخت شقيقه");
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
                superiors.push("أخت شقيقه");
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
                superiors.push("أخت شقيقه");
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
                superiors.push("أخت شقيقه");
                superiors.push("أخت ﻷب");
            }

            return superiors;
        };

        return publicProperties.call(this);  

    }()),
}

var children = ["ابن", "ابن ابن", "بنت ابن", "بنت"]
var maleChildren = ["ابن", "ابن ابن"];
var fathers = ["أب", "جد"];
var siblings = ["أخت شقيقه", "أخ شقيق"];

function setRemainderRatio(person, fortuneRatio, value)
{
    if(alwratha.data[person].fortune.hasRemainder)
    {
        fortuneRatio = value; 
    }
    alwratha.data[person].fortune.hasRemainder = true;

    return fortuneRatio;
}

function getMhgobenBy(warith)
{
    var warithAndMhgoben = this.getPeopleTheyBlock();
    warithAndMhgoben[warithAndMhgoben.length] = warith;
    return warithAndMhgoben;
}

function isBlocked(){
    return alwratha.includesAnyOf(this.getSuperiors());
};

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
};