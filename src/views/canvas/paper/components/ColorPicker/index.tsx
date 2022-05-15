import { useState } from 'react';
import clsx from 'clsx';

import useI18n from '@hooks/useI18n';
import Tabs from '@comps/Tabs';
import './index.scss';

const { TabPane } = Tabs;

const colorList = [
  '#000000',
  '#5f6368',
  '#9aa0a6',
  '#dadce0',
  '#f1f3f4',
  '#ffffff',
  '#f28b82',
  '#fdd663',
  '#81c995',
  '#78d9ec',
  '#8ab4f8',
  '#c58af9',
  '#ea4335',
  '#fbbc04',
  '#34a853',
  '#24c1e0',
  '#4285f4',
  '#a142f4',
  '#c5221f',
  '#f29900',
  '#188038',
  '#12a4af',
  '#1967d2',
  '#8430ce',
];

interface ColorPickerProps {
  onChange?: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useI18n(['common']);

  const handleColor = (color: string, index: number) => {
    setActiveIndex(index);
    onChange && onChange(color);
  };

  return (
    <Tabs className="omb-color-picker">
      <TabPane className="color-list" tab={t('common:palette')}>
        {colorList.map((i, idx) => {
          return (
            <div
              key={+idx}
              className={clsx('color-item hv-center', {
                checked: idx === activeIndex,
              })}
              onClick={() => handleColor(i, idx)}
            >
              <span style={{ backgroundColor: i }} />
            </div>
          );
        })}
      </TabPane>
      <TabPane tab={t('common:custom')}>
        <div>TODO</div>
      </TabPane>
    </Tabs>
  );
};

export default ColorPicker;
