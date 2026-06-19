const fs = require('fs');

const file = './components/sections/Services.tsx';
let code = fs.readFileSync(file, 'utf8');

// We will use replace_file_content to replace the entire component, it's easier.
