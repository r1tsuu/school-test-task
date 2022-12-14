import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Link,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import { Box } from "@mui/system";
import { Link as RouterLink, Outlet } from "react-router-dom";

const menu = [
  {
    label: "Викладачі",
    icon: <PeopleIcon />,
    link: "/teachers",
  },
  {
    label: "Уроки",
    icon: <SchoolIcon />,
    link: "/lessons",
  },
];

const drawerWidth = "250px";

export const Dashboard = () => {
  return (
    <Box display="flex">
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {menu.map(({ label, icon, link }) => (
            <ListItem to={link} component={RouterLink}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }} p={4}>
        <Outlet />
      </Box>
    </Box>
  );
};
