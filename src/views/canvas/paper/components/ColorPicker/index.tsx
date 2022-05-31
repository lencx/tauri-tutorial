import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { HexColorPicker, HexColorInput } from 'react-colorful';

import Tabs from '@/components/Tabs';
import Tooltip from '@/components/Tooltip';
import useI18n from '@/hooks/useI18n';
import useLocalColor from '@/hooks/useLocalColor';
import './index.scss';

const { TabPane } = Tabs;

const COLOR_LIST = [
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
  defaultValue?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  onChange,
  defaultValue,
}) => {
  const t = useI18n(['common']);
  const { localColors, setLocalColors } = useLocalColor(6);

  const [activeIndex, setActiveIndex] = useState(0);
  const [color, setColor] = useState(defaultValue);

  const handleColor = (c: string, index: number) => {
    setActiveIndex(index);
    setColor(c);
    onChange && onChange(c);
  };

  const handleCustom = (c: string) => {
    setColor(c);
    onChange && onChange(c);
  };

  const handleSetColor = (c: string, type?: string) => {
    const idx = COLOR_LIST.findIndex((i) => i === c);
    if (idx !== -1) {
      setActiveIndex(idx);
      return;
    }

    if (type === 'init') {
      const localIdx = localColors.findIndex((i) => i === c);
      setActiveIndex(24 + localIdx);
      return;
    }

    setActiveIndex(24);
    setLocalColors(c);
  };

  const handleTabs = (tab: string) => {
    if (!color) return;
    if (tab === 'palette') {
      handleSetColor(color);
    }
  };

  useEffect(() => {
    if (!defaultValue) return;
    handleSetColor(defaultValue, 'init');
  }, [defaultValue]);

  return (
    <Tabs className="omb-color-picker" onChange={handleTabs}>
      <TabPane
        className={clsx('color-list-pane', {
          ['has-recent']: localColors.length > 0,
        })}
        tab={t('common:palette')}
        tabKey="palette"
      >
        <div className="color-list">
          {COLOR_LIST.map((i, idx) => {
            return (
              <Tooltip label={i} key={+idx}>
                <div
                  className={clsx('color-item hv-center', {
                    checked: idx === activeIndex,
                  })}
                  onClick={() => handleColor(i, idx)}
                >
                  <span style={{ backgroundColor: i }} />
                </div>
              </Tooltip>
            );
          })}
        </div>
        <div className="recent">
          <h4>{t('common:recent')}</h4>
          <div className="color-list">
            {localColors.map((i, idx) => {
              const _idx = 24 + idx;
              return (
                <Tooltip label={i} key={+idx}>
                  <div
                    className={clsx('color-item hv-center', {
                      checked: _idx === activeIndex,
                    })}
                    onClick={() => handleColor(i, _idx)}
                  >
                    <span style={{ backgroundColor: i }} />
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </TabPane>
      <TabPane
        className="color-picker-pane"
        tab={t('common:custom')}
        tabKey="custom"
      >
        <HexColorPicker
          className="omb-colorpicker"
          color={color}
          onChange={handleCustom}
        />
        <div className="color-input">
          <span>HEX</span> <i>#</i>
          <HexColorInput color={color} onChange={handleCustom} />
        </div>
      </TabPane>
    </Tabs>
  );
};

export default ColorPicker;
