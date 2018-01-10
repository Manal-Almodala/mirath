class Warith
{
    constructor(){
        this.count = 0;
        this.fortune = new Fortune();
    }
}

class Fortune
{
    constructor()
    {
        this.fortune = {
            ratio: 0.0,
            money: 0,
            property: 0
        }
    }

    calculate(tarika)
    {
        this.money = this.ratio * tarika.money;
        this.property = this.ratio * tarika.property;
    }
}
module.exports.warith = Warith;
module.exports.fortune = Fortune;