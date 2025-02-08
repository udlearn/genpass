const genpass = require('../lib/index.js').generatePassword;

console.log(genpass());
console.log(genpass({ length: 12, symbols: false }));
