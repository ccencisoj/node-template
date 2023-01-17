export type Pagination = {
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
  hasNextPage: boolean;
  nextPage: number;
  hasPrevPage: boolean;
  prevPage: number;
}
