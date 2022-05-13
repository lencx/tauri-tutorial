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