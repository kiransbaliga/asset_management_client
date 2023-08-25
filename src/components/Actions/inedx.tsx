import { FC } from 'react';
import './style.css';
import Icon from '../icon';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface ActionsProps {
  onDelete?: () => void;
  onEdit?: () => void;
}

const Actions: FC<ActionsProps> = ({ onDelete, onEdit }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit();
  };

  return (
    <div className='flex-row'>
      {onDelete && (
        <div id='delete' className='action-delete' onClick={handleDelete}>
          <a data-tooltip-id='my-tooltip' data-tooltip-content='Delete' data-tooltip-place='top'>
            <Icon className='text-danger' icon={faTrash} />
          </a>
        </div>
      )}
      {onEdit && (
        <div className='action-primary' onClick={handleEdit}>
          <a data-tooltip-id='my-tooltip' data-tooltip-content='Edit' data-tooltip-place='top'>
            <Icon className='text-primary' icon={faEdit} />
          </a>
        </div>
      )}
    </div>
  );
};

export default Actions;
