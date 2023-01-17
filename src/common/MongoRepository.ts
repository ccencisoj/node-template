import { Model } from "mongoose";
import { IEntity } from "./IEntity";
import { Pagination } from "./Pagination";
import { IRepository } from "./IRepository";
import { createPagination } from "../helpers/createPagination";

type SearchQuery = (searchValue: string)=> (object);

type Options = {limit?: number, searchQuery?: SearchQuery};

export class MongoRepository<Entity extends IEntity> implements IRepository<Entity> {
  public readonly model: Model<Entity>;
  public readonly options: Options;
  
  public constructor(model: Model<Entity>, options: Options) {
    this.model = model;
    this.options = options;
  }
  
  public save = async (entity: Entity): Promise<void> => {
    const repoEntity = await this.findOne({id: entity.id});
    const entityAlreadyCreated = !!repoEntity;
    
    if(entityAlreadyCreated) {
      await this.model.updateOne({id: entity.id}, entity);
      
    }else {
      await this.model.create(entity);
    }
  }

  public findOne = async (filter: any): Promise<Entity> => {
    const entity = await this.model.findOne({isDeleted: false, ...filter});

    return entity ?  entity.toObject<Entity>() : null;
  }

  public findMany = async (filter: any, page?: number, searchValue?: string): Promise<Entity[]> => {
    page = page ? page : 1;

    const limit = this.options.limit || 50;
    const skip = (page - 1) * limit;

    let searchQuery = {};

    if(this.options.searchQuery && searchValue) {
      searchQuery = this.options.searchQuery(searchValue);
    }
        
    const entities = await this.model.find({
      isDeleted: false, 
      ...filter, 
      ...searchQuery
    })
      .skip(skip)
      .limit(limit);

    return entities.map((entity)=> entity.toObject<Entity>());
  }

  public paginate = async (filter: any, page?: number, searchValue?: string): Promise<Pagination> => {
    page = page ? page : 1;

    const limit = this.options.limit || 50;

    let searchQuery = {};

    if(this.options.searchQuery && searchValue) {
      searchQuery = this.options.searchQuery(searchValue);
    }

    const totalDocs = await this.model.find({
      isDeleted: false, 
      ...filter, 
      ...searchQuery
    })
      .count();

    const pagination = createPagination(page, limit, totalDocs);

    return pagination;
  }
}
