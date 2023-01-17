import { ApplicationException } from "../common/ApplicationException";

export class TokenException extends ApplicationException {
  public constructor(message: string) {
    super("TokenException", 400, message);
  }
}
