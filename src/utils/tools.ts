import dayjs from 'dayjs';

export const fmtI18n = (...args: any[]) => {
  const i18nMap: Record<string, any> = {};
  const ns: string[] = [];
  args.forEach((i) => {
    Object.keys(i).forEach((j) => {
      if (j === '__ns') ns.push(i.__ns);
      if (j !== '__ns' && !i18nMap[j]) i18nMap[j] = {};
      if (i18nMap[j]) i18nMap[j] = { ...i18nMap[j], [i.__ns]: i[j] };
    });
  });
  return [i18nMap, ns] as const;
}

export const getScrollPosition = (el: any = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

export const getScreenSize = () => ({
  width: document.body.clientWidth,
  height: document.body.clientHeight,
});

export const fmtDate = (date: Date) => dayjs(date).format('YYYY/MM/DD');

export const ignoreFile = (name: string) => /[\.\\/@\*%#!]/ig.test(name);