class Fortune
{
    constructor()
    {
        this.ratio = 0;
        this.remainderRatio = 0;
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
        this.money += this.remainderRatio * tarika.remainder.money;
        this.property += this.remainderRatio * tarika.remainder.property;
    }
}
module.exports.fortune = Fortune;

class Warith
{
    constructor(){
        this.count = 0;
        this.fortune = new Fortune();
    }

    get share()
    {
        let shareValue = 6 * this.count * this.fortune.ratio;
        shareValue = Number(shareValue.toFixed(2));
        return shareValue;
    }
}
module.exports.warith = Warith;
