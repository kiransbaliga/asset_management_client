import { useState } from 'react';

const useForm = <T>(initialData: T): [T, (field: string | object, value?: any) => void] => {
  const [data, setData] = useState<T>(initialData);

  const handleSet = (field: string | object, value?: any) => {
    switch (typeof field) {
      case 'object':
        setData(field as T);
        break;
      case 'string':
        setData((prevData) => ({ ...prevData, [field]: value }));
    }
  };

  return [data, handleSet];
};

export default useForm;
