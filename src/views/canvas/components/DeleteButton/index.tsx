import { Icon } from '@iconify/react/offline';
import deleteIcon from '@iconify-icons/mdi/delete';

interface DeleteButtonProps {
  onClick?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  const handleRemove = (e: React.FormEvent<EventTarget>) => {
    e.stopPropagation();
    onClick && onClick();
  };

  return (
    <span className="omb-ico delete">
      <Icon onClick={handleRemove} icon={deleteIcon} color="var(--red)" />
    </span>
  );
};

export default DeleteButton;
