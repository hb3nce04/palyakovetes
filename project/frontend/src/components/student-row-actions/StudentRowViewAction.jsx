import { Button } from "@mui/material";
import AlertDialog from "../AlertDialog";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
export const StudentRowViewAction = ({ params, clickEvent }) => {
	return (
		<AlertDialog
			alertButton={
				<Button
					style={{ leftMargin: 0, border: 0 }}
					variant="outlined"
					color="primary"
				>
					<ZoomInIcon /> Megtekint
				</Button>
			}
			dialogTitle={
				<h3 style={{ margin: 0, borderBottom: "3px solid grey" }}>
					{params.row.name + " " + "pályája"}
				</h3>
			}
			dialogContent={
				<div style={{ width: "75%", margin: "0 auto" }}>
					<h2>
						{params.row.sector_name
							? "Ágazat: " + params.row.sector_name
							: "Szakma: " + params.row.profession_name}
					</h2>
					<h2>{params.row.field_description}</h2>
					<p>{params.row.description}</p>
				</div>
			}
			onDisagreeButtonMessage={"Bezárás"}
			disableAgreeButton
			onAgreeEvent={(e) => {
				e.stopPropagation();
				clickEvent(e, params.row);
			}}
		/>
	);
};
