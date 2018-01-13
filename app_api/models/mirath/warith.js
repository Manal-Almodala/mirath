class Fortune
{
    constructor()
    {
        this.ratio = 0;
        this.money = 0;
        this.property = 0;
        this.hasRemainder = false;
    }

    calculate(tarika)
    {
        this.money = this.ratio * tarika.money;
        this.property = this.ratio * tarika.property;
    }

    addRemainderWorth(tarika)
    {
        this.money += this.ratio * tarika.remainder.money;
        this.property += this.ratio * tarika.remainder.property;
    }
}
module.exports.fortune = Fortune;

class Warith
{
    constructor(){
        this.count = 0;
        this.fortune = new Fortune();
    }
}
module.exports.warith = Warith;
