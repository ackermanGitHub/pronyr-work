import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/users.entity";
import {ErrorManager} from "src/utils/error.manager";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {IUser, IUserToken} from "src/interfaces/user.interface";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	public async createUser(userToken: IUserToken): Promise<UserEntity> {
		try {
			const newUser = new UserEntity(userToken);
			return await this.userRepository.save(newUser);
		} catch (error) {
			throw ErrorManager.createSignatureError(error.message);
		}
	}

	public async findUsers(): Promise<UserEntity[]> {
		try {
			const users: UserEntity[] = await this.userRepository.find();
			if (users.length === 0) {
				throw new ErrorManager({
					type: "BAD_REQUEST",
					message: "No se encontro resultado",
				});
			}
			return users;
		} catch (error) {
			throw ErrorManager.createSignatureError(error.message);
		}
	}

	public async findUserById(id: string): Promise<UserEntity> {
		try {
			const user: UserEntity = await this.userRepository.createQueryBuilder("user").where({id}).getOne();
			if (!user) {
				throw new ErrorManager({
					type: "BAD_REQUEST",
					message: "No se encontro resultado",
				});
			}
			return user;
		} catch (error) {
			throw ErrorManager.createSignatureError(error.message);
		}
	}

	public async findUserByUid(uid: string): Promise<UserEntity> {
		try {
			const user = await this.userRepository.createQueryBuilder("user").where({uid}).getOne();

			console.log(JSON.stringify(user, null, 2));

			if (!user) {
				throw new ErrorManager({
					type: "BAD_REQUEST",
					message: "No se encontro resultado",
				});
			}
			return user;
		} catch (error) {
			throw ErrorManager.createSignatureError(error.message);
		}
	}

	public async findBy({key, value}: {key: keyof IUser; value: any}) {
		try {
			const user = await this.userRepository
				.createQueryBuilder("user")
				.addSelect("user.password")
				.where({[key]: value})
				.getOne();

			return user;
		} catch (error) {
			throw ErrorManager.createSignatureError(error.message);
		}
	}

	public async updateUser(userToken: IUserToken, id: string): Promise<UpdateResult | undefined> {
		try {
			const user: UpdateResult = await this.userRepository.update(id, userToken);
			if (user.affected === 0) {
				throw new ErrorManager({
					type: "BAD_REQUEST",
					message: "No se pudo actualizar",
				});
			}
			return user;
		} catch (error) {
			throw ErrorManager.createSignatureError(error.message);
		}
	}

	public async deleteUser(id: string): Promise<DeleteResult | undefined> {
		try {
			const user: DeleteResult = await this.userRepository.delete(id);
			if (user.affected === 0) {
				throw new ErrorManager({
					type: "BAD_REQUEST",
					message: "No se pudo borrar",
				});
			}
			return user;
		} catch (error) {
			throw ErrorManager.createSignatureError(error.message);
		}
	}
}
