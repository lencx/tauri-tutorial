import clsx from 'clsx';
import { Icon } from '@iconify/react/offline';
import deleteIcon from '@iconify-icons/mdi/delete-outline';

interface DeleteButtonProps {
  className?: string;
  onClick?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ className, onClick }) => {
  const handleRemove = (e: React.FormEvent<EventTarget>) => {
    e.stopPropagation();
    onClick && onClick();
  };

  return (
    <span className={clsx('omb-ico delete', className)} onClick={handleRemove}>
      <Icon icon={deleteIcon} color="var(--red)" />
    </span>
  );
};

export default DeleteButton;
