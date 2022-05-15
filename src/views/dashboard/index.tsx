import OmbCard, { OmbItem } from '@/components/OmbCard';
import SwitchLang from '@comps/SwitchLang';

import useI18n from '@hooks/useI18n';
import ohmyboxIcon from '@/oh-my-box.svg';

export default function DashboardView() {
  const t = useI18n(['dashboard']);

  return (
    <div className="p-5">
      <SwitchLang />
      <div className="hv-center">
        <img width={160} src={ohmyboxIcon} alt="logo" />
      </div>
      <OmbCard title={t('dashboard:tools')}>
        <OmbItem name="Canvas" to="/canvas" />
        <OmbItem name="Color" />
      </OmbCard>
      <OmbCard title={t('dashboard:video')}>
        <OmbItem name="Video" />
        <OmbItem name="Video" />
        <OmbItem name="Video" />
        <OmbItem name="Video" />
        <OmbItem name="Video" />
        <OmbItem name="Video" />
      </OmbCard>
      <OmbCard title={t('dashboard:game')}>
        <OmbItem name="Game" />
        <OmbItem name="Game" />
        <OmbItem name="Game" />
        <OmbItem name="Game" />
        <OmbItem name="Game" />
        <OmbItem name="Game" />
      </OmbCard>
      <OmbCard title={t('dashboard:other')}>
        <OmbItem name="Other" />
        <OmbItem name="Other" />
        <OmbItem name="Other" />
        <OmbItem name="Other" />
        <OmbItem name="Other" />
        <OmbItem name="Other" />
      </OmbCard>
    </div>
  );
}
