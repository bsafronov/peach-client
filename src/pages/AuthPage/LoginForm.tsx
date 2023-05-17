import {
  Paper,
  Typography,
  Divider,
  Box,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../store/useAuth";

interface LoginProps {
  email: string;
  password: string;
}

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Почта введена неправильно")
    .required("Введите почту"),
  password: Yup.string().required("Введите пароль"),
});

const loginInitialValues: LoginProps = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [errorOnPost, setErrorOnPost] = useState("");
  const setUser = useAuth((state) => state.setUser);

  const handleLogin = async (data: LoginProps) => {
    const response = await fetch("http://localhost:3000/login", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
    });

    const result = await response.json();

    if (!response.ok) {
      return setErrorOnPost(result);
    }

    setUser(result);
  };

  return (
    <Formik
      initialValues={loginInitialValues}
      validationSchema={loginSchema}
      onSubmit={(values) => handleLogin(values)}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        validateField,
      }) => (
        <Paper component={"form"} onSubmit={handleSubmit} noValidate>
          <Typography variant="h5" sx={{ p: 2 }}>
            Авторизация
          </Typography>
          <Divider />
          <Stack p={2} gap={1}>
            <TextField
              label="Почта"
              type="email"
              variant="standard"
              onChange={handleChange}
              required
              fullWidth
              name="email"
              value={values.email}
              error={Boolean(errors.email)}
              helperText={errors.email}
              onBlur={() => validateField("email")}
            />
            <TextField
              label="Пароль"
              type="password"
              variant="standard"
              required
              fullWidth
              name="password"
              value={values.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              onBlur={() => validateField("password")}
            />
            {errorOnPost && (
              <Typography variant="body2" color={"error"}>
                {errorOnPost}
              </Typography>
            )}
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              type="submit"
              disabled={isSubmitting}
            >
              Войти
            </Button>
          </Stack>
          <Divider />
          <Box p={2}>
            <Typography variant="caption">
              {"Нет аккаунта? "} <Link to={"/register"}>Регистрация</Link>
            </Typography>
          </Box>
        </Paper>
      )}
    </Formik>
  );
};

export default LoginForm;
