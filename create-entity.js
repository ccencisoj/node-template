const { camelCaseValue, capitalizedValue, createFile } = require("macrox");

createFile(`./src/entities/${capitalizedValue}.ts`, `
  import { IEntity } from "../common/IEntity";

  export interface ${capitalizedValue} extends IEntity { }

`);

createFile(`./src/mappers/${capitalizedValue}Mapper.ts`, `
  import { ${capitalizedValue} } from "../entities/${capitalizedValue}";

  export class ${capitalizedValue}Mapper {
    public static toJSON = (${camelCaseValue}: ${capitalizedValue})=> {
      return {
        id: ${camelCaseValue}.id,
        createdAt: ${camelCaseValue}.createdAt,
        updatedAt: ${camelCaseValue}.updatedAt,
        deletedAt: ${camelCaseValue}.deletedAt,
        isDeleted: ${camelCaseValue}.isDeleted
      }
    }
  }

`);

createFile(`./src/repositories/${capitalizedValue}Repository.ts`, `
  import { Schema, model } from "mongoose";
  import { ${capitalizedValue} } from "../entities/${capitalizedValue}";
  import { MongoRepository } from "../common/MongoRepository";

  const ${capitalizedValue}Schema = new Schema<${capitalizedValue}>({
    id: {type: String, required: true},
    createdAt: {type: String, required: true},
    updatedAt: {type: String, required: true},
    deletedAt: {type: String, required: false},
    isDeleted: {type: Boolean, required: true}
  })

  const ${capitalizedValue}Model = model("${capitalizedValue}", ${capitalizedValue}Schema);

  const searchQuery = (searchValue: string)=> ({});

  const options = {limit: 50, searchQuery};

  const ${capitalizedValue}Repository = new MongoRepository<${capitalizedValue}>(${capitalizedValue}Model, options);

  export { ${capitalizedValue}Repository };

`);
