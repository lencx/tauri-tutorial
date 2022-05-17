import { useState } from 'react';

import Popover from '@comps/Popover';
import type { RGBAObj } from '@utils/color';
import { fmtRgba } from '@utils/color';

import ColorPicker from '../ColorPicker';
import './index.scss';

interface ToolPaletteProps {
  onChange: (key: string, value?: any) => void;
}

const ToolPalette: React.FC<ToolPaletteProps> = ({ onChange }) => {
  const [color, setColor] = useState<RGBAObj>({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });

  const handleChange = (key: string, value?: any) => {
    onChange && onChange(key, value);
  };

  const handleColor = (v: RGBAObj) => {
    setColor(v);
    handleChange('color', fmtRgba(v));
  };

  return (
    <div className="tool-palette select-none">
      {/* <div onClick={() => handleChange('color', 'red')}>color</div>
      <div onClick={() => handleChange('lineWidth', 5)}>width</div>
      <div onClick={() => handleChange('lineStyle', 'xx')}>style</div>
      <div onClick={() => handleChange('save')}>save</div> */}
      <Popover
        className="color-popover"
        placement="right-start"
        render={() => (
          <ColorPicker onChange={handleColor} defaultValue={color} />
        )}
      >
        <button
          className="color-btn"
          style={{ backgroundColor: fmtRgba(color) }}
        />
      </Popover>
    </div>
  );
};

export default ToolPalette;
