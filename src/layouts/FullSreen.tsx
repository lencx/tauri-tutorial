import clsx from 'clsx';

import GoBack from '@/components/GoBack';

import './fullscreen.scss';

interface FullScreenProps {
  className?: string;
  children: React.ReactNode;
}

const FullScreen: React.FC<FullScreenProps> = ({ children, className }) => {
  return (
    <div className={clsx('omb-fullscreen', className)}>
      <GoBack float />
      <div className="fullscreen-body">{children}</div>
    </div>
  );
};

export default FullScreen;
