import React from "react";
import {
	HomeOrderManagementPanelListBox,
	PageImgNoList,
	PageImgNoListWrap,
	PageNolist,
	TitleNoList,
} from "./styled/StyledOrderManagement";

export function PageOrderManagementNoListBox() {
	return (
		<HomeOrderManagementPanelListBox>
			<PageNolist>
				<PageImgNoListWrap>
					<PageImgNoList src="./static/img/pale-no-messages.png" />
				</PageImgNoListWrap>
				<TitleNoList>Bạn đang không có đơn hàng nào</TitleNoList>
			</PageNolist>
		</HomeOrderManagementPanelListBox>
	);
}
