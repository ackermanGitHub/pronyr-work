import {Column, Entity} from "typeorm";
import {IProduct} from "../../interfaces/product.interface";
import {BaseEntity} from "../../config/base.entity";

@Entity({name: "products"})
export class ProductsEntity extends BaseEntity implements IProduct {
	@Column()
	name: string;

	@Column()
	description: string;
}
