import { Analyzer } from '../engine/types';
import { t } from '../i18n/index.js';

const knownIncompatible = [
  'react-leaflet',
  'react-confetti',
  'react-lottie',
  'swiper',
  'react-player',
  'mapbox-gl',
  'video.js'
];

export const ssrAnalyzer: Analyzer = {
  id: 'ssr',
  title: 'SSR Compatibility',
  run(pkgName) {
    if (knownIncompatible.includes(pkgName)) {
      return { ok: false, message: t('ssr_fail') };
    }
    return { ok: true, message: t('ssr_ok') };
  }
};
