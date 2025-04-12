import { t } from '../i18n/index.js';
import { runAnalyzersOnAllDeps } from '../engine/runAnalyzers.js';
import { generateHtmlReport } from '../reports/generateHtmlReport.js';
import { generateMarkdownReport } from '../reports/generateMarkdownReport.js';
import { generateJsonReport } from '../reports/generateJsonReport.js';
import { openFileInBrowser } from '../utils/openFileInBrowser.js';
import fs from 'fs';
import path from 'path';

export async function report() {
  const formatArg = process.argv.find(arg => arg.startsWith('--format='));
  const format = formatArg?.split('=')[1] ?? 'html';

  const results = await runAnalyzersOnAllDeps();
  const outputDir = process.cwd();

  let outputPath: string;
  let content: string;

  switch (format) {
    case 'md':
      content = generateMarkdownReport(results);
      outputPath = path.join(outputDir, 'nextjs-helper-report.md');
      break;

    case 'json':
      content = generateJsonReport(results);
      outputPath = path.join(outputDir, 'nextjs-helper-report.json');
      break;

    case 'html':
    default:
      content = generateHtmlReport(results);
      outputPath = path.join(outputDir, 'nextjs-helper-report.html');
      break;
  }

  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`${t('report_generated')}: ${outputPath}`);

  if (format === 'html') {
    await openFileInBrowser(outputPath);
  }
}
