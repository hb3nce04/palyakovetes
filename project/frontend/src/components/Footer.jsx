import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Footer() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column"
			}}
		>
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
						Pályakövető rendszer ™
					</Typography>
					<Typography variant="body1" data-testid="versionNumber">
						Verziószám: 1.0.0 -{" "}
						<Link href="https://github.com/hb3nce04/palyakovetes">
							projekt
						</Link>
					</Typography>
					<Typography variant="body1">
						© Minden jog fenntartva! {new Date().getFullYear()}
					</Typography>
				</Container>
			</Box>
		</Box>
	);
}

export default Footer;
