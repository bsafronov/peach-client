import {
  Paper,
  Typography,
  Divider,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useTheme } from "../../store/useTheme";
import { useState } from "react";
import { useAuth } from "../../store/useAuth";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme((state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
  }));
  const logout = useAuth((state) => state.deleteUser);
  const [isExitDialog, setExitDialog] = useState(false);
  const navigate = useNavigate();

  const handleToggleDialog = () => {
    setExitDialog((prev) => !prev);
  };

  const handleRedirect = () => {
    logout();
    navigate("/");
  };

  return (
    <Paper>
      <Typography variant="h5" sx={{ p: 2 }}>
        Настройки
      </Typography>
      <Divider />
      <MenuItem onClick={toggleTheme}>
        <ListItemIcon>
          <LightModeIcon />
        </ListItemIcon>
        <ListItemText>Тёмная тема</ListItemText>
        <Switch checked={theme === "dark"} />
      </MenuItem>
      <MenuItem onClick={handleToggleDialog}>
        <ListItemIcon>
          <ExitToAppIcon color="error" />
        </ListItemIcon>
        <ListItemText sx={{ color: (theme) => theme.palette.error.main }}>
          Выйти
        </ListItemText>
      </MenuItem>
      <Dialog open={isExitDialog} onClose={handleToggleDialog}>
        <DialogTitle>Выйти из аккаунта?</DialogTitle>
        <DialogActions>
          <Button onClick={handleToggleDialog}>Отмена</Button>
          <Button onClick={handleRedirect}>Принять</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SettingsPage;
