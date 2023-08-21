import RequestType from "./RequestType";

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

export interface requestResponseType {
  status: number;
  data: RequestType;
  message: string;
  errors: object | null;
  meta: {
    length: number;
    took: number;
    total: number;
  };
}
