import { ApplicationException } from "../common/ApplicationException";

export class CredentialsException extends ApplicationException {
  public constructor(message: string) {
    super("CredentialsException", 400, message);
  }
}
