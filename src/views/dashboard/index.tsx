import OmbCard, { OmbIcon } from '@/components/OmbCard';
import SwitchLang from '@/components/SwitchLang';
// import useI18n from '@/hooks/useI18n';

export default function DashboardView() {
  // const t = useI18n(['dashboard', 'tools', 'game']);

  return (
    <div className="p-5">
      <SwitchLang />
      <OmbCard icon="fa-solid:tools" title="dashboard:tools">
        <OmbIcon
          title="dashboard:canvas"
          icon="ion:color-palette"
          to="/tools/canvas"
        />
        <OmbIcon
          title="dashboard:mdhub"
          icon="ion:logo-markdown"
          to="/tools/mdhub"
        />
      </OmbCard>
      <OmbCard
        icon="fluent-emoji-high-contrast:game-die"
        title="dashboard:game"
      >
        <OmbIcon
          title="dashboard:game-of-life"
          icon="ic:baseline-grid-4x4"
          to="/game/game-of-life"
        />
      </OmbCard>
    </div>
  );
}
