// import { NavLink, useLocation } from "react-router-dom";
// import { ListItem, Box, Collapse, styled } from "@mui/material";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import { COLORS } from "./SidebarContainer";
// import { useState } from "react";

// const StyledNavLink = styled(NavLink)(() => ({
//   display: "flex",
//   alignItems: "center",
//   textDecoration: "none",
//   padding: "12px 16px",
//   borderRadius: 4,
//   margin: "2px 8px",
//   color: COLORS.textSecondary,
//   transition: "all 0.2s ease",
//   "&:hover": {
//     backgroundColor: COLORS.hoverBg,
//     color: COLORS.textPrimary,
//   },
//   "&.active": {
//     backgroundColor: COLORS.activeItem,
//     color: COLORS.textPrimary,
//   },
// }));

// export const SidebarItem = ({ item, isCollapsed, depth = 0 }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const location = useLocation();
//   const hasChildren = item.children?.length > 0;
//   const isActive = location.pathname === item.path;
//   const isChildActive =
//     hasChildren && item.children.some((c) => c.path === location.pathname);

//   return (
//     <>
//       <ListItem disablePadding sx={{ pl: depth * 2, mb: 0.5 }}>
//         <Box sx={{ width: "100%" }}>
//           <StyledNavLink
//             to={item.path || "#"}
//             className={isActive || isChildActive ? "active" : ""}
//             onClick={(e) => {
//               if (hasChildren) {
//                 e.preventDefault();
//                 setIsExpanded(!isExpanded);
//               }
//             }}
//             style={{ paddingLeft: 16 + depth * 16 }}
//           >
//             <Box
//               sx={{ minWidth: 24, display: "flex", justifyContent: "center" }}
//             >
//               {item.icon}
//             </Box>

//             {!isCollapsed && (
//               <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
//                 <span className="ml-3 whitespace-nowrap text-sm font-medium">
//                   {item.name}
//                 </span>
//                 {hasChildren && (
//                   <Box sx={{ ml: "auto" }}>
//                     {isExpanded ? <ExpandLess /> : <ExpandMore />}
//                   </Box>
//                 )}
//               </Box>
//             )}
//           </StyledNavLink>
//         </Box>
//       </ListItem>

//       {hasChildren && !isCollapsed && (
//         <Collapse in={isExpanded} timeout="auto" unmountOnExit>
//           {item.children.map((child) => (
//             <SidebarItem
//               key={child.path || child.name}
//               item={child}
//               isCollapsed={isCollapsed}
//               depth={depth + 1}
//             />
//           ))}
//         </Collapse>
//       )}
//     </>
//   );
// };
// SidebarItem.js
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ListItem, Box, Collapse, styled } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { COLORS } from "./SidebarContainer";

const StyledNavLink = styled(NavLink)(() => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  padding: "12px 16px",
  borderRadius: 4,
  margin: "2px 8px",
  color: COLORS.textSecondary,
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: COLORS.hoverBg,
    color: COLORS.textPrimary,
  },
  "&.active": {
    backgroundColor: COLORS.activeItem,
    color: COLORS.textPrimary,
  },
}));

export const SidebarItem = ({ item, isCollapsed, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const hasChildren = item.children?.length > 0;
  const isActive = location.pathname === item.path;
  const isChildActive =
    hasChildren && item.children.some((c) => c.path === location.pathname);

  return (
    <>
      <ListItem disablePadding sx={{ pl: depth * 2 }}>
        <Box sx={{ width: "100%" }}>
          <StyledNavLink
            to={item.path || "#"}
            className={isActive || isChildActive ? "active" : ""}
            onClick={(e) => {
              if (hasChildren) {
                e.preventDefault();
                setIsExpanded(!isExpanded);
              }
            }}
            style={{ paddingLeft: 16 + depth * 16 }}
          >
            <Box
              sx={{ minWidth: 24, display: "flex", justifyContent: "center" }}
            >
              {item.icon}
            </Box>

            {!isCollapsed && (
              <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                <span className="ml-3 whitespace-nowrap text-sm font-medium">
                  {item.name}
                </span>
                {hasChildren && (
                  <Box sx={{ ml: "auto" }}>
                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </Box>
                )}
              </Box>
            )}
          </StyledNavLink>
        </Box>
      </ListItem>

      {hasChildren && !isCollapsed && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          {item.children.map((child) => (
            <SidebarItem
              key={child.path || child.name}
              item={child}
              isCollapsed={isCollapsed}
              depth={depth + 1}
            />
          ))}
        </Collapse>
      )}
    </>
  );
};
