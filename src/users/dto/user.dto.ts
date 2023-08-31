import {IsNotEmpty, IsString, IsEnum} from "class-validator";
import {ROLES} from "src/constants/roles";

export class UserDTO {
	@IsNotEmpty()
	@IsString()
	uid: string;

	@IsNotEmpty()
	@IsEnum(ROLES)
	role: ROLES;
}

export class UserUpdateDTO {
	/*@IsOptional()
	@IsString()
	firstName: string;
	*/

	@IsNotEmpty()
	@IsString()
	uid: string;

	@IsNotEmpty()
	@IsEnum(ROLES)
	role: ROLES;
}
