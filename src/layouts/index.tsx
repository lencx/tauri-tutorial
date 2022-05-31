import GoBack from '@/components/GoBack';

import './index.scss';

interface LayoutProps {
  title: React.ReactNode;
  sider: React.ReactNode;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, sider, children }) => {
  return (
    <div className="omb-layout">
      <div className="omb-layout-sider">
        <div className="omb-layout-sider-head">
          <GoBack float={false} />
          {title}
        </div>
        <div className="omb-layout-sider-body omb-scrollbar">
          <div className="omb-layout-sider-scroll">{sider}</div>
        </div>
      </div>
      <div className="omb-layout-body">
        <div className="omb-layout-body-scroll omb-scrollbar">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
