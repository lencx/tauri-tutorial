import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

import useI18n from '@/hooks/useI18n';

interface OmbIcon {
  title: string;
  icon: string;
  to: string;
  onClick?: () => void;
}

const OmbIcon: React.FC<OmbIcon> = ({ title, icon, to, onClick }) => {
  const t = useI18n(['dashboard']);
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
      return;
    }
    onClick && onClick();
  };

  return (
    <span className="omb-card-icon" onClick={handleClick}>
      <Icon icon={icon} fontSize={40} color="#444" />
      <b>{t(title)}</b>
    </span>
  );
};

export default OmbIcon;
