import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), '.nextjs-helper.config.json');

export type UserConfig = {
  lang?: string;
  // here we can add future options, like: "autoOpen": true
};

export function loadUserConfig(): UserConfig {
  try {
    const content = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    return {};
  }
}

export function saveUserConfig(config: UserConfig) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  } catch (e) {
    console.error('❌ Could not save config file', e);
  }
}

export function configExists(): boolean {
  return fs.existsSync(configPath);
}
