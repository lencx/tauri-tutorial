import { useState } from 'react';
import { message } from '@tauri-apps/api/dialog';
import { Icon } from '@iconify/react/offline';
import folderPlusIcon from '@iconify-icons/mdi/folder-plus';

import { ignoreFile } from '@/utils/tools';
import useI18n from '@/hooks/useI18n';

import './index.scss';

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
    <div className="omb-add-dir">
      <Icon
        className="omb-hover"
        onClick={handleAdd}
        icon={folderPlusIcon}
        fontSize={18}
        color="var(--blue)"
      />
      {addEditing && (
        <input
          autoFocus
          autoComplete="off"
          className="ml2"
          value={addValue}
          onChange={handleInput}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

export default AddDirButton;
