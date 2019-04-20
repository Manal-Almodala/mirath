const people = require("../models/mirath/people");

const math = require('mathjs');
const Fraction = require('fraction.js');

var fraction = Fraction(2 / 3)


console.log(fraction.d);


[husband, sister, stepSister]
[husband, sister, mother]
[husband, sister, mother, stepSister, sisterFromMother]
[husband, 2 * sister, mother, stepSister, sisterFromMother]
[husband, 2 * daughter, mother]
[husband, 2 * daughter, mother, father]
[3 * wife, 2 * granny, sisterFromMother, father]