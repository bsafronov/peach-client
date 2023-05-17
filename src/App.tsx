import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Appbar from "./components/Appbar";
import { useAuth } from "./store/useAuth";
import { useEffect, useMemo } from "react";
import { createTheme, Container } from "@mui/material";
import { useTheme } from "./store/useTheme";
import { ThemeProvider } from "@mui/material/styles";
import PersonalPage from "./pages/PersonalPage";
import SettingsPage from "./pages/SettingsPage";
import RegistrationForm from "./pages/AuthPage/RegistrationForm";
import LoginForm from "./pages/AuthPage/LoginForm";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { CssBaseline } from "@mui/material";

const App = () => {
  const { isAuth, checkToken } = useAuth((state) => ({
    isAuth: state.isAuth,
    checkToken: state.checkToken,
  }));

  const colorMode = useTheme((state) => state.theme);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
        },
      }),
    [colorMode]
  );

  useEffect(() => {
    checkToken();
  }, []);

  if (isAuth === null) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress size={64} color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <Appbar />
          <Container sx={{ mt: 4 }}>
            <Routes>
              {isAuth ? (
                <>
                  <Route path="/my" element={<PersonalPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route index element={<HomePage />} />
                </>
              ) : (
                <>
                  <Route path="/register" element={<RegistrationForm />} />
                  <Route index element={<LoginForm />} />
                </>
              )}
            </Routes>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
