const { value, toCamelCaseValue, toCapitalizedValue, createFile } = require("macrox");

const deep = value.includes("/") ? "../../../" : "../../";
const dirname = value.includes("/") ? value.split("/")[0] : "";
const camelCaseValue = value.includes("/") ? toCamelCaseValue(value.split("/")[1]) : toCamelCaseValue(value);
const capitalizedValue = value.includes("/") ? toCapitalizedValue(value.split("/")[1]) : toCapitalizedValue(value);

createFile(`./src/useCases/${dirname}/${capitalizedValue}/${capitalizedValue}.ts`, `
  import { ${capitalizedValue}DTO } from "./${capitalizedValue}DTO";
  import { ${capitalizedValue}Guard } from "./${capitalizedValue}Guard";
  import { ValidationResult } from "${deep}common/ValidationResult";
  import { ValidationException } from "${deep}exceptions/ValidationException";

  type Response = Promise<void>;

  export class ${capitalizedValue} {
    public static execute = async (dto: ${capitalizedValue}DTO): Response => {
      // Check permissions
      await ${capitalizedValue}Guard.check(dto);

      // Validate dto values
      const validationResult = ValidationResult.combine([]);
      
      if(validationResult.isError) {
        throw new ValidationException(validationResult.error);
      }
    }
  }

`);


createFile(`./src/useCases/${dirname}/${capitalizedValue}/${capitalizedValue}DTO.ts`, `
  export interface ${capitalizedValue}DTO {
    token: string;
  }

`);

createFile(`./src/useCases/${dirname}/${capitalizedValue}/${capitalizedValue}Controller.ts`, `
  import { Request, Response } from "express";
  import { ${capitalizedValue} } from "./${capitalizedValue}";
  import { ${capitalizedValue}DTO } from "./${capitalizedValue}DTO";
  import { getTokenFromRequest } from "${deep}helpers/getTokenFromRequest";
  import { handleControllerError } from "${deep}helpers/handleControllerError";

  export class ${capitalizedValue}Controller {
    public static execute = async (req: Request, res: Response): Promise<void> => {
      try {
        const reqToken = getTokenFromRequest(req);

        const reqData = {
          token: reqToken
        } as ${capitalizedValue}DTO;

        await ${capitalizedValue}.execute(reqData);

        res.json({success: true});

      }catch(error) {
        handleControllerError(req, res, error);
      }
    }
  }

`);

createFile(`./src/useCases/${dirname}/${capitalizedValue}/${capitalizedValue}Guard.ts`, `
  import { ${capitalizedValue}DTO } from "./${capitalizedValue}DTO";
  import { hasPermission } from "${deep}helpers/hasPermission";
  import { PermissionException } from "${deep}exceptions/PermissionException";

  type Response = Promise<void>;

  export class ${capitalizedValue}Guard {
    public static check = async (dto: ${capitalizedValue}DTO): Response => {
      // Check that the token has '${capitalizedValue}' permissión
      const ${camelCaseValue}Permission = \`${capitalizedValue}\`;
      const has${capitalizedValue}Permission = await hasPermission(dto.token, ${camelCaseValue}Permission);

      if(!has${capitalizedValue}Permission) {
        throw new PermissionException(${camelCaseValue}Permission);
      }
    }
  }

`);

createFile(`./src/useCases/${dirname}/${capitalizedValue}/README.md`, `
  # ${capitalizedValue}

  Aqui va una descripción...

  ${"```"}typescript 
  ${capitalizedValue}.execute(dto: ${capitalizedValue}DTO): Promise<void>;
  ${"```"}

`);

createFile(`./src/useCases/${dirname}/${capitalizedValue}/${capitalizedValue}.http`, ``);
