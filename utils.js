const { red, bold } = require('chalk');

module.exports.logError = (desc, err) => console.error(`${red(desc)} ${red('(')}${red(bold(err.name))}${red(')')}\n\n${err}`);