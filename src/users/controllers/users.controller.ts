import {Controller, Post, Get, Param, Put, UseGuards} from "@nestjs/common";
import {UsersService} from "../services/users.service";
import {AuthGuard} from "src/auth/guards/auth.guard";
import {PublicAccess} from "src/decorators/public.decorator";
import {AdminAccess} from "src/decorators/admin.decorator";
import {Token} from "src/decorators/token.decorator";
import {IUserToken} from "src/interfaces/user.interface";

@Controller("users")
@UseGuards(AuthGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@PublicAccess()
	@Post("register")
	public async registerUser(@Token() userToken: IUserToken) {
		return await this.usersService.createUser(userToken);
	}

	@Get("profile")
	public async profile(@Token() userToken: IUserToken) {
		return await this.usersService.findUserByUid(userToken.uid);
	}

	@AdminAccess()
	@Get("all")
	public async findAllUsers() {
		return await this.usersService.findUsers();
	}

	@AdminAccess()
	@Get(":id")
	public async findUserById(@Param("id") id: string) {
		return await this.usersService.findUserById(id);
	}

	@AdminAccess()
	@Put("edit/:id")
	public async updateUser(@Token() userToken: IUserToken) {
		return await this.usersService.updateUser(userToken, userToken.uid);
	}

	@AdminAccess()
	@Put("delete/:id")
	public async deleteUser(@Param("id") id: string) {
		return await this.usersService.deleteUser(id);
	}
}
