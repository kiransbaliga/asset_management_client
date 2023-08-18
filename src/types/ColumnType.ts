import { ReactElement } from 'react';

interface ColumnType {
  label: string;
  key: string;
  adapter?: (value: any) => ReactElement;
}

export default ColumnType;
