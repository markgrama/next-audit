import { t } from '../i18n/index.js';

export async function openFileInBrowser(filePath: string): Promise<void> {
  const { execa } = await import('execa');
  const platform = process.platform;

  let command: string;
  let args: string[];

  if (platform === 'darwin') {
    // macOS
    command = 'open';
    args = [filePath];
  } else if (platform === 'win32') {
    // Windows
    command = 'cmd';
    args = ['/c', 'start', '""', filePath]; // empty title mandatory
  } else {
    // Linux and others
    command = 'xdg-open';
    args = [filePath];
  }

  try {
    await execa(command, args);
  } catch (err) {
    console.error(`🚨 ${t('open_error')}`, err);
  }
}
