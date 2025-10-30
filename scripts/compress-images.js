const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminSvgo = require('imagemin-svgo');

(async () => {
  const publicDir = path.join(__dirname, '../public');
  const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.svg'));
  await imagemin(files.map(f => path.join(publicDir, f)), {
    destination: publicDir,
    plugins: [imageminSvgo()]
  });
  console.log('SVGs compressed!');
})();
