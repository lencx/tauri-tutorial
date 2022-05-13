import useI18n from '@hooks/useI18n';

export default function DashboardView() {
  const t = useI18n(['common']);
  return (
    <div>
      <div>{t('common:btn')}</div>
    </div>
  );
}
