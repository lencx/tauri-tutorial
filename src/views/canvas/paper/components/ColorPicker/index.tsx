import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { RgbaColorPicker } from 'react-colorful';
import includes from 'lodash/includes';

import Tooltip from '@comps/Tooltip';
import useI18n from '@hooks/useI18n';
import useLocalColor from '@hooks/useLocalColor';
import { rgb2hex, hex2rgba, fmtRgba, rgba2obj } from '@utils/color';
import type { RGBAObj } from '@utils/color';
import Tabs from '@comps/Tabs';
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
  onChange?: (color: RGBAObj) => void;
  defaultValue?: RGBAObj;
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
    const cObj = hex2rgba(c);
    setActiveIndex(index);
    setColor(cObj);
    onChange && onChange(cObj);
  };

  const handleRecentColor = (c: string, index: number) => {
    const cObj = rgba2obj(c);
    setActiveIndex(index);
    setColor(cObj);
    onChange && onChange(cObj);
  };

  const handleCustom = (cObj: any) => {
    setColor(cObj);
    onChange && onChange(cObj);
  };

  const handleSetColor = (c: RGBAObj) => {
    const _color = rgb2hex(c.r, c.g, c.b);
    if (c.a === 1) {
      const idx = COLOR_LIST.findIndex((i) => i === _color);
      setActiveIndex(idx);
    }
    if (c.a !== 1 || !includes(COLOR_LIST, _color)) {
      setActiveIndex(24);
      setLocalColors(fmtRgba(c));
    }
  };

  const handleTabs = (tab: string) => {
    if (!color) return;
    if (tab === 'palette') {
      handleSetColor(color);
    }
  };

  useEffect(() => {
    let hasIndx = false;
    if (defaultValue?.a === 1) {
      const _color = rgb2hex(defaultValue.r, defaultValue.g, defaultValue.b);
      const idx = COLOR_LIST.findIndex((i) => i === _color);
      if (idx !== -1) {
        setActiveIndex(idx);
        hasIndx = true;
      }
    }
    if (!hasIndx) {
      const _color = fmtRgba(defaultValue as RGBAObj);
      const idx = localColors.findIndex((i) => i === _color);
      if (idx !== -1) {
        setActiveIndex(24 + idx);
      } else {
        setActiveIndex(24);
        setLocalColors(fmtRgba(defaultValue as RGBAObj));
      }
    }
  }, []);

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
                    onClick={() => handleRecentColor(i, _idx)}
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
        <RgbaColorPicker
          className="omb-colorpicker"
          color={color}
          onChange={handleCustom}
        />
        <div className="color-text">
          {fmtRgba(color as RGBAObj)?.toLocaleUpperCase()}
        </div>
      </TabPane>
    </Tabs>
  );
};

export default ColorPicker;
