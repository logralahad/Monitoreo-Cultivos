import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Span } from "../../Typography";

import { Box, styled, useTheme } from "@mui/system";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Logout,
  Person,
} from "@mui/icons-material";
import {
  Avatar,
  Hidden,
  IconButton,
  MenuItem,
  useMediaQuery,
} from "@mui/material";

import { Menu } from "../../../components";
import { topBarHeight } from "../../../utils/constant";
import useSettings from "../../../hooks/useSettings";
import { AuthContext } from "../../../context/AuthContext";
import { themeShadows } from "../../../components/Theme/themeColors";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  border: 0,
}));

const TopbarRoot = styled("div")(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: "all 0.3s ease",
  boxShadow: themeShadows[8],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down("xs")]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: 24,
  padding: 4,
  "& span": { margin: "0 8px" },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary },
}));

const LayoutTopbar = () => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { signout, currentUser } = useContext(AuthContext);
  const { settings, updateSettings } = useSettings();
  const { mode } = settings.layoutSettings.leftSidebar;

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layoutSettings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  const handleSidebarToggle = () => {
    let { layoutSettings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layoutSettings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layoutSettings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            {mode === "compact" ? (
              <Hidden />
            ) : mode === "full" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </StyledIconButton>
        </Box>

        <Box display="flex" alignItems="center">
          <Menu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    Bienvenido, <strong>{currentUser.nombre}</strong>
                  </Span>
                </Hidden>
                <Avatar
                  src={currentUser.foto_perfil}
                  sx={{ cursor: "pointer" }}
                />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/perfil">
                <Person style={{ marginRight: 10 }} />
                <Span> Perfil </Span>
              </Link>
            </StyledItem>

            <StyledItem onClick={signout}>
              <Logout style={{ marginRight: 10 }} />
              <Span> Cerrar sesi&oacute;n </Span>
            </StyledItem>
          </Menu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default React.memo(LayoutTopbar);
