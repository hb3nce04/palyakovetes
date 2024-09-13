import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { GridToolbarAddNewUserButton } from "./components/GridToolBarAddNewUserButton";

export const UserToolBar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarAddNewUserButton />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
};
