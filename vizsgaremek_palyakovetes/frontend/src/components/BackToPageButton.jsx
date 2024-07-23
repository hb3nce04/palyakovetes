import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export const BackToPageButton = (props) => {
	return (
		<Button style={props.style} onClick={props.onClick} variant="contained">
			<ArrowBackIosIcon />
			Vissza
		</Button>
	);
};
