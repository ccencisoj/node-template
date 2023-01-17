import { ApplicationException } from "../common/ApplicationException";

export class PermissionException extends ApplicationException {
  public constructor(message: string) {
    super("PermissionException", 400, message);
  }
}
