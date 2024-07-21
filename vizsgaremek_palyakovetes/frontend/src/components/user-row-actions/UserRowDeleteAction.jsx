import AlertDialog from "../AlertDialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const UserRowDeleteAction = ({ params, clickEvent }) => {
	return (
		<div color="error">
			<AlertDialog
				alertButton={
					<DeleteForeverIcon variant="contained" color="error" />
				}
				dialogTitle="Biztosan szeretné törölni ezt a felhasználót?"
				dialogContent={
					<table>
						<thead>
							<tr>
								<th>{"OM azonosító"}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{params.row.om_azon}</td>
							</tr>
						</tbody>
					</table>
				}
				onAgreeButtonMessage={"Igen"}
				onDisagreeButtonColor={"primary"}
				onAgreeButtonColor={"error"}
				onDisagreeButtonMessage={"Nem"}
				onAgreeEvent={(e) => {
					e.stopPropagation();
					clickEvent(e, params.row);
				}}
			/>
		</div>
	);
};
