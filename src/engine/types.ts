export type AnalyzerResult = {
    ok: boolean;
    message?: string;
  };
  
  export type ReportEntry = {
    package: string;
    results: AnalyzerResult[];
  };
  
  export type Analyzer = {
    id: string;
    title: string;
    run: (pkgName: string, pkgJson: any) => AnalyzerResult;
  };
  