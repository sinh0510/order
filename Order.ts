import IModel from "./IModel";
import User from "./User";

export enum OrderStatus {
	Purchased = 2,
	Settled = 3,
	Canceled = 4,
	TemporarySettled = 5,
}

export const OrderStatusLabelMap = new Map([
	[OrderStatus.Purchased, "Đã mua"],
	[OrderStatus.Settled, "Đã chốt"],
	[OrderStatus.Canceled, "Đã hủy"],
	[OrderStatus.TemporarySettled, "Đã mua"],
]);
export const OrderStatusLabelMapv2 = new Map([
	[OrderStatus.Purchased, "Đang xử lý"],
	[OrderStatus.Settled, "Đã nhận chiết khấu"],
	[OrderStatus.Canceled, "Đã hủy đơn"],
	[OrderStatus.TemporarySettled, "Đang xử lý"],
]);
export const OrderStatusLabelMapv2Res = new Map([
	[OrderStatus.Purchased, "Đang xử lý"],
	[OrderStatus.Settled, "Đã nhận CK"],
	[OrderStatus.Canceled, "Đã hủy đơn"],
	[OrderStatus.TemporarySettled, "Đang xử lý"],
]);

OrderStatusLabelMap.get(OrderStatus.Purchased);

export default class Order implements IModel<Order> {
	id?: number | null;
	taobaoOrderId?: string | null;
	adzoneId?: string | null;
	promotionId?: string | null;
	productId?: string | null;
	userId?: string | null;
	productName?: string | null;
	productImg?: string | null;
	productAllImgs?: string[] | null;
	recalledAt?: Date | null;
	settledAt?: Date | null;
	createdAt?: Date | null;
	expiredAt?: Date | null;
	isExpired?: boolean | null;
	totalPrice?: number | null;
	paidAmount?: number | null;
	rebateAmount?: number | null;
	rebateRate?: number | null;
	originalRebateAmount?: number | null;
	originalRebateRate?: number | null;
	status?: OrderStatus | null;
	productQuantity?: number | null;
	category?: string | null;
	user?: User | null;

	constructor(input?: Partial<Order>) {
		this.id = input?.id;
		this.taobaoOrderId = input?.taobaoOrderId;
		this.adzoneId = input?.adzoneId;
		this.promotionId = input?.promotionId;
		this.productId = input?.productId;
		this.userId = input?.userId;
		this.productName = input?.productName;
		this.productImg = input?.productImg;
		this.productAllImgs = input?.productAllImgs;
		this.recalledAt = input?.recalledAt;
		this.settledAt = input?.settledAt;
		this.createdAt = input?.createdAt;
		this.expiredAt = input?.expiredAt;
		this.isExpired = input?.isExpired;
		this.totalPrice = input?.totalPrice || 0;
		this.paidAmount = input?.paidAmount || 0;
		this.rebateAmount = input?.rebateAmount || 0;
		this.rebateRate = input?.rebateRate || 0;
		this.originalRebateAmount = input?.originalRebateAmount || 0;
		this.originalRebateRate = input?.originalRebateRate || 0;
		this.status = input?.status;
		this.productQuantity = input?.productQuantity || 0;
		this.category = input?.category;
		this.user = input?.user;
	}

	parse(json?: any): Order {
		if (!json) return this;

		let status: OrderStatus | null = null;
		switch (json.status) {
			case 2:
				status = OrderStatus.Purchased;
				break;
			case 3:
				status = OrderStatus.Settled;
				break;
			case 4:
				status = OrderStatus.Canceled;
				break;
			case 5:
				status = OrderStatus.TemporarySettled;
				break;
		}

		Object.assign(this, {
			...json,
			id: json.id,
			taobaoOrderId: json.taoOrderId,
			productId: json.taoProductId,
			adzoneId: json.adzoneId + "",
			status: status,
			productName: json.productTitle,
			productImg: json.image,
			productAllImgs: json.allImages ? json.allImages.split(";") : [],
			productQuantity: json.quantity || 0,
			paidAmount: json.totalPaidAmount || 0,
			originalRebateRate: json.originalCommissionRate || 0,
			originalRebateAmount: json.originalCommissionAmount || 0,
			rebateRate: json.commissionRate || 0,
			rebateAmount: json.commissionAmount || 0,
			recalledAt: json.recalledAt && new Date(json.recalledAt),
			settledAt: json.settledAt && new Date(json.settledAt),
			createdAt: json.createdAt && new Date(json.createdAt),
			user: json.user ? new User().parse(json.user) : null,
		});

		return this;
	}

	clone(): Order {
		return new Order({
			...this,
		});
	}
}
