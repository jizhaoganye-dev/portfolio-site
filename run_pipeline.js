const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const scratchDir = path.join(__dirname, '..');
const desktopDir = 'C:\\Users\\jizha\\OneDrive\\デスクトップ';

function run() {
  console.log('Step 1: Generating resume.xlsx...');
  execSync('node generate_resume_v3.js', { cwd: __dirname, stdio: 'inherit' });

  console.log('\nStep 2: Auto-fitting rows and exporting PDF via Excel COM (PowerShell)...');
  const psPath = path.join(scratchDir, 'autofit_excel.ps1');
  execSync(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, { cwd: scratchDir, stdio: 'inherit' });

  console.log('\nStep 3: Copying and renaming files to Japanese filenames...');
  const srcXlsx = path.join(scratchDir, 'resume.xlsx');
  const srcPdf = path.join(scratchDir, 'resume.pdf');

  // Final paths in scratch
  const destScratchXlsx = path.join(scratchDir, '職務経歴書_紺野.xlsx');
  const destScratchPdf = path.join(scratchDir, '職務経歴書_紺野.pdf');

  // Copy locally in scratch
  fs.copyFileSync(srcXlsx, destScratchXlsx);
  fs.copyFileSync(srcPdf, destScratchPdf);
  console.log(`Copied locally to:\n  - ${destScratchXlsx}\n  - ${destScratchPdf}`);

  // Copy to Desktop
  if (fs.existsSync(desktopDir)) {
    const destDesktopXlsx1 = path.join(desktopDir, '職務経歴書_紺野.xlsx');
    const destDesktopXlsx2 = path.join(desktopDir, '2026.6.8職務経歴書_紺野.xlsx');
    const destDesktopPdf = path.join(desktopDir, '職務経歴書_紺野.pdf');

    fs.copyFileSync(srcXlsx, destDesktopXlsx1);
    fs.copyFileSync(srcXlsx, destDesktopXlsx2);
    fs.copyFileSync(srcPdf, destDesktopPdf);

    console.log(`Copied to Desktop:\n  - ${destDesktopXlsx1}\n  - ${destDesktopXlsx2}\n  - ${destDesktopPdf}`);
  } else {
    console.warn(`Desktop directory not found: ${desktopDir}`);
  }

  console.log('\nPipeline completed successfully!');
}

run();
