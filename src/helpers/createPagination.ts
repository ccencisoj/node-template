import { Pagination } from "../common/Pagination";

export const createPagination = (page: number, limit: number, totalDocs: number): Pagination => {
  const totalPages = Math.floor((totalDocs - 1)/limit) + 1;
  const hasPrevPage = !(page === 1);
  const hasNextPage = !(page === totalPages);
  const prevPage = hasPrevPage ? page - 1 : null;
  const nextPage = hasNextPage ? page + 1 : null;
  
  return { page, limit, totalDocs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage };
}
