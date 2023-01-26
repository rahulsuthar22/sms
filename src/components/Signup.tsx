import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import loginBg from "../images/login_bg.jpg";
import logo from "../images/logo.png";
import { FormControlLabel, Checkbox, FormControl, IconButton } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { InputAdornment } from "@material-ui/core";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';

function Copyright(props: any) {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Schoolar
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

const theme = createTheme();

export default function Siggnup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("please enter valid email").required("Required"),
    password: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),

  });
  const onSubmit = () => {

  };
  const txtstyle = { margin: "8px 0", color: 'waring' };
  const btnstyle = { margin: "8px 0" };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sx={{
            backgroundImage: `url(${loginBg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} sm={8} md={4} component="div" style={{ margin: 3, borderRadius: "10px", backgroundColor: "white" }}>
            <Box
              sx={{
                my: 2,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={logo} style={{ width: "100px" }} alt="" />
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                  <Form>
                    <Field
                      as={TextField}
                      size="small"
                      color="warning"
                      style={txtstyle}
                      label="Name"
                      name="Name"
                      placeholder="Enter your name"
                      fullWidth
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      helperText={<ErrorMessage name="username" />}
                    />
                    <Field
                      as={TextField}
                      size="small"
                      color="warning"
                      style={txtstyle}
                      label="Email"
                      name="email"
                      placeholder="Enter email address"
                      fullWidth
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <MailIcon />
                          </InputAdornment>
                        ),
                      }}
                      helperText={<ErrorMessage name="email" />}
                    />
                    <Field
                      as={TextField}
                      size="small"
                      color="warning"
                      style={txtstyle}
                      label="Password"
                      name="password"
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      helperText={<ErrorMessage name="password" />}
                    />
                    <Field
                      as={TextField}
                      size="small"
                      color="warning"
                      style={txtstyle}
                      label="Confirm Password"
                      name="Confirm password"
                      placeholder="Enter password again"
                      type="password"
                      fullWidth
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                      helperText={<ErrorMessage name="confirmPassword" />}
                    />
                    <Button type="submit" color="warning" variant="contained" style={btnstyle} fullWidth>
                      Sign Up
                    </Button>
                  </Form>
                )}
              </Formik>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
