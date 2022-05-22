import React, { useEffect, useState } from 'react';

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
    if (!val) return;
    setEdit(false);
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

  return editing ? (
    <input
      value={val}
      type="text"
      onChange={handleChange}
      onBlur={handleSave}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span onDoubleClick={handleEdit}>{val}</span>
  );
};

InputText.defaultProps = {
  defaultValue: '',
  isEdit: false,
};

export default InputText;
