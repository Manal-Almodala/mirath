class Tarika
{
    constructor()
    {
        this.money = 0;
        this.property = 0;
        this.remainder = {
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
}
module.exports = Tarika; 