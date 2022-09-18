import { useEffect, useState } from 'react';
import clsx from 'clsx';

import useI18n from '@/hooks/useI18n';
import { setCSS } from '@/utils/color';
import Popover from '@/components/Popover';
import TooltipSlider from '@/components/Slider';
import Tooltip from '@/components/Tooltip';

import BrushIcon from '../BrushIcon';
import EraserIcon from '../EraserIcon';
import ColorPicker from '../ColorPicker';
import SaveIcon from '../SaveIcon';
import './index.scss';

interface ToolPaletteProps {
  onSave: () => void;
  onEraser: (isEraser: boolean) => void;
  onChange: (key: string, value?: any) => void;
}

const ToolPalette: React.FC<ToolPaletteProps> = ({
  onChange,
  onSave,
  onEraser,
}) => {
  const t = useI18n(['common', 'tip']);
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(1);
  const [opacity, setOpacity] = useState(100);
  const [isEraser, setEraser] = useState(false);

  const handleChange = (key: string, value?: any) => {
    onChange && onChange(key, value);
  };

  const handleEraser = () => {
    setEraser(!isEraser);
    onEraser && onEraser(!isEraser);
  };

  const handleSave = () => {
    onSave && onSave();
  };

  const handleColor = (c: string) => {
    setColor(c);
    handleChange('color', c);
    setCSS('brush-color', c);
  };

  const handleSize = (v: any) => {
    setSize(v);
    const brushSize = +((1 / 10) * (v as number)).toFixed(2);
    setCSS('brush-size', `${Math.PI + brushSize}pt`);
    handleChange('size', brushSize * 0.75);
  };

  const handleOpacity = (v: any) => {
    v = v + 1;
    setOpacity(v);
    setCSS('brush-opacity', v / 100);
    handleChange('opacity', v / 1000);
  };

  useEffect(() => {
    setCSS('brush-color', '#000000');
    handleSize(1);
  }, []);

  return (
    <div className="tool-palette select-none flex-col">
      <Popover
        className="color-popover"
        placement="right-start"
        render={() => (
          <ColorPicker onChange={handleColor} defaultValue={color} />
        )}
      >
        <button className="color-btn" style={{ backgroundColor: color }} />
      </Popover>
      <Popover
        className="brush-popover"
        placement="right-start"
        render={() => (
          <div className="flex items-center">
            <div>
              <div>
                <div className="brush-info">{t('common:size')}</div>
                <TooltipSlider
                  style={{ width: 150 }}
                  max={100}
                  tipFormatter={(v) => v}
                  onChange={handleSize}
                  value={size}
                />
              </div>
              <div>
                <div className="brush-info">{t('common:opacity')}</div>
                <TooltipSlider
                  style={{ width: 150 }}
                  max={100}
                  tipFormatter={(v) => v}
                  onChange={handleOpacity}
                  value={opacity}
                />
              </div>
            </div>
            <div className="preview hv-center">
              <span
                style={{
                  width: `var(--omb-brush-size)`,
                  height: `var(--omb-brush-size)`,
                  backgroundColor: `var(--omb-brush-color)`,
                  opacity: `var(--omb-brush-opacity)`,
                }}
              />
            </div>
          </div>
        )}
      >
        <button className="brush-btn">
          <BrushIcon />
        </button>
      </Popover>
      <div className="omb-tool-line" />
      <div
        className={clsx('eraser-btn', { active: isEraser })}
        onClick={handleEraser}
      >
        <EraserIcon />
      </div>
      <Tooltip sys label={t('tip:save')}>
        <button className={clsx('save-btn')} onClick={handleSave}>
          <SaveIcon />
        </button>
      </Tooltip>
    </div>
  );
};

export default ToolPalette;
