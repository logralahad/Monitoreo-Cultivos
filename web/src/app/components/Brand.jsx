import { Box, styled } from "@mui/material";
import useSettings from "../hooks/useSettings";
import Logo from "../images/logo.jpg";
import Small from "../images/logo small.png";

const BrandRoot = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 18px 20px 18px",
  marginX: "auto",
}));

const Brand = ({ children }) => {
  const { settings } = useSettings();
  const leftSidebar = settings.layoutSettings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
        {mode === "compact" ? (
          <img src={Small} alt="ASAP" width={25} style={{ margin: "auto" }} />
        ) : (
          <img src={Logo} alt="ASAP" width={160} />
        )}
      </Box>

      <Box
        className="sidenavHoverShow"
        sx={{ display: mode === "compact" ? "none" : "block" }}
      >
        {children || null}
      </Box>
    </BrandRoot>
  );
};

export default Brand;
