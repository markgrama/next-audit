import type { ReportEntry } from '../engine/types';

export function generateJsonReport(data: ReportEntry[]): string {
  const report = {
    type: 'next-audit-report',
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    results: data,
  };

  return JSON.stringify(report, null, 2);
}
