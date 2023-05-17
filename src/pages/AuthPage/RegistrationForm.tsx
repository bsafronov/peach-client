import {
  Paper,
  Typography,
  Divider,
  Box,
  TextField,
  Stack,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

const registrationSchema = Yup.object({
  email: Yup.string().required("Введите почту"),
  password: Yup.string()
    .required("Введите пароль")
    .min(5, "Пароль должен содержать от 5 символов"),
  username: Yup.string().required("Придумайте логин"),
  firstName: Yup.string()
    .min(2, "Имя должно быть от 2 букв")
    .notRequired()
    .nullable(),
  lastName: Yup.string().min(2, "Фамилия должна быть от 2 букв"),
});

interface RegistrationProps {
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

const registrationInitialValues: RegistrationProps = {
  email: "",
  password: "",
  username: "",
  firstName: "",
  lastName: "",
};

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [errorOnPost, setErrorOnPost] = useState("");

  const handleRegistration = async (data: RegistrationProps) => {
    const response = await fetch("http://localhost:3000/register", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
    });

    if (response.ok) {
      navigate("/");
    } else {
      const result = await response.json();
      setErrorOnPost(result);
    }
  };

  return (
    <Formik
      initialValues={registrationInitialValues}
      validationSchema={registrationSchema}
      onSubmit={(values) => handleRegistration(values)}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        values,
        errors,
        handleChange,
        isSubmitting,
        handleSubmit,
        validateField,
      }) => (
        <Paper component={"form"} onSubmit={handleSubmit} noValidate>
          <Typography variant="h5" sx={{ p: 2 }}>
            Регистрация
          </Typography>
          <Divider />
          <Grid container spacing={{ xs: 2, md: 3 }} columns={4} p={2}>
            <Grid item xs={4} sm={2}>
              <TextField
                label="Почта"
                type="email"
                variant="standard"
                required
                fullWidth
                name="email"
                value={values.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                onBlur={() => validateField("email")}
              />
            </Grid>
            <Grid item xs={4} sm={2}>
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
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Логин"
                type="text"
                variant="standard"
                required
                fullWidth
                name="username"
                value={values.username}
                onChange={handleChange}
                error={Boolean(errors.username)}
                helperText={errors.username}
                onBlur={() => validateField("username")}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Имя"
                type="text"
                variant="standard"
                fullWidth
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                onBlur={() => validateField("firstName")}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Фамилия"
                type="text"
                variant="standard"
                fullWidth
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
                onBlur={() => validateField("lastName")}
              />
            </Grid>
          </Grid>
          <Stack p={2} alignItems={"flex-end"}>
            {errorOnPost && (
              <Typography variant="body2" color={"error"}>
                {errorOnPost}
              </Typography>
            )}

            <Button variant="contained" disabled={isSubmitting} type="submit">
              Регистрация
            </Button>
          </Stack>

          <Divider />
          <Box p={2}>
            <Typography variant="caption">
              {"Есть аккаунт? "}
              <Link to={"/"}>Войти</Link>
            </Typography>
          </Box>
        </Paper>
      )}
    </Formik>
  );
};

export default RegistrationForm;
