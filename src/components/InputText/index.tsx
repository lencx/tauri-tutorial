import { useEffect, useState } from 'react';

import './index.scss';

interface InputTextProps {
  isEdit?: boolean;
  defaultValue?: string;
  onChange?: (val: string) => void;
}

const InputText: React.FC<InputTextProps> = ({
  isEdit,
  defaultValue,
  onChange,
}) => {
  const [editing, setEdit] = useState(isEdit);
  const [val, setValue] = useState(defaultValue);

  useEffect(() => {
    setEdit(isEdit);
  }, [isEdit]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSave = () => {
    setEdit(false);
    if (!val) {
      setValue(defaultValue);
      return;
    }
    onChange && onChange(val);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <span className="omb-input-text">
      {editing ? (
        <input
          value={val}
          type="text"
          autoFocus
          className="text"
          onChange={handleChange}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className="text" onDoubleClick={handleEdit}>
          {val}
        </span>
      )}
    </span>
  );
};

InputText.defaultProps = {
  defaultValue: '',
  isEdit: false,
};

export default InputText;
