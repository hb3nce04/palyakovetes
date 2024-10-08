import { Button, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const GridToolbarImportButton = () => {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChange = (event) => {
		Papa.parse(event.target.files[0], {
			header: true,
			skipEmptyLines: true,
			complete: function (results) {
				const updatedArr = results.data.map((obj) => {
					return Object.keys(obj).reduce((acc, key) => {
						let newKey;

						if (key.toLowerCase().includes("om")) {
							newKey = "diak_om_azon";
						} else if (key === "Tanuló neve") {
							newKey = "tanulo_nev";
						} else if (
							key.toLowerCase().includes("agazat") ||
							key.toLowerCase().includes("ágazat")
						) {
							newKey = "agazat_nev";
						} else if (key.toLowerCase().includes("szakma")) {
							newKey = "szakma_nev";
						} else if (key.toLowerCase().includes("munkarend")) {
							newKey = "nappali_munkarend";
						} else if (
							key.toLowerCase().includes("leiras") ||
							key.toLowerCase().includes("leírás")
						) {
							newKey = "leiras";
						} else if (
							key.toLowerCase().includes("megnevezes") ||
							key.toLowerCase().includes("megnevezés")
						) {
							newKey = "kategoria_nev";
						} else {
							newKey = key;
						}
						return { ...acc, [newKey]: obj[key] };
					}, {});
				});

				return Promise.all([
					axios.get("/professions"),
					axios.get("/sectors"),
					axios.get("/categories")
				])
					.then((e) => {
						let newUpdatedArr = updatedArr.map((item1) => {
							const item2 = e[0].data.find((item2) => {
								if (item1.szakma_nev === item2.nev) {
									return item2.szakmaid;
								} else if (!item1.szakma_nev || !item2.nev) {
									return null;
								}
							});
							return { ...item1, ...item2 };
						});

						let mergedArray2 = newUpdatedArr.map((item1) => {
							const item2 = e[1].data.find((item2) => {
								if (item1.agazat_nev === item2.nev) {
									return item2.agazatid;
								} else {
									return null;
								}
							});
							return { ...item1, ...item2 };
						});

						const mergedArray3 = mergedArray2.map((item1) => {
							const item2 = e[2].data.find((item2) => {
								if (
									item1.kategoria_nev.replace("/", "") ===
									item2.megnevezes.replace("/", "")
								) {
									return item2.id;
								} else {
									return null;
								}
							});
							return { ...item1, ...item2 };
						});

						mergedArray3.forEach((e) => {
							axios.post("/students", {
								id: e.diak_om_azon,
								description: e.leiras,
								professionId: e.szakmaid ? e.szakmaid : null,
								sectorId: e.agazatid ? e.agazatid : null,
								name: e.tanulo_nev,
								categoryId: e.id,
								classId: Number(
									localStorage.getItem("selected_class")
								),
								dayShift: e.nappali_munkarend === "Nappali"
							});
						});
					})
					.then(() => {
						window.location.reload();
					})
					.catch((err) => {
						console.log(err);
						if (err.code === "ERR_NETWORK") navigate("/login");
						if (err.response.status === 401) logout();
					});
			}
		});
	};

	return (
		<div>
			<Button
				id="demo-positioned-button"
				aria-controls={open ? "demo-positioned-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				<i
					className="fa-solid fa-file-import"
					style={{ marginRight: 8 }}
				></i>
				IMPORTÁLÁS
			</Button>
			<Menu
				id="demo-positioned-menu"
				aria-labelledby="demo-positioned-button"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left"
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left"
				}}
			>
				<MenuItem>
					<label htmlFor="file-upload" className="importAsCSVLabel">
						CSV fájlként
					</label>
				</MenuItem>
				<input
					type="file"
					accept=".csv"
					onChange={handleChange}
					id="file-upload"
				/>
			</Menu>
		</div>
	);
};
