const people = require("../models/mirath/people");

const math = require('mathjs');

var test = {x: 1, y:3}
console.log(Object.keys(test)[0]);



[husband, sister, stepSister]
[husband, sister, mother]
[husband, sister, mother, stepSister, sisterFromMother]
[husband, 2 * sister, mother, stepSister, sisterFromMother]
[husband, 2 * daughter, mother]
[husband, 2 * daughter, mother, father]
[3 * wife, 2 * granny, sisterFromMother, father]

// Examples for alrd
[granny]
[4 * granddaughter] 
[mother, daughter, granddaughter]
[wife, 3 * daughter]
[husband, daughter, granddaughter]
[wife, mother, 3 * sisterFromMother]