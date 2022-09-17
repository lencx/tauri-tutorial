import clsx from 'clsx';
import { isValidElement } from 'react';

import GoBack from '@/components/GoBack';

import './fullscreen.scss';

interface FullScreenProps {
  className?: string;
  hasGoBack?: boolean;
  taskbar?: React.ReactNode;
  children: React.ReactNode;
}

const FullScreen: React.FC<FullScreenProps> = ({
  hasGoBack = true,
  taskbar,
  children,
  className,
}) => {
  return (
    <div className={clsx('omb-fullscreen', className)}>
      {hasGoBack && !taskbar && <GoBack type="float" />}
      {isValidElement(taskbar) && (
        <div className="omb-taskbar">
          <GoBack type="inline" />
          {taskbar}
        </div>
      )}
      <div className="fullscreen-body">{children}</div>
    </div>
  );
};

export default FullScreen;
