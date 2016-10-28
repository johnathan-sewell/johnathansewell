#! /usr/bin/env node
const fs = require('fs');
const shell = require('shelljs');

// const watchPath = process.argv[2];
// console.log(watchPath);
// if (watchPath) {
//   fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
//     if (filename) {
//       console.log(filename);
//     }
//   });
// }


const partialsArgs = fs.readdirSync('./templates/partials/')
  .filter(f => f.endsWith('.template'))
  .reduce((args, partial) => `${args} -p templates/partials/${partial}`, '');

fs.readdirSync('./templates/')
  .filter(filePath => filePath.endsWith('.template'))
  .forEach((templatePath) => {
    const templateName = templatePath.substring(0, templatePath.lastIndexOf('.template'));
    const outputDir = templateName === 'index' ? 'public/' : 'public/writing/';
    const command = `$(npm bin)/mustache ${partialsArgs} templates/data/empty.json templates/${templatePath} > ${outputDir}/${templateName}.html`;
    console.log(command); // eslint-disable-line no-console
    shell.exec(command);
  });
