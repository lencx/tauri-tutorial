import OmbCard, { OmbItem } from '@/components/OmbCard';
import SwitchLang from '@/components/SwitchLang';

import useI18n from '@/hooks/useI18n';
import ohmyboxIcon from '@/oh-my-box.svg';

export default function DashboardView() {
  const t = useI18n(['dashboard', 'tools', 'game']);

  return (
    <div className="p-5">
      <SwitchLang />
      <div className="hv-center">
        <img width={160} src={ohmyboxIcon} alt="logo" />
      </div>
      <OmbCard title={t('dashboard:tools')}>
        <OmbItem to="/tools/canvas">{t('tools:canvas')}</OmbItem>
      </OmbCard>
      <OmbCard title={t('dashboard:game')}>
        <OmbItem to="/game/game-of-life">{t('game:game-of-life')}</OmbItem>
      </OmbCard>
      {/* <OmbCard title={t('dashboard:video')}></OmbCard>
      <OmbCard title={t('dashboard:other')}></OmbCard> */}
    </div>
  );
}
