export interface ResponseDataType {
  status: number;
  data: object;
  message: string;
  errors: object | null;
  meta: {
    length: number;
    took: number;
    total: number;
  };
}

export interface ResponseDataListType {
  status: number;
  data: object[];
  message: string;
  errors: object | null;
  meta: {
    length: number;
    took: number;
    total: number;
  };
}
