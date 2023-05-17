import { AppBar, Container, Stack, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  useTheme as useMUITheme,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppbarOptions from "./AppbarOptions";
import PostForm from "../PostForm";

const navbarItems = [
  { label: "Главная", to: "/", icon: <HomeIcon /> },
  { label: "Мой блог", to: "/my", icon: <HomeIcon /> },
];
const Appbar = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const muiTheme = useMUITheme();
  const [isDrawer, setDrawer] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleRedirect = (item: { to: string }) => {
    setDrawer((prev) => !prev);
    navigate(item.to);
  };

  if (isMobile) {
    return (
      <Paper
        variant="outlined"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: 0,
        }}
      >
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          {navbarItems.map((item) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              value={item.to}
              icon={item.icon}
              onClick={() => navigate(item.to)}
            />
          ))}
          <BottomNavigationAction
            label="Настройки"
            value="/settings"
            icon={<SettingsIcon />}
            onClick={() => navigate("/settings")}
          />
        </BottomNavigation>
        <PostForm />
      </Paper>
    );
  }

  return (
    <AppBar position="static">
      <Drawer
        anchor="left"
        open={isDrawer}
        onClose={() => setDrawer((prev) => !prev)}
      >
        <List>
          {navbarItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => handleRedirect(item)}>
                <ListItemText
                  primary={item.label}
                  sx={{
                    color:
                      location.pathname === item.to
                        ? muiTheme.palette.primary.main
                        : "inherit",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Container>
        <Stack
          justifyContent={"space-between"}
          direction={"row"}
          alignItems={"center"}
          height={48}
        >
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <IconButton
              color="inherit"
              onClick={() => setDrawer((prev) => !prev)}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
          <AppbarOptions />
        </Stack>
      </Container>
      <PostForm />
    </AppBar>
  );
};

export default Appbar;
