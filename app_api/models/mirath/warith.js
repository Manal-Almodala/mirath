class Fortune
{
    constructor()
    {
        this.ratio = 0;
        this.money = 0;
        this.property = 0;
    }

    calculate(tarika)
    {
        this.money = this.ratio * tarika.money;
        this.property = this.ratio * tarika.property;
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
