import en from './en.json' assert { type: 'json' };
import ru from './ru.json' assert { type: 'json' };
import { loadUserConfig } from '../config/user-config.js';

export type Locale = 'en' | 'ru';

const dictionaries: Record<Locale, Record<string, string>> = { en, ru };
let currentLang: Locale = 'en';

export function setLanguage(lang: string): void {
  if (lang in dictionaries) {
    currentLang = lang as Locale;
  }
}

export function detectLanguage(): Locale {
  const userConfig = loadUserConfig();

  if (userConfig.lang && userConfig.lang in dictionaries) {
    return userConfig.lang as Locale;
  }

  const sysLang = Intl.DateTimeFormat().resolvedOptions().locale;
  if (sysLang.startsWith('ru')) return 'ru';

  return 'en';
}

export function getCurrentLang(): Locale {
  return currentLang;
}

export function t(key: string, vars: Record<string, string> = {}): string {
  const dict = dictionaries[currentLang] || dictionaries.en;
  let text = dict[key] || dictionaries.en[key] || key;

  for (const [k, v] of Object.entries(vars)) {
    text = text.replace(new RegExp(`{{${k}}}`, 'g'), v);
  }

  return text;
}
