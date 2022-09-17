import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react/offline';
import backIcon from '@iconify-icons/mdi/arrow-back';
import clsx from 'clsx';

import useI18n from '@/hooks/useI18n';
import Tooltip from '@/components/Tooltip';

import './index.scss';

interface GoBackProps {
  type?: 'float' | 'inline';
  to?: string | number;
}

const GoBack: React.FC<GoBackProps> = ({ type, to }) => {
  const location = useLocation();
  const go = useNavigate();
  const isRoot = location.pathname === '/';

  const t = useI18n(['tip']);

  if (isRoot) return null;

  return (
    <Tooltip label={t('tip:goback')} sys>
      <span
        className={clsx('omb-goback hv-center rounded-full omb-hover', type)}
      >
        <Icon icon={backIcon} onClick={() => go((to || -1) as string)} />
      </span>
    </Tooltip>
  );
};

GoBack.defaultProps = {
  type: 'float',
};

export default GoBack;
