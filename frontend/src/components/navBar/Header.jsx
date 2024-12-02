import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  Link,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "#433D8B",
      }}
    >
      <Container>
        <StyledToolbar disableGutters>
          <Typography variant="h6" component="div">
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              underline="none"
              sx={{ fontWeight: "bold" }}
            >
              Task Manager
            </Link>
          </Typography>
          <Box>
            {isLoggedIn ? (
              <>
                <Tooltip title="Home">
                  <IconButton color="inherit" component={RouterLink} to="/">
                    <HomeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Logout">
                  <IconButton color="error" onClick={handleLogout}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Register">
                  <IconButton
                    color="inherit"
                    component={RouterLink}
                    to="/register"
                  >
                    <PersonAddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Login">
                  <IconButton
                    color="inherit"
                    component={RouterLink}
                    to="/login"
                  >
                    <LoginIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
