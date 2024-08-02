import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

export const UserRowEditAction = ({ params, clickEvent }) => {
	return (
		<ModeEditOutlineOutlinedIcon
			onClick={(e) => {
				clickEvent(e, params.row);
			}}
			color="info"
		>
			Módosítás
		</ModeEditOutlineOutlinedIcon>
	);
};
