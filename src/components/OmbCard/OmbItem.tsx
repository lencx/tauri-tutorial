import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

interface OmbItemProps {
  to?: string;
  className?: string;
  children: React.ReactNode;
}

const OmbItem: React.FC<OmbItemProps> = ({ className, children, to }) => {
  const navigate = useNavigate();
  return (
    <div
      className={clsx('omb-card-group-item w-full h-200px p-3', className)}
      lg="rounded w-1/3 fs-30"
      md="w-1/2 fs-24"
      sm="fs-18"
    >
      <div
        className="h-full shadow-floating rounded-lg omb-hover"
        onClick={() => to && navigate(to)}
      >
        {children}
      </div>
    </div>
  );
};

OmbItem.defaultProps = {
  to: '/',
};

export default OmbItem;
