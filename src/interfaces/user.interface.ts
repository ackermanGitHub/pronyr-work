export interface IShippingInfo {
	address: string;
	city: string;
	state: string;
	zip: string;
	country: string;
}

export interface IPaymentInfo {
	cardNumber: string;
	cardHolder: string;
	expirationDate: string;
	securityCode: string;
}

export interface IUserToken {
	uid: string;
	email: string;
}

export interface IUser {
	uid: string;
	role: string;
	name: string;
	lastName: string;
	email: string;
	phone: string;
	credit: number;
	active: boolean;
	shippingInfo: IShippingInfo;
	paymentInfo: IPaymentInfo;
}
