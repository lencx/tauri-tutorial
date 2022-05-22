import GoBack from '@comps/GoBack';

import './index.scss';

interface LayoutProps {
  title: React.ReactNode;
  sider: React.ReactNode;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, sider, children }) => {
  return (
    <div className="omb-layout omb-canvas">
      <div className="omb-layout-sider">
        <div className="sider-head">
          <GoBack float={false} />
          {title}
        </div>
        <div className="sider-body">{sider}</div>
      </div>
      <div className="omb-layout-body">{children}</div>
    </div>
  );
};

export default Layout;
