import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

export const BackToPageButton = (props) => {
	const navigate = useNavigate();
	return (
		<Button
			style={props.style}
			onClick={() => navigate(-1)}
			variant="contained"
		>
			<ArrowBackIosIcon />
			Vissza
		</Button>
	);
};
