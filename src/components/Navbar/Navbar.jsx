import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const pages = ["About Us"];
const settings = ["Your Profile", "Your Drawings", "Your Orders", "Logout"];

function ResponsiveAppBar({ profileUser }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { handleLogout, currentUser } = useContext(AuthContext);
  const nav = useNavigate();

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

  const handleNavigateToLogin = () => {
    nav("/login");
  };

  const handleProfileOptions = (e) => {
    e.preventDefault();
    setAnchorElUser(null); //?
    if (e.target.innerHTML === "Logout") {
      handleLogout();
    }
    if (e.target.innerHTML === "Your Profile") {
      nav("/profile");
    }
    if (e.target.innerHTML === "Your Drawings") {
      nav("/drawings");
    }
    if (e.target.innerHTML === "Your Orders") {
      nav("/orders");
    }
  };

  return (
    <AppBar position="static" style={{ background: "#ffeda0" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* ABOUT US */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to="/about">
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#242424", display: "block" }}
              >
                {page}
              </Button>
              </Link>
            ))}
          </Box>

          {/* MY KID DID IT */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 1.2,
                mt: 0.3,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#242424",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              MY KID DID IT
            </Typography>
            <img src={logo} style={{width: "35px"}} />
          </Box>

          {/* USER ICON / LOGIN */}
          <Box sx={{ flexGrow: 0 }}>
            {currentUser ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="user profile img" src={profileUser?.userImage} />
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                onClick={handleNavigateToLogin}
                sx={{ my: 2, color: "#242424", display: "block" }}
              >
                LOGIN
              </Button>
            )}
            {/* USER ICON - DropDown Menu */}
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
              {settings.map((setting) => (
                <MenuItem key={setting}>
                  <Typography textAlign="center" onClick={handleProfileOptions}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
