import { VitePluginConfig } from '@unocss/vite';

const fmtBox = (list: Array<[string, string]>) =>
  list.map((i) => [new RegExp(`^${i[0]}-(\d+)$`), ([, d]) => ({ [i[1]]: `${+d / 4}rem` })]);

export default {
  rules: [
    // ### box ###
    ...fmtBox([
      ['m', 'margin'],
      ['p', 'padding'],
      ['mb', 'margin-bottom'],
      ['ml', 'margin-left'],
      ['mr', 'margin-right'],
      ['mt', 'margin-top'],
      ['pb', 'padding-bottom'],
      ['pl', 'padding-left'],
      ['pr', 'padding-right'],
      ['pt', 'padding-top'],
    ]),

    // ### font ###
    [/^fs-(\d+)$/, ([, d]) => ({ 'font-size': `${+d / 16}em` })],
    [/^fw-(\d+)$/, ([, d]) => ({ 'font-weight': d })],

    // ### text ###
  ],
  shortcuts: [
  ]
} as VitePluginConfig;