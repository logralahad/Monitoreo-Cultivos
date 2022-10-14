import { AppBar, ThemeProvider, Toolbar } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import useSettings from "../hooks/useSettings";
import { topBarHeight } from "../utils/constant";
import { Paragraph } from "./Typography";

const AppFooter = styled(Toolbar)(() => ({
  display: "flex",
  alignItems: "center",
  minHeight: topBarHeight,
  "@media (max-width: 499px)": {
    display: "table",
    width: "100%",
    minHeight: "auto",
    padding: "1rem 0",
    "& .container": {
      flexDirection: "column !important",
      "& a": { margin: "0 0 16px !important" },
    },
  },
}));

const FooterContent = styled("div")(() => ({
  width: "100%",
  margin: "0 auto",
  textAlign: "center",
}));

const Footer = () => {
  const theme = useTheme();
  const { settings } = useSettings();

  const footerTheme = settings.themes[settings.footer.theme] || theme;

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar color="primary" position="static" sx={{ zIndex: 96 }}>
        <AppFooter>
          <FooterContent>
            <Paragraph sx={{ m: 0 }}>
              Desarrollado por{" "}
              <a href="https://www.youtube.com/watch?v=8SbUC-UaAxE">
                GiDi - Grupo de investigaci&oacute;n
              </a>
            </Paragraph>
          </FooterContent>
        </AppFooter>
      </AppBar>
    </ThemeProvider>
  );
};

export default Footer;
