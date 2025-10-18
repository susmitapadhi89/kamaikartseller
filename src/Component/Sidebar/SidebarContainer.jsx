// import { Box, styled } from "@mui/material";

// // Color scheme from the image
// export const COLORS = {
//   sidebarBg: "#1e2a38", // Dark blue background
//   textPrimary: "#ffffff", // White text
//   textSecondary: "#a0aec0", // Light gray for inactive items
//   activeItem: "#2d74c9", // Light blue for active items
//   sectionHeader: "#718096", // Gray for section headers
//   hoverBg: "#2a3647", // Slightly lighter blue for hover
//   border: "#2d3748", // Border color
// };

// export const SidebarContainer = styled(Box, {
//   shouldForwardProp: (prop) => prop !== "isCollapsed" && prop !== "isMobile",
// })(({ theme, isCollapsed, isMobile }) => ({
//   flexShrink: 0,
//   transition: "all 0.3s ease-in-out",
//   position: isMobile ? "fixed" : "relative",
//   zIndex: isMobile ? 1200 : "auto",
//   height: "100vh",
//   overflowY: "auto",
//   background: COLORS.sidebarBg,
//   "&::-webkit-scrollbar": { width: 6 },
//   "&::-webkit-scrollbar-track": { background: "rgba(255,255,255,0.1)" },
//   "&::-webkit-scrollbar-thumb": {
//     background: "rgba(255,255,255,0.2)",
//     borderRadius: 3,
//   },
//   "&::-webkit-scrollbar-thumb:hover": {
//     background: "rgba(255,255,255,0.3)",
//   },
//   ...(isMobile
//     ? {
//         transform: isCollapsed ? "translateX(-100%)" : "translateX(0)",
//         width: 280,
//       }
//     : { width: isCollapsed ? 70 : 250 }),
//   borderRight: `1px solid ${COLORS.border}`,
// }));

// export const LogoContainer = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   padding: "16px",
//   borderBottom: `1px solid ${COLORS.border}`,
// });

import { styled } from "@mui/material";

export const COLORS = {
  primary: "#344767",
  accent: "#e91e63",
  info: "#1A73E8",
  success: "#4CAF50",
  warning: "#FB8C00",
  danger: "#F44336",
  textPrimary: "#344767",
  textSecondary: "#67748E",
  hoverBg: "rgba(52, 71, 103, 0.05)",
  // activeItem: "rgba(52, 71, 103, 0.1)",
  activeItem: "rgba(6, 89, 231, 0.1)",

  sectionHeader: "#67748E",
  border: "rgba(0, 0, 0, 0.1)",
};

export const SidebarContainer = styled("aside")(
  ({ isCollapsed, isMobile }) => ({
    position: isMobile ? "fixed" : "relative",
    top: 0,
    left: 0,
    // zIndex: 40,
    zIndex: isMobile ? 1200 : "auto",
    width: isCollapsed ? 70 : 250,
    height: "100vh",
    backgroundColor: "#ffffff",
    boxShadow:
      "0 10px 20px -10px rgba(0,0,0,0.2), 0 4px 6px -2px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  })
);

export const LogoContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
});
