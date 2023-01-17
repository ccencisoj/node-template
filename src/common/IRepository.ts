import { Pagination } from "./Pagination";

export interface IRepository<Entity> {
  save(entity: Entity): Promise<void>;
  findOne(filter: any): Promise<Entity>;
  findMany(filter: any, page?: number, searchValue?: string): Promise<Entity[]>;
  paginate(filter: any, page?: number, searchValue?: string): Promise<Pagination>;
}
