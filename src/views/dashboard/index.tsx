import { useEffect } from 'react';
import OmbCard, { OmbItem } from '@/components/OmbCard';
import SwitchLang from '@/components/SwitchLang';

import path from '@tauri-apps/api/path';

import useI18n from '@/hooks/useI18n';
// import ohmyboxIcon from '@/oh-my-box.svg';

export default function DashboardView() {
  const t = useI18n(['dashboard', 'tools', 'game']);

  return (
    <div className="p-5">
      <SwitchLang />
      <OmbCard title={t('dashboard:tools')}>
        <OmbItem to="/tools/canvas">{t('tools:canvas')}</OmbItem>
      </OmbCard>
      <OmbCard title={t('dashboard:game')}>
        <OmbItem to="/game/game-of-life">{t('game:game-of-life')}</OmbItem>
      </OmbCard>
      <OmbCard title={t('dashboard:editor')}>
        <OmbItem to="/mdhub">{t('game:mdhub')}</OmbItem>
      </OmbCard>
      {/* <OmbCard title={t('dashboard:video')}></OmbCard>
      <OmbCard title={t('dashboard:other')}></OmbCard> */}
    </div>
  );
}
