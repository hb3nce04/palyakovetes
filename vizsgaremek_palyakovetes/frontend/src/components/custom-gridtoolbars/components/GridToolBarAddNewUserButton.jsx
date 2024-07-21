import { Button, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";

export const GridToolbarAddNewUserButton = () => {
	const navigate = useNavigate();

	const handleClick = (event) => {
		navigate("/admin/users/add", { replace: true });
	};

	return (
		<div>
			<Button
				color="success"
				id="demo-positioned-button"
				onClick={handleClick}
			>
				<SaveIcon fontSize="small" style={{ marginRight: "8px" }} />
				<Typography variant="h6">+</Typography> FELHASZNÁLÓ HOZZÁADÁSA
			</Button>
		</div>
	);
};
