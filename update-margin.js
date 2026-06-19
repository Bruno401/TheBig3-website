const fs = require('fs');
const file = './components/sections/Services.tsx';
let code = fs.readFileSync(file, 'utf8');
code = code.replace(/marginBottom: i === services\.length - 1 \? '0' : '50vh',/g, "marginBottom: '50vh',");
fs.writeFileSync(file, code);
