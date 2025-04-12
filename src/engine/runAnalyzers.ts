import { Analyzer, AnalyzerResult, ReportEntry } from './types';
import { ssrAnalyzer } from '../analyzers/ssr.js';
import fs from 'fs';

const analyzers: Analyzer[] = [ssrAnalyzer];

export async function runAnalyzers(pkgName: string): Promise<AnalyzerResult[]> {
  const pkgJson = {};
  return analyzers.map(a => a.run(pkgName, pkgJson));
}

export async function runAnalyzersOnAllDeps(): Promise<ReportEntry[]> {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

  const deps = Object.keys(pkg.dependencies || {});

  const results: ReportEntry[] = [];
  for (const dep of deps) {
    const analyzed = await runAnalyzers(dep);
    results.push({ package: dep, results: analyzed });
  }

  return results;
}
