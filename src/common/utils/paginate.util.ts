import { PaginateRequest, TMetaResponse } from 'src/contracts/common';

export class PaginateUtil {
  readonly page: number = 1;
  readonly perPage: number = 10;

  getCountOffset(request: PaginateRequest): number {
    const page = request?.page || this.page;
    const perPage = request?.perPage || this.perPage;

    return (page - 1) * perPage;
  }
  getMeta(count: number, request: PaginateRequest): TMetaResponse {
    const page = request?.page ?? this.page;
    const perPage = request?.perPage ?? this.perPage;
    const totalPage = Math.ceil(count / perPage);
    const nextPage = page < totalPage ? Number(page) + 1 : null;
    const prevPage = page > 1 ? Number(page - 1) : null;

    return {
      page: page,
      perPage: perPage,
      total: count,
      totalPage,
      nextPage,
      prevPage,
    };
  }
}
