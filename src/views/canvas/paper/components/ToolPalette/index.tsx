import Tooltip from '@comps/Tooltip';
import ColorPicker from '../ColorPicker';
import './index.scss';

interface ToolbarProps {
  onChange: (key: string, value: any) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onChange }) => {
  const handleChange = (key: string, value: any) => {
    onChange && onChange(key, value);
  };
  return (
    <div className="tool-palette select-none">
      {/* <ColorPicker /> */}
      <Tooltip label="hello">
        <button>test</button>
      </Tooltip>
      <div onClick={() => handleChange('color', 'red')}>color</div>
      <div onClick={() => handleChange('lineWidth', 5)}>width</div>
      <div onClick={() => handleChange('lineStyle', 'xx')}>style</div>
    </div>
  );
};

export default Toolbar;
