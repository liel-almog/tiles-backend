import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { Observable } from "rxjs";

const validateRequest = async (request: any): Promise<boolean> => {
  if (!request?.cookies?.token) {
    return false;
  }

  try {
    const user = jwt.verify(request.cookies.token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    request.user = user;
  } catch (error: any) {
    throw new UnauthorizedException();
  }

  return true;
};

@Injectable()
export class AuthJwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
