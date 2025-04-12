import type { ReportEntry } from '../engine/types';
import { t } from '../i18n/index.js';

export function generateMarkdownReport(data: ReportEntry[]): string {
  const lines = ['# 📊 Next.js Integration Helper Report\n'];

  for (const entry of data) {
    lines.push(`## \`${entry.package}\``);

    for (const result of entry.results) {
      const icon = result.ok ? '✅' : '❌';
      lines.push(`- ${icon} ${result.message}`);

      if (!result.ok) {
        lines.push(`  - ℹ️ ${t('ssr_explain')}`);
        lines.push(`  - 💡 ${t('ssr_solution')}`);
        lines.push('');
        lines.push(t('ssr_fix_code'));
      }
    }

    lines.push('');
  }

  lines.push(`---\n${t('footer_note')}`);
  return lines.join('\n');
}
