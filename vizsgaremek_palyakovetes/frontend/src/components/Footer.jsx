import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Footer(props) {
	const trademark = "Pályakövető rendszer ™";
	const versionNumber = "Verziószám: 1.0.0";
	const privacyPolicy = <Link href="">Adatvédelmi tájékoztató</Link>;
	const supportedBrowsers = <Link href="">Támogatott böngészők</Link>;

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column"
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
							: theme.palette.grey[800]
				}}
			>
				<Container maxWidth="sm" className="footerContent">
					<Typography variant="body1" data-testid="trademark">
						{props.trademark ? trademark : ""}
					</Typography>
					<Typography variant="body1" data-testid="versionNumber">
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
