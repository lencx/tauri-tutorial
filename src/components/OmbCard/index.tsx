export { default as OmbItem } from './OmbItem';
export { default as OmbIcon } from './OmbIcon';

import { Icon } from '@iconify/react';
import useI18n from '@/hooks/useI18n';

import './index.scss';

interface OmbCardProps {
  title: string;
  children: React.ReactNode;
  icon?: string;
}

const OmbCard: React.FC<OmbCardProps> = ({ icon, title, children }) => {
  const t = useI18n(['dashboard']);

  return (
    <div className="omb-card">
      <h2>
        <span>
          {icon && <Icon className="icon" icon={icon} />}
          {t(title)}
        </span>
      </h2>
      <div className="omb-card-group flex flex-wrap">{children}</div>
    </div>
  );
};

export default OmbCard;
