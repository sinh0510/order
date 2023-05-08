import { useState } from "react";
import { useEffect } from "react";
import Order, { OrderStatus } from "../../../../models/Order";
import OrderService from "../../../../services/OrderService";
import { CommonListType, useCommonListWrap } from "../../../hooks/useCommonList/useCommonListWrap";

export const PERPAGE = {
	PerPage: 20,
	Admin: 100,
};

export function getListHook(
	props: CommonListType,
	status?: OrderStatus,
	extraStatus?: OrderStatus[],
) {
	const [order, setOrder] = useState<Order[]>([]);
	const [count, setCount] = useState(0);

	const loadData = async (
		inPage: number,
		inPerPage: number,
		status?: number,
		fromDate?: Date,
		toDate?: Date,
		keyWord?: string
	) => {
		props.onBeginLoad?.();

		try {
			const listUserAdmin = async () => {
				const res = await OrderService.getListOrder(
					inPage,
					inPerPage,
					status,
					extraStatus,
					fromDate,
					toDate,
					keyWord
				);
				setOrder(res.orders);
				setCount(res.count);
			};
			await listUserAdmin();
		} catch (err) {
			console.log(err);
		} finally {
			props.onEndLoad?.();
		}
	};

	const reload = () => {
		loadData(
			props.page || 1,
			props?.filterPerPage || PERPAGE.PerPage,
			props?.filterStatus || undefined,
			props?.filterFromDate || undefined,
			props?.filterToDate || undefined,
			props?.filterKeyword || undefined
		);
	};

	useEffect(() => {
		loadData(
			props.page || 1,
			props?.filterPerPage || PERPAGE.PerPage,
			props?.filterStatus || undefined,
			props?.filterFromDate || undefined,
			props?.filterToDate || undefined,
			props?.filterKeyword || undefined,
		);
		
	}, [
		props.page,
		props?.filterPerPage,
		props?.filterStatus || undefined,
		props?.filterFromDate || undefined,
		props?.filterToDate || undefined,
		props?.filterKeyword || undefined,
	]);
	console.log("filterPerPage",props.filterPerPage)
	console.log("filterStatus",props.filterStatus)
	console.log("filterFromDate",props.filterFromDate)
	console.log("filterToDate",props.filterToDate)
	console.log("filterKeyword",props.filterKeyword)

	return {
		order,
		count,
		reload,
	};
}

export function getListHookWrap(
	status?: OrderStatus,
	extraStatus?: OrderStatus[],
) {
	const PerPage = PERPAGE.PerPage;
	return useCommonListWrap(PerPage, (hookProps) =>
		getListHook(hookProps, status, extraStatus)
	);
}
