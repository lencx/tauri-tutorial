import { useState, useMemo, Children, isValidElement } from 'react';
import clsx from 'clsx';

import './index.scss';

const parseTabList = (children: React.ReactNode) => {
  return Children.map(children, (node) => {
    if (isValidElement(node) && node.props.tab) return node;
    return null;
  })?.filter((node) => node);
};

interface TabsProps {
  className?: string;
  children: React.ReactElement[];
}

const Tabs: React.FC<TabsProps> = ({ className, children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = useMemo(() => parseTabList(children), []);

  return (
    <div className={clsx('omb-tabs', className)}>
      <div className="omb-tabs-head">
        {tabs?.map((node, idx) => {
          return (
            <div
              key={+idx}
              onClick={() => setActiveIndex(idx)}
              className={clsx({ active: activeIndex === idx })}
            >
              {node.props.tab}
            </div>
          );
        })}
      </div>
      <div className="omb-tabs-body">{children[activeIndex]}</div>
    </div>
  );
};

interface TabPaneProps {
  tab: string;
  children: React.ReactNode;
  className?: string;
}

const TabPane: React.FC<TabPaneProps> = ({ children, className }) => {
  return <div className={clsx('omb-tabs-pane', className)}>{children}</div>;
};

export type TabsType = typeof Tabs & { TabPane: typeof TabPane };
(Tabs as TabsType).TabPane = TabPane;

export default Tabs as TabsType;
