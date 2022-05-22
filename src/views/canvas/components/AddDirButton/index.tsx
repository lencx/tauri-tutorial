import { useState } from 'react';

interface AddDirButtonProps {
  onAdd: (name: string) => Promise<void>;
}

const AddDirButton: React.FC<AddDirButtonProps> = ({ onAdd }) => {
  const [addEditing, setAddEdit] = useState(false);
  const [addValue, setAddValue] = useState('');

  const handleAdd = () => {
    setAddEdit(true);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddValue(e.target.value);
  };

  const handleSave = async () => {
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
