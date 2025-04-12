import { t } from '../i18n/index.js';
import { runAnalyzersOnAllDeps } from '../engine/runAnalyzers.js';

export async function analyze() {
  const explainMode = process.argv.includes('--explain');

  console.log(t('greeting') + '\n');
  console.log(t('scan_start') + '\n');

  const results = await runAnalyzersOnAllDeps();

  for (const entry of results) {
    console.log(`📦 ${entry.package}`);
    for (const res of entry.results) {
      const icon = res.ok ? '✅' : '❌';
      console.log(`  ${icon} ${res.message}`);

      if (!res.ok && explainMode) {
        console.log(`     ℹ️  ${t('ssr_explain')}`);
        console.log(`     💡 ${t('ssr_solution')}`);
        console.log('');
        console.log(t('ssr_fix_code'));
        console.log('');
      }
    }
    console.log('');
  }

  console.log(t('scan_done'));
  console.log(t('report_hint') + '\n');
}
