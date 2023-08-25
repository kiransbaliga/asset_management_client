import { FC, ReactNode, useRef } from 'react';
import './Dialog.css';
import Button from '../button';

export interface DialogStateType {
  show: boolean;
  params?: object;
}

interface DialogProps {
  title: string;
  children?: ReactNode;
  state: DialogStateType;
  setState: (state: DialogStateType) => void;
  successLabel: string;
  cancelLabel?: string;
  onSuccess: (params: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const Dialog: FC<DialogProps> = ({
  title,
  children,
  state,
  setState,
  successLabel,
  cancelLabel = 'Cancel',
  isLoading = false,
  onSuccess,
  onCancel = () => {}
}) => {
  const dialogRef = useRef();

  const handleSuccess = (e) => {
    e.stopPropagation();
    onSuccess(state.params);
  };
  const handleCancel = () => {
    onCancel();
    setState({ show: false });
  };

  return (
    <>
      {state.show && (
        <div className='dialog-outer center'>
          <div className='dialog' ref={dialogRef}>
            <h3>{title}</h3>
            <div className='dialog-content'>{children}</div>
            <div className='dialog-footer btn-group'>
              <Button
                className='btn btn-primary'
                onClick={handleSuccess}
                text={successLabel}
                loading={isLoading}
              />
              <Button className='btn btn-secondary' onClick={handleCancel} text={cancelLabel} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
