var output = require('child_process').execSync('ls',{ encoding: 'utf8' });
console.log(output);
