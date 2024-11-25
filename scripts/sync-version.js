const fs = require('fs');
const path = require('path');

function syncVersions() {
  // 루트 package.json 읽기
  const rootPackage = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../lerna.json'), 'utf8')
  );
  const rootVersion = rootPackage.version;

  // packages 디렉토리 내의 모든 패키지 찾기
  const packagesDir = path.resolve(__dirname, '../packages/bots');
  const packages = fs.readdirSync(packagesDir);

  packages.forEach(pkg => {
    const packageJsonPath = path.resolve(packagesDir, pkg, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      packageJson.version = rootVersion;
      
      // 업데이트된 package.json 저장
      fs.writeFileSync(
        packageJsonPath, 
        JSON.stringify(packageJson, null, 2) + '\n'
      );
      console.log(`Updated ${pkg} version to ${rootVersion}`);
    }
  });
}

syncVersions();
