const fs = require('fs');
const path = require('path');
const buffer = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==", 'base64');
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir);
['favicon.png', 'icon.png', 'splash.png', 'adaptive-icon.png'].forEach(f => {
    fs.writeFileSync(path.join(assetsDir, f), buffer);
    console.log('Created ' + f);
});
