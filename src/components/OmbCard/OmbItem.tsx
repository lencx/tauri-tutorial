import { useNavigate } from 'react-router-dom';

interface OmbItemProps {
  name: string;
  to?: string;
}

const OmbItem: React.FC<OmbItemProps> = ({ name, to }) => {
  const navigate = useNavigate();
  return (
    <div
      className="omb-card-group-item w-full h-200px p-3"
      lg="rounded w-1/3 fs-30"
      md="w-1/2 fs-24"
      sm="fs-18"
    >
      <div
        className="h-full hv-center shadow-floating rounded-lg omb-hover"
        onClick={() => to && navigate(to)}
      >
        {name}
      </div>
    </div>
  );
};

OmbItem.defaultProps = {
  to: '/',
};

export default OmbItem;
