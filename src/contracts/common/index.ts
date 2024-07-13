import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const PaginateSchema = z.object({
  perPage: z.coerce.number().min(1).default(15).optional(),
  page: z.coerce.number().min(1).default(1).optional(),
});

export class PaginateRequest extends createZodDto(PaginateSchema) {}

export type TMetaResponse = {
  page: number;
  perPage: number;
  total: number;
  totalPage: number;
  prevPage: number | null;
  nextPage: number | null;
};

export type TResponse<T = null | undefined> = {
  data?: T;
  message?: string;
};

export type TPaginateResponse<T = null | undefined> = {
  data: T[];
  meta: TMetaResponse;
};
