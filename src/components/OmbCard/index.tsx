export { default as OmbItem } from './OmbItem';

import './index.scss';

interface OmbCardProps {
  title: string;
  children: React.ReactNode;
}

const OmbCard: React.FC<OmbCardProps> = ({ title, children }) => {
  return (
    <div className="omb-card">
      <h2>{title}</h2>
      <div className="omb-card-group flex flex-wrap">{children}</div>
    </div>
  );
};

export default OmbCard;
