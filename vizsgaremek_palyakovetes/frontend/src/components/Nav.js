import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import lightfingerprint from "../images/lightfingerprint.png";
import { ColorModeContext } from "./DarkMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth/AuthContext";
//
const contact = (
  <a
    href="mailto:tanulopalyakovetorendszer@gmail.com"
    style={{ textDecoration: "none", color: "inherit" }}
  >
    Kapcsolat
  </a>
);
const userPages = ["Osztály kiválasztása", "Profil", contact];
const adminPages = ["Főoldal", "Profil", contact];
const dropdownButtons = ["Profil", "Kijelentkezés"];

function Nav() {
  const { toggleColorMode } = useContext(ColorModeContext);
  const { logout, currentUser } = useContext(AuthContext);
  const [darkModeIcon, setDarkModeIcon] = useState(
    localStorage.getItem("mode") === "dark" ? (
      <Brightness4Icon />
    ) : (
      <Brightness7Icon />
    )
  );
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutNavigation = () => {
    logout().then(() => navigate("/login"));
  };

  const handleProfileNavigation = () => {
    navigate("/user");
  };

  const handleClassChooserNavigation = () => {
    navigate("/classchooser");
  };

  const handleAdminDataTableNavigation = () => {
    navigate("/admin/users/edit");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar src={lightfingerprint} sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".15rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Pályakövetés
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {currentUser.isAdmin === 1
                ? adminPages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={(e) => {
                        if (page === "Profil") {
                          handleProfileNavigation();
                        }
                        if (page === "Főoldal") {
                          handleAdminDataTableNavigation();
                        }
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))
                : userPages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={(e) => {
                        if (page === "Profil") {
                          handleProfileNavigation();
                        }
                        if (page === "Osztály kiválasztása") {
                          handleClassChooserNavigation();
                        }
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Pályakövetés
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {currentUser.isAdmin === 1
              ? adminPages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={(e) => {
                      if (page === "Profil") {
                        handleProfileNavigation();
                      }
                      if (page === "Főoldal") {
                        handleAdminDataTableNavigation();
                      }
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))
              : userPages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={(e) => {
                      if (page === "Profil") {
                        handleProfileNavigation();
                      }
                      if (page === "Osztály kiválasztása") {
                        handleClassChooserNavigation();
                      }
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
          </Box>

          <IconButton
            sx={{ ml: 1 }}
            onClick={() => {
              toggleColorMode();
              if (localStorage.getItem("mode") === "dark") {
                setDarkModeIcon(<Brightness4Icon />);
              } else if (localStorage.getItem("mode") === "light") {
                setDarkModeIcon(<Brightness7Icon />);
              }
            }}
            color="inherit"
          >
            {darkModeIcon}
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {dropdownButtons.map((setting) => (
                <MenuItem
                  key={setting}
                  value={setting}
                  onClick={(e) => {
                    if (setting === "Profil") {
                      handleProfileNavigation(setting);
                    } else if (setting === "Kijelentkezés") {
                      handleLogoutNavigation(setting);
                    }
                    handleCloseUserMenu();
                  }}
                >
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;
