import { ThemeProvider, useMediaQuery } from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { LoadingSuspense } from "../../../components";
import useSettings from "../../../hooks/useSettings";
import { sidenavCompactWidth, sideNavWidth } from "../../../utils/constant";
import React, { useEffect, useRef } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { Outlet } from "react-router-dom";
import Footer from "../../Footer";
import SidenavTheme from "../../Theme/SidenavTheme";
import LayoutSidenav from "./LayoutSidenav";
import LayoutTopbar from "./LayoutTopbar";

const LayoutRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  background: theme.palette.background.default,
}));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  overflowY: "auto",
  overflowX: "hidden",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledScrollBar = styled(Scrollbar)(() => ({
  height: "100%",
  position: "relative",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
}));

const LayoutContainer = styled(Box)(({ width }) => ({
  height: "100vh",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  verticalAlign: "top",
  marginLeft: width,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  marginRight: 0,
}));

const FirstLayout = () => {
  const { settings, updateSettings } = useSettings();
  const { layoutSettings } = settings;
  const topbarTheme = settings.themes[layoutSettings.topbar.theme];
  const {
    leftSidebar: { mode: sidenavMode, show: showSidenav },
  } = layoutSettings;

  const getSidenavWidth = () => {
    switch (sidenavMode) {
      case "full":
        return sideNavWidth;

      case "compact":
        return sidenavCompactWidth;

      default:
        return "0px";
    }
  };

  const sidenavWidth = getSidenavWidth();
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const ref = useRef({ isMdScreen, settings });
  const layoutClasses = `theme-${theme.palette.type}`;

  useEffect(() => {
    let { settings } = ref.current;
    let sidebarMode = settings.layoutSettings.leftSidebar.mode;
    if (settings.layoutSettings.leftSidebar.show) {
      let mode = isMdScreen ? "close" : sidebarMode;
      updateSettings({ layoutSettings: { leftSidebar: { mode } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  return (
    <LayoutRoot className={layoutClasses}>
      {showSidenav && sidenavMode !== "close" && (
        <SidenavTheme>
          <LayoutSidenav />
        </SidenavTheme>
      )}

      <LayoutContainer width={sidenavWidth}>
        {layoutSettings.topbar.show && layoutSettings.topbar.fixed && (
          <ThemeProvider theme={topbarTheme}>
            <LayoutTopbar fixed={true} className="elevation-z8" />
          </ThemeProvider>
        )}

        {settings.perfectScrollbar && (
          <StyledScrollBar>
            {layoutSettings.topbar.show && !layoutSettings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <LayoutTopbar />
              </ThemeProvider>
            )}
            <Box flexGrow={1} position="relative" padding={5}>
              <LoadingSuspense>
                <Outlet />
              </LoadingSuspense>
            </Box>

            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </StyledScrollBar>
        )}

        {!settings.perfectScrollbar && (
          <ContentBox>
            {layoutSettings.topbar.show && !layoutSettings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <LayoutTopbar />
              </ThemeProvider>
            )}

            <Box flexGrow={1} position="relative">
              <LoadingSuspense>
                <Outlet />
              </LoadingSuspense>
            </Box>

            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </ContentBox>
        )}

        {settings.footer.show && settings.footer.fixed && <Footer />}
      </LayoutContainer>
    </LayoutRoot>
  );
};

export default React.memo(FirstLayout);
