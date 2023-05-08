import React, { useEffect, useState } from "react";
import { FilterOrder, OrderFilterBox, OrderFilterBoxDate } from "./styled/StyledOrderManagement";
import DateRangeInputOrder from "../../controls/components/dateRangeInput/DateRangeInputv2";
import { SelectOptionType } from "react-select";
import { SmSelectSearchBoxOrder } from "../../controls/components/selectSearchBox/SelectSearchBox";
import useCommonListFunctions from "../../hooks/useCommonList/useCommonListFunctions";
import useFilterList, { statusList } from "./hook/useFilterList";
import { getListHookWrap } from "./hook/useGetListHook";
import OrderSearchPanel from "./OrderSearchPannel";

export default function OrderFilter() {
	const {
		page,
		filterFromDate,
		filterToDate,
		doChangeStatus,
		doFilterFromDate,
		doFilterToDate,
		filterStatus,
		filterKeyword,
		doFilterKeyword,
	} = useCommonListFunctions();
	const { statusSelected, setStatusSelected } = useFilterList();
	const handleFilter = (val: SelectOptionType, filter?: (val: any) => void, set?: (val: any) => void) => {
		filter?.(val.value);
		set?.(val);
	};

	const handleChangeFromDate = (date: Date | null) => {
		doFilterFromDate?.(date);
	};
	const handleChangeToDate = (date: Date | null) => {
		doFilterToDate?.(date);
	};
	return (
		<FilterOrder>
			<OrderFilterBox>
				<OrderFilterSearchSelect
					isSearchable={false}
					options={statusList}
					value={statusSelected}
					setvalue={(val) => handleFilter(val, doChangeStatus, setStatusSelected)}
				/>
			</OrderFilterBox>
			<OrderFilterBoxDate>
				<DateRangeInputOrder
					fromDate={(filterFromDate && filterFromDate) || null}
					onDateFromChange={handleChangeFromDate}
					toDate={(filterToDate && filterToDate) || null}
					onDateToChange={handleChangeToDate}
				/>
			</OrderFilterBoxDate>
			{/* <PageSearchFilterSearchBox /> */}
			<OrderSearchPanel
				filterKeyword={filterKeyword}
				doFilterKeyword={doFilterKeyword}
			/>
		</FilterOrder>
	);
}
export const OrderFilterSearchSelect = (props: {
	options: SelectOptionType[];
	value: SelectOptionType;
	setvalue: (val: SelectOptionType) => void;
	isSearchable?: boolean;
}) => {
	return (
		<SmSelectSearchBoxOrder
			isSearchable={props.isSearchable}
			options={props.options}
			value={props.value}
			onChange={props.setvalue}></SmSelectSearchBoxOrder>
	);
};
