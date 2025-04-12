import type { AnalyzerResult } from '../engine/types';
import { t } from '../i18n/index.js';

type ReportEntry = {
  package: string;
  results: AnalyzerResult[];
};

export function generateHtmlReport(data: ReportEntry[]): string {
  const rows = data.map(({ package: pkg, results }) => {
    const resultRows = results.map(r => {
      const icon = r.ok ? '✅' : '❌';

      const explain = r.ok
        ? ''
        : `<div style="color:gray">${t('ssr_explain')}</div>
           <div><em>${t('ssr_solution')}</em></div>
           <pre style="background:#f6f6f6;padding:0.5rem;border-radius:6px;overflow-x:auto;margin-top:0.5rem;">${t('ssr_fix_code')}</pre>`;

      return `<div>${icon} ${r.message}${explain}</div>`;
    }).join('');

    return `
      <tr>
        <td><strong>${pkg}</strong></td>
        <td>${resultRows}</td>
      </tr>
    `;
  }).join('');

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Next.js Integration Report</title>
    <style>
      body { font-family: sans-serif; padding: 2rem; }
      table { border-collapse: collapse; width: 100%; }
      th, td { padding: 0.75rem; border: 1px solid #ccc; vertical-align: top; }
      th { background-color: #f5f5f5; }
      .footer { margin-top: 2rem; color: #777; font-size: 0.9em; }
      pre { white-space: pre-wrap; font-family: monospace; }
    </style>
  </head>
  <body>
    <h1>📊 Next.js Integration Helper Report</h1>
    <p>${t('summary_intro')}</p>
    <table>
      <thead>
        <tr><th>Package</th><th>Results</th></tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <div class="footer">${t('footer_note')}</div>
  </body>
  </html>
  `;
}
