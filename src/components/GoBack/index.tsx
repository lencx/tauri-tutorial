import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react/offline';
import backIcon from '@iconify-icons/mdi/arrow-back';

import './index.scss';

interface GoBackProps {
  to?: string | number;
}

const GoBack: React.FC<GoBackProps> = ({ to }) => {
  const location = useLocation();
  const go = useNavigate();
  const isRoot = location.pathname === '/';

  if (isRoot) return null;

  return (
    <span className="omb-goback hv-center shadow-floating rounded-full omb-hover">
      <Icon icon={backIcon} onClick={() => go((to || -1) as string)} />
    </span>
  );
};

export default GoBack;
