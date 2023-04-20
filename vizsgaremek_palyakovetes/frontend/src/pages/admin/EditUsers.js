import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Grow,
  Paper,
  Typography,
} from "@mui/material";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { UserDataTable } from "../../components/UserDataTable";

export const EditUsers = () => {
  return (
    <>
      <Nav />
      <UserDataTable />
      <Footer trademark versionNumber />
    </>
  );
};
