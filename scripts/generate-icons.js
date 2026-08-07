const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sourceImage = path.join(__dirname, '..', 'public/images/asesorias_migrante_custom_logo_1784912635483.jpg');
const iconsDir = path.join(__dirname, '..', 'public/icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

async function generateIcons() {
  const sizes = [192, 512];
  
  for (const size of sizes) {
    await sharp(sourceImage)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(iconsDir, `icon-${size}.png`));
    
    console.log(`Generated icon-${size}.png`);
  }

  // Generate favicon (32x32)
  await sharp(sourceImage)
    .resize(32, 32, {
      fit: 'cover',
      position: 'center'
    })
    .png()
    .toFile(path.join(iconsDir, 'favicon.png'));
  
  console.log('Generated favicon.png');
}

generateIcons().catch(console.error);