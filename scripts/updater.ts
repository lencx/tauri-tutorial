import minimist from 'minimist';
import fs from 'fs';

const argv = minimist(process.argv.slice(2));

if (!argv.v) {
  console.log('Missing version');
  process.exit(1);
}

const baseURL = `https://github.com/lencx/OhMyBox/releases/download/v${argv.v}`;

// https://github.com/lencx/OhMyBox/releases
// Darwin
// /src-tauri/target/release/bundle/macos/OhMyBox.dmg
// /src-tauri/target/release/bundle/macos/OhMyBox.app.tar.gz
// Linux
// /src-tauri/target/release/bundle/appimage/oh-my-box_0.1.1_amd64.AppImage
// /src-tauri/target/release/bundle/appimage/oh-my-box_0.1.1_amd64.AppImage.tar.gz
// Windows
// \src-tauri\target\release\bundle\msi\OhMyBox_0.1.1_x64_en-US.msi
// \src-tauri\target\release\bundle\msi\OhMyBox_0.1.1_x64_en-US.msi.zip
const updaterInfo = {
  version: `v${argv.v}`,
  notes: `OhMyBox version`,
  pub_date: new Date(),
  platforms: {
    'darwin-x86_64': {
      signature: '',
      url: `${baseURL}/OhMyBox.app.tar.gz`
    },
    'darwin-aarch64': {
      signature: '',
      url: `${baseURL}/OhMyBox.app.tar.gz`
    },
    'linux-x86_64': {
      signature: '',
      url: `${baseURL}/oh-my-box_${argv.v}_amd64.AppImage`
    },
    'windows-x86_64': {
      signature: '',
      url: `${baseURL}/OhMyBox_${argv.v}_x64_en-US.msi`
    }
  }
}

if (!fs.existsSync('updater')) {
  fs.mkdirSync('updater');
}

fs.writeFileSync('./updater/app.json', JSON.stringify(updaterInfo, null, 2));