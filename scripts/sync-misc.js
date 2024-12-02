const fs = require('fs');
const path = require('path');

// 루트 디렉토리 및 .npmignore 경로
const rootDir = path.resolve(__dirname, '..');
const npmignorePath = path.join(rootDir, '.npmignore');
const readmePath = path.join(rootDir, 'README.md');

// 하위 패키지 디렉토리
const packagesDir = path.join(rootDir, 'packages/bots');

// .npmignore 파일 복사 함수
function copyNpmIgnore(targetDir) {
  const destination = path.join(targetDir, '.npmignore');
  try {
    fs.copyFileSync(npmignorePath, destination);
    console.log(`Copied .npmignore to: ${targetDir}`);
  } catch (error) {
    console.error(`Failed to copy .npmignore to ${targetDir}:`, error);
  }
}

// README.md 파일 복사 함수
function copyReadme(targetDir) {
  const destination = path.join(targetDir, 'README.md');
  try {
    fs.copyFileSync(readmePath, destination);
    console.log(`Copied README.md to: ${targetDir}`);
  } catch (error) {
    console.error(`Failed to copy README.md to ${targetDir}:`, error);
  }
}

// 하위 디렉토리를 순회하며 .npmignore 복사
function syncNpmIgnore() {
  if (!fs.existsSync(packagesDir)) {
    console.error(`Packages directory does not exist: ${packagesDir}`);
    process.exit(1);
  }

  const packageDirs = fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(packagesDir, dirent.name));

  packageDirs.forEach((packageDir) => {
    copyNpmIgnore(packageDir);
    copyReadme(packageDir);
  });
}

// 실행
syncNpmIgnore();
