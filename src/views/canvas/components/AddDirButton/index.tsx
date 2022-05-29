import { useState } from 'react';
import { message } from '@tauri-apps/api/dialog';

import { ignoreFile } from '@utils/tools';
import useI18n from '@hooks/useI18n';

interface AddDirButtonProps {
  onAdd: (name: string) => Promise<void>;
}

const AddDirButton: React.FC<AddDirButtonProps> = ({ onAdd }) => {
  const t = useI18n(['rules']);
  const [addEditing, setAddEdit] = useState(false);
  const [addValue, setAddValue] = useState('');

  const handleAdd = () => {
    setAddEdit(true);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddValue(e.target.value);
  };

  const handleSave = async () => {
    if (ignoreFile(addValue)) {
      message(t('rules:check-name'));
      return;
    }
    setAddEdit(false);
    if (!addValue) return;
    await onAdd(addValue);
    setAddValue('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div>
      <button onClick={handleAdd}>+</button>
      {addEditing && (
        <div>
          <input
            autoFocus
            value={addValue}
            onChange={handleInput}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}
    </div>
  );
};

export default AddDirButton;
