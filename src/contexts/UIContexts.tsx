import { useContext, useState, createContext } from 'react';
import { TOAST_TIMOUT, TOAST_TYPE } from '../components/toast/consts';
import { uniqueId } from '../utils/funcs';
import Toast from '../components/toast';

interface UIContextType {
  createToast: (type: TOAST_TYPE, title: string, message: string, timeout?: TOAST_TIMOUT) => void;
}

export const UIContext = createContext<UIContextType>({ createToast: () => {} });

export function useUI() {
  return useContext(UIContext);
}

export default function UIProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const createToast = (
    type: TOAST_TYPE,
    title: string,
    message: string,
    timeout: TOAST_TIMOUT = TOAST_TIMOUT.MEDIUM
  ) => {
    setToasts((pervToasts) => {
      const id = uniqueId();

      return [...pervToasts, { type, title, message, timeout, id }];
    });
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const renderToasts = () => {
    let bottom = 0;

    return toasts.map((toast) => {
      const toastElem = (
        <Toast key={toast.id} {...toast} bottom={bottom} onHide={() => removeToast(toast.id)} />
      );

      if (toast.message) bottom += 90;
      else bottom += 50;

      return toastElem;
    });
  };

  const value = {
    createToast
  };

  return (
    <UIContext.Provider value={value}>
      <div className='full-screen relative'>
        {renderToasts()}
        {children}
      </div>
    </UIContext.Provider>
  );
}
