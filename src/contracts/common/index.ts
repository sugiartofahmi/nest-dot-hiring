export type TMetaResponse = {
  page: number;
  perPage: number;
  total: number;
  totalPage: number;
  prevPage: number | null;
  nextPage: number | null;
};

export type TResponse<T = null | undefined> = {
  data: T;
  message: string;
};

export type TPaginateResponse<T = null | undefined> = {
  data: T;
  meta: TMetaResponse;
};
