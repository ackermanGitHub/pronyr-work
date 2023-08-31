import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {ADMIN_KEY, PUBLIC_KEY} from "src/constants/key-decorators";
import {ROLES} from "src/constants/roles";
import {UsersService} from "src/users/services/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly userService: UsersService, private readonly reflector: Reflector) {}
	async canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
		if (isPublic) {
			return true;
		}

		const req = context.switchToHttp().getRequest<Request>();
		if (!req["user"] || !req["user"].uid) {
			throw new UnauthorizedException("Invalid token");
		}

		const isAdmin = this.reflector.get<boolean>(ADMIN_KEY, context.getHandler());
		if (isAdmin) {
			const user = await this.userService.findUserByUid(req["user"].uid);
			if (user.role === ROLES.ADMIN) {
				return true;
			} else {
				throw new UnauthorizedException("Invalid user");
			}
		}

		return true;
	}
}
