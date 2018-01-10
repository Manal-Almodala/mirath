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
}
module.exports.warith = Warith;
module.exports.fortune = Fortune;