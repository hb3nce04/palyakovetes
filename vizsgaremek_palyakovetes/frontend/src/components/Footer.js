import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Footer(props) {
  const trademark = "Pályakövetőrendszer ™";
  const versionNumber = "Verziószám: 1.0.0"; //jelenleg statikus, később githubról leszedni az adott verziószámot?
  const privacyPolicy = (
    <Link href="">Adatvédelmi tájékoztató</Link>
  ); /*href link csere később */
  const supportedBrowsers = (
    <Link href="">Támogatott böngészők</Link>
  ); /*href link csere később */

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />

      <Box
        className="footer"
        component="footer"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm" className="footerContent">
          <Typography variant="body1">
            {props.trademark ? trademark : ""}
          </Typography>
          <Typography variant="body1">
            {props.versionNumber ? versionNumber : ""}
          </Typography>
          <Typography variant="body1">
            {props.privacyPolicy ? privacyPolicy : ""}
          </Typography>
          <Typography variant="body1">
            {props.supportedBrowsers ? supportedBrowsers : ""}
          </Typography>
          {/*<Copyright />*/}
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;
