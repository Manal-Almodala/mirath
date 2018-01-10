const alwratha = require("../../controllers/mirath").model;

class Tarika
{
    constructor(tarika)
    {
        this.money = tarika.money;
        this.property = tarika.property;
        this._remainder = {
            money: 0,
            property: 0,
        }
    }

    get remainder()
    {
        let consumedMoney = 0, consumedProperty = 0,;
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