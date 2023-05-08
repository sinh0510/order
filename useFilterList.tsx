import * as React from "react";
import { useEffect, useState } from "react";
import { SelectOptionType } from "react-select";
import { OrderStatus, OrderStatusLabelMapv2 } from "../../../../models/Order";
import useCommonListFunctions from "../../../hooks/useCommonList/useCommonListFunctions";

export const statusList: SelectOptionType[] = [
	{ label: "Tất cả trạng thái", value: "0", object: "" },
	{
		label: OrderStatusLabelMapv2.get(OrderStatus.Purchased) || "",
		value: `${OrderStatus.Purchased.toString()},${OrderStatus.TemporarySettled.toString()}`,
		object: "",
	},
	{ label: OrderStatusLabelMapv2.get(OrderStatus.Settled) || "", value: OrderStatus.Settled.toString(), object: "" },
	{
		label: OrderStatusLabelMapv2.get(OrderStatus.Canceled) || "",
		value: OrderStatus.Canceled.toString(),
		object: "",
	},
];

export default function useFilterList() {
	const { filterStatus } = useCommonListFunctions();

	const filterInitial = (listVal: SelectOptionType[], compareVal: string) => {
		const result = listVal.filter((item) => {
			return item.value === compareVal;
		});
		if (result) return result[0];
		else return listVal[0];
	};

	const [statusSelected, setStatusSelected] = useState<SelectOptionType>(() =>
		filterInitial(statusList, filterStatus?.toString() || "")
	);
	return {
		statusSelected,
		setStatusSelected,
	};
}
