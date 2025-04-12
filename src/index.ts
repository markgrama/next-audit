#!/usr/bin/env node

import { setLanguage, detectLanguage, t } from './i18n/index.js';
import { configExists, loadUserConfig, saveUserConfig } from './config/user-config.js';
import { runFirstTimeWizard } from './config/initial-wizard.js';
import { analyze } from './cli/analyze.js';
import { report } from './cli/report.js';

async function main() {
  if (!configExists()) {
    await runFirstTimeWizard();
  }

  const config = loadUserConfig();

  for (const arg of process.argv) {
    if (arg.startsWith('--lang=')) {
      const lang = arg.split('=')[1];
      config.lang = lang;
      saveUserConfig(config);
    }
  }

  setLanguage(config.lang || detectLanguage());

  const cmd = process.argv[2];

  switch (cmd) {
    case 'analyze':
      await analyze();
      break;

    case 'report':
      await report();
      break;

    case '--help':
    case '-h':
    case undefined:
      console.log(t('greeting'));
      console.log(t('help_intro'));
      console.log('');
      console.log(t('help_analyze'));
      console.log(t('help_report'));
      console.log(t('help_lang'));
      break;

    default:
      console.log(t('unknown_command', { command: cmd || '(none)' }));
      console.log('👉 npx next-audit analyze | report');
      break;
  }
}

main();
