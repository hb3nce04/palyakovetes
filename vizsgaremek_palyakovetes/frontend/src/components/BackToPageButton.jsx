import { Button } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
export const BackToPageButton = (props) => {
	return (
		<Button style={props.style} onClick={props.onClick} variant="contained">
			<KeyboardReturnIcon />
			Vissza
		</Button>
	);
};
