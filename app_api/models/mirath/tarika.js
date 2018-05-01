class Tarika
{
    constructor()
    {
        this.reset();
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

    reset()
    {
        this.money = 0;
        this.property = 0;
        this.remainder = {
            money: 0,
            property: 0
        };
    }

    get isNotEntered()
    {
        if(this.money == 0 && this.property == 0)
            return true;
        else    
            return false;
    }

    get hasRemainder()
    {
        var remainder = this.remainder.money + this.remainder.property;
        return remainder > 0;
    }
    
}
module.exports = Tarika; 