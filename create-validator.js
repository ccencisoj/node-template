const { camelCaseValue, createFile } = require("macrox");

createFile(`./src/validators/${camelCaseValue}.ts`, `
  import { ValidationResult } from "../common/ValidationResult";

  export const ${camelCaseValue} = (value: string): ValidationResult => {
    return ValidationResult.ok();
  }

`);

createFile(`./src/validators/${camelCaseValue}.test.ts`, `
  import { ${camelCaseValue} } from "./${camelCaseValue}";
  
`);
