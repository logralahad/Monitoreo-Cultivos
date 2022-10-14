import { Box, ButtonBase, styled } from "@mui/material";
import useSettings from "../../hooks/useSettings";
import React from "react";
import { NavLink } from "react-router-dom";
import { Span } from "../Typography";

const ExtAndIntCommon = {
  display: "flex",
  overflow: "hidden",
  borderRadius: "4px",
  height: 44,
  whiteSpace: "pre",
  marginBottom: "8px",
  textDecoration: "none",
  justifyContent: "space-between",
  transition: "all 150ms ease-in",
  "&:hover": { background: "rgba(255, 255, 255, 0.08)" },
  "&.compactNavItem": {
    overflow: "hidden",
    justifyContent: "center !important",
  },
  "& .icon": {
    fontSize: "18px",
    paddingLeft: "16px",
    paddingRight: "16px",
    verticalAlign: "middle",
  },
};

const InternalLink = styled(Box)(({ theme }) => ({
  "& a": {
    ...ExtAndIntCommon,
    color: theme.palette.text.primary,
  },
  "& .navItemActive": {
    backgroundColor: "rgba(255, 255, 255, 0.16)",
  },
}));

const StyledText = styled(Span)(({ mode }) => ({
  fontSize: "0.875rem",
  display: mode === "compact" && "none",
}));

const VerticalComponent = ({ items }) => {
  const { settings } = useSettings();
  const { mode } = settings.layoutSettings.leftSidebar;

  const renderLevels = (data) => {
    return data.map((item, index) => {
      return (
        <InternalLink key={index}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? `navItemActive ${mode === "compact" && "compactNavItem"}`
                : `${mode === "compact" && "compactNavItem"}`
            }
          >
            <ButtonBase
              key={item.name}
              name="child"
              sx={{
                width: "100%",
                justifyContent:
                  mode !== "compact" ? "space-between" : "space-evenly",
              }}
            >
              {item.icon}
              <StyledText mode={mode} className="sidenavHoverShow">
                {item.name}
              </StyledText>
            </ButtonBase>
          </NavLink>
        </InternalLink>
      );
    });
  };

  return (
    <div
      className="navigation"
      style={mode !== "compact" ? { paddingLeft: 25, paddingRight: 25 } : {}}
    >
      {renderLevels(items)}
    </div>
  );
};

export default React.memo(VerticalComponent);
