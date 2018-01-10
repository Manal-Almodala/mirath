const alwratha = require("../../controllers/mirath").model;

class Tarika
{
    constructor()
    {
        this.money = 0;
        this.property = 0;
        this._remainder = {
            money: 0,
            property: 0,
        }
    }

    get money()
    {
        return this._money;
    }

    set money(value)
    {
        this._money = value;
    }

    get property()
    {
        return this._property;
    }

    set property(value)
    {
        this._property = value;
    }

    get remainder()
    {
        let consumedMoney = 0, consumedProperty = 0;
        for(var warith in alwratha.data)
        {
            consumedMoney += warith.count * warith.fortune.money;
            consumedProperty+= warith.count * warith.fortune.property;
        }

        this._remainder.money -= consumedMoney;
        this._remainder.property -= consumedProperty;
        return this._remainder;
    }
}
module.exports = Tarika; 