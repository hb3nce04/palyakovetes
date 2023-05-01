import AlertDialog from "../AlertDialog";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export const StudentRowDeleteAction = ({ params, clickEvent }) => {
  return (
    <div>
      <AlertDialog
        alertButton={<DeleteForeverIcon variant="contained" color="error" />}
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
                <td>{params.row.om_azon}</td>
                <td>{params.row.tanulo_nev}</td>
                <td>{params.row.agazat_nev}</td>
                <td>{params.row.szakma_nev}</td>
                <td>{params.row.nappali_munkarend}</td>
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
