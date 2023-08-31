import {Column, Entity} from "typeorm";
import {IUser, IShippingInfo, IUserToken, IPaymentInfo} from "../../interfaces/user.interface";
import {BaseEntity} from "../../config/base.entity";
import {ROLES} from "../../constants/roles";

@Entity({name: "users"})
export class UserEntity extends BaseEntity implements IUser {
	constructor(user: Partial<IUserToken>) {
		super();
		Object.assign(this, user);
	}

	@Column({unique: true, primary: true})
	uid: string;

	@Column({unique: true})
	email: string;

	@Column({nullable: true})
	name: string;

	@Column({nullable: true})
	lastName: string;

	@Column({unique: true, nullable: true})
	phone: string;

	@Column({type: "jsonb", nullable: true})
	shippingInfo: IShippingInfo;

	@Column({type: "jsonb", nullable: true})
	paymentInfo: IPaymentInfo;

	// requires admin permissions to edit
	@Column({type: "enum", enum: ROLES, default: ROLES.CLIENT})
	role: ROLES;

	@Column({nullable: true})
	credit: number;

	@Column({nullable: true})
	active: boolean;
}
