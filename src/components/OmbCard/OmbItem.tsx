import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

interface OmbItemProps {
  to?: string;
  children: React.ReactNode;
  className?: string;
  cardClass?: string;
  onClick?: () => void;
}

const OmbItem: React.FC<OmbItemProps> = ({
  className,
  cardClass,
  children,
  onClick,
  to,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
    onClick && onClick();
  };

  return (
    <div
      className={clsx('omb-card-group-item w-full h-200px p-3', cardClass)}
      lg="rounded w-1/3 fs-30"
      md="w-1/2 fs-24"
      sm="fs-18"
    >
      <div
        className={clsx(
          'h-full shadow-floating rounded-lg omb-hover',
          className
        )}
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  );
};

export default OmbItem;
