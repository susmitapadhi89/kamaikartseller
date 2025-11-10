import { Box, IconButton, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, Inventory } from "@mui/icons-material";
import { SidebarContainer, LogoContainer, COLORS } from "./SidebarContainer";
import { SidebarSection } from "./SideBarSelection";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import StyleIcon from "@mui/icons-material/Style";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";

export const Sidebar = ({
  isCollapsed,
  onToggleCollapse,
  isMobile = false,
}) => {
  // Menu items based on the image
  const mainMenuItems = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "/seller/Dashboard/home",
    },
  ];

  const productManagementItems = [
    // {
    //   name: "Types",
    //   icon: <CategoryIcon />,
    //   path: "/seller/types",
    // },
    // {
    //   name: "Categories",
    //   icon: <CategoryIcon />,
    //   path: "/seller/categories",
    // },
    // {
    //   name: "Brand",
    //   icon: <StyleIcon />,
    //   path: "/seller/brand",
    // },
    {
      name: "Products",
      icon: <ShoppingBagIcon />,
      path: "/seller/products",
      children: [
        {
          name: "List Products",
          icon: <ListIcon />,
          path: "/seller/ListProduct",
        },
      ],
    },
    {
      name: "Orders",
      icon: <ShoppingBagIcon />,
      path: "/seller/order",
      children: [
        {
          name: "Order Products",
          icon: <ListIcon />,
          path: "/seller/order/orderlist",
        },
      ],
    },
    // {
    //   name: "Inventory",
    //   icon: <Inventory />,
    //   path: "/seller/inventory",
    // },
    // {
    //   name: "Attributes",
    //   icon: <AssignmentIcon />,
    //   path: "/seller/attributes",
    // },
  ];

  // const ecommerceManagementItems = [
  //   {
  //     name: "Shippings",
  //     icon: <LocalShippingIcon />,
  //     path: "/seller/shippings",
  //   },
  // ];

  const settingItems = [
    { name: "Profile", icon: <PersonIcon />, path: "/seller/profile" },
    { name: "Settings", icon: <SettingsIcon />, path: "/seller/settings" },
  ];

  return (
    <SidebarContainer isCollapsed={isCollapsed} isMobile={isMobile}>
      {/* Header with logo and toggle */}

      <Box>
        <LogoContainer>
          {!isCollapsed && (
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Inventory sx={{ color: COLORS.textPrimary, mr: 1 }} />
              <Typography
                variant="h6"
                sx={{ color: COLORS.textPrimary, fontWeight: "bold" }}
              >
                KAMAIKART
              </Typography>
            </Box>
          )}
          {!isMobile && (
            <IconButton
              onClick={onToggleCollapse}
              sx={{ color: COLORS.textPrimary }}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          )}
        </LogoContainer>
      </Box>

      {/* Navigation sections */}
      <Box component="nav" sx={{ mt: 2 }}>
        <SidebarSection
          title=""
          items={mainMenuItems}
          isCollapsed={isCollapsed}
        />

        <SidebarSection
          title="PRODUCT MANAGEMENT"
          items={productManagementItems}
          isCollapsed={isCollapsed}
        />

        {/* <SidebarSection
          title="E-COMMERCE MANAGEMENT"
          items={ecommerceManagementItems}
          isCollapsed={isCollapsed}
        /> */}

        <SidebarSection
          title="ACCOUNT"
          items={settingItems}
          isCollapsed={isCollapsed}
        />
      </Box>

      {/* Footer with version info */}
      {!isCollapsed && (
        <Box
          sx={{
            p: 2,
            mt: "auto",
            borderTop: `1px solid ${COLORS.border}`,
            color: COLORS.textSecondary,
            fontSize: "0.75rem",
            textAlign: "center",
          }}
        >
          Seller Portal
        </Box>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
