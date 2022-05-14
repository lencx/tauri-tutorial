import OmbCard, { OmbItem } from '@/components/OmbCard';

import ohmyboxIcon from '@/oh-my-box.svg';

export default function DashboardView() {
  return (
    <div className="p-5">
      <div className="hv-center">
        <img width={160} src={ohmyboxIcon} alt="logo" />
      </div>
      <OmbCard title="Tools">
        <OmbItem name="Canvas" to="/canvas" />
        <OmbItem name="Color" />
      </OmbCard>
      <OmbCard title="Video">
        <OmbItem name="Video" />
        <OmbItem name="Video" />
        <OmbItem name="Video" />
        <OmbItem name="Video" />
        <OmbItem name="Video" />
        <OmbItem name="Video" />
      </OmbCard>
      <OmbCard title="Game">
        <OmbItem name="Game" />
        <OmbItem name="Game" />
        <OmbItem name="Game" />
        <OmbItem name="Game" />
        <OmbItem name="Game" />
        <OmbItem name="Game" />
      </OmbCard>
      <OmbCard title="Other">
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
