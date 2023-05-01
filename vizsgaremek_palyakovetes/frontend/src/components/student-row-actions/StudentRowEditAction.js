import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

export const StudentRowEditAction = ({ params, clickEvent }) => {
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
