import { useState } from 'react';
import Popover from '@comps/Popover';

import ColorPicker from '../ColorPicker';
import './index.scss';

interface ToolbarProps {
  onChange: (key: string, value?: any) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onChange }) => {
  const [color, setColor] = useState('#000');
  const handleChange = (key: string, value?: any) => {
    onChange && onChange(key, value);
  };
  return (
    <div className="tool-palette select-none">
      {/* <div onClick={() => handleChange('color', 'red')}>color</div>
      <div onClick={() => handleChange('lineWidth', 5)}>width</div>
      <div onClick={() => handleChange('lineStyle', 'xx')}>style</div>
      <div onClick={() => handleChange('save')}>save</div> */}
      <Popover
        placement="right"
        className="color-popover"
        render={({ close }) => (
          <>
            <ColorPicker onChange={(val) => setColor(val)} />
            {/* <button onClick={close}>Submit</button> */}
          </>
        )}
      >
        <div className="color-btn" style={{ backgroundColor: color }} />
      </Popover>
    </div>
  );
};

export default Toolbar;
