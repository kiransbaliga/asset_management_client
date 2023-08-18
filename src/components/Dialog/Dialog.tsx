import { FC, ReactElement, useRef } from 'react';
import './Dialog.css';

export interface DialogStateType {
  show: boolean;
  params?: object;
}

interface DialogProps {
  title: string;
  children?: ReactElement;
  state: DialogStateType;
  setState: (state: DialogStateType) => void;
  successLabel: string;
  cancelLabel?: string;
  onSuccess: (params: any) => void;
  onCancel?: () => void;
}

const Dialog: FC<DialogProps> = ({
  title,
  children,
  state,
  setState,
  successLabel,
  cancelLabel = 'Cancel',
  onSuccess,
  onCancel = () => {}
}) => {
  const dialogRef = useRef();

  const handleSuccess = (e) => {
    e.stopPropagation();
    onSuccess(state.params);
  };
  const handleCancel = (e) => {
    if (dialogRef.current && !(dialogRef.current === e.target)) {
      onCancel();
      setState({ show: false });
    }
  };

  return (
    <>
      {state.show && (
        <div className='dialog-outer center' onClick={handleCancel}>
          <div className='dialog' ref={dialogRef}>
            <h3>{title}</h3>
            <div className='dialog-content'>{children}</div>
            <div className='btn-group'>
              <button className='btn btn-primary' onClick={handleSuccess}>
                {successLabel}
              </button>
              <button className='btn btn-secondary' onClick={handleCancel}>
                {cancelLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
