import readline from 'readline';
import { saveUserConfig } from './user-config.js';

export async function runFirstTimeWizard(): Promise<void> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("🌍 Choose your language (en/ru): ", (answer) => {
      const lang = answer.trim().toLowerCase() === 'ru' ? 'ru' : 'en';
      saveUserConfig({ lang });
      rl.close();
      resolve();
    });
  });
}