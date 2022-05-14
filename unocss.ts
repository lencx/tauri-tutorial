import { VitePluginConfig } from '@unocss/vite';
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify';

export default {
  rules: [
    // ### font ###
    [/^fs-?(\d+)(\w+)?$/, ([, d, w]) => ({ 'font-size': w ? `${d}${w}` : `${+d / 16}em` })],
  ],
  shortcuts: [
    {
      'hv-center': 'flex items-center justify-center',
      'omb-hover': 'cursor-pointer select-none',
    }
  ],
  presets: [
    presetUno(),
    presetAttributify(),
  ],
} as VitePluginConfig;

// const fmtRules = (list: Array<[string, string]>) =>
//   list.map((i) => [new RegExp(`^${i[0]}-?(\d+)(\w+)?$`), ([, d, w]) => ({ [i[1]]: w ? `${d}${w}` : `${+d / 4}rem` })]);
