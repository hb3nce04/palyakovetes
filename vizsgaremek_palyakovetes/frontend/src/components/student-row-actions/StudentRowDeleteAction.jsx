import AlertDialog from "../AlertDialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const StudentRowDeleteAction = ({ params, clickEvent }) => {
	return (
		<div>
			<AlertDialog
				alertButton={
					<DeleteForeverIcon variant="contained" color="error" />
				}
				dialogTitle="Biztosan szeretné törölni ezt a tanulót?"
				dialogContent={
					<table>
						<thead>
							<tr>
								<th>{"OM azonosító"}</th>
								<th>{"Tanuló neve"}</th>
								<th>{"Ágazat"}</th>
								<th>{"Szakma"}</th>
								<th>{"Munkarend"}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{params.row.id}</td>
								<td>{params.row.name}</td>
								<td>{params.row.sector_id}</td>
								<td>{params.row.profession_id}</td>
								<td>{params.row.day_shift}</td>
							</tr>
						</tbody>
					</table>
				}
				onAgreeButtonMessage={"Igen"}
				onDisagreeButtonMessage={"Nem"}
				onAgreeEvent={(e) => {
					e.stopPropagation();
					clickEvent(e, params.row);
				}}
			/>
		</div>
	);
};
