// import { Box, List, Typography, styled } from "@mui/material";
// import { COLORS } from "./SidebarContainer";
// import { SidebarItem } from "./SidebarItem";
// export const SectionTitle = styled(Typography)({
//   padding: "8px 16px",
//   marginTop: 16,
//   color: COLORS.sectionHeader,
//   fontSize: "0.75rem",
//   fontWeight: 600,
//   textTransform: "uppercase",
//   letterSpacing: 1,
// });

// export const SidebarSection = ({ title, items, isCollapsed }) => (
//   <Box>
//     {!isCollapsed && <SectionTitle>{title}</SectionTitle>}
//     <List sx={{ "& > * + *": { mt: 0.5 } }}>
//       {items.map((item) => (
//         <SidebarItem
//           key={item.path || item.name}
//           item={item}
//           isCollapsed={isCollapsed}
//         />
//       ))}
//     </List>
//   </Box>
// );
// SidebarSection.js
import { Box, List, Typography, styled } from "@mui/material";
import { COLORS } from "./SidebarContainer";
import { SidebarItem } from "./SidebarItem";

export const SectionTitle = styled(Typography)({
  padding: "8px 16px",
  marginTop: 16,
  color: COLORS.sectionHeader,
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 1,
});

export const SidebarSection = ({ title, items, isCollapsed }) => (
  <Box>
    {!isCollapsed && <SectionTitle>{title}</SectionTitle>}
    <List sx={{ "& > * + *": { mt: 0.5 } }}>
      {items.map((item) => (
        <SidebarItem
          key={item.path || item.name}
          item={item}
          isCollapsed={isCollapsed}
        />
      ))}
    </List>
  </Box>
);
