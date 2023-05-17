import { useAuth } from "../../store/useAuth";
import {
  Stack,
  Typography,
  IconButton,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Menu,
  Divider,
  useTheme as useMUITheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "../../store/useTheme";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const AppbarOptions = () => {
  /* STATE */
  const { isAuth, toggleAuth, user } = useAuth((state) => ({
    isAuth: state.isAuth,
    toggleAuth: state.toggleAuth,
    user: state.user,
  }));
  const { theme, toggleTheme } = useTheme((state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
  }));
  const isDarkMode = theme === "dark";
  const shownName = user?.firstName ?? user?.username;
  const navigate = useNavigate();

  /* MUI HOOKS */
  const muiTheme = useMUITheme();
  const tabletPlus = useMediaQuery(muiTheme.breakpoints.up("sm"));

  /* MENU ACTIONS */
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(menuAnchor);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget;
    setMenuAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchor(null);
  };

  const handleRedirect = (url: string) => {
    navigate(url);
    handleClose();
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      gap={2}
      sx={{ height: "100%" }}
    >
      <IconButton onClick={toggleTheme} sx={{ p: 0.5 }}>
        {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
      <Divider orientation="vertical" />
      {isAuth ? (
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          {tabletPlus && <Typography>{shownName}</Typography>}
          <Tooltip title="Настройки">
            <IconButton sx={{ p: 0 }} onClick={handleClick}>
              <Avatar sx={{ width: 32, height: 32 }}></Avatar>
            </IconButton>
          </Tooltip>
          <Menu anchorEl={menuAnchor} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => handleRedirect("/settings")}
              sx={{ gap: 1 }}
            >
              <SettingsIcon />
              Настройки
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ color: (theme) => theme.palette.error.main, gap: 1 }}
            >
              <ExitToAppIcon />
              Выйти
            </MenuItem>
          </Menu>
        </Stack>
      ) : (
        <Button color="inherit" onClick={toggleAuth}>
          Войти
        </Button>
      )}
    </Stack>
  );
};

export default AppbarOptions;
