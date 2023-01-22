import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import loginBg from "../images/login_bg.jpg";
import logo from "../images/logo.png";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik, Field, ErrorMessage, Form } from "formik";
// import { Form } from "react-router-dom";
import * as Yup from "yup";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { instance } from "../api/instance";
import { useNavigate } from "react-router";

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

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const btnstyle = { margin: "8px 0" };
  const txtstyle = { margin: "8px 0" };

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("please enter valid email").required("Required"),
    password: Yup.string().required("Required"),
  });
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    console.log(values);
    const results = await instance.post("auth/login", values);
    console.log("results:", results.data);
    if (results.data.success === true) {
      localStorage.setItem("token", results.data.authtoken);
      navigate("/dashboard");
    }
  };
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
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={logo} style={{ width: "100px" }} alt="" />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="div"></Box>
              <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                  <Form>
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
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      error
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
                      error
                      helperText={<ErrorMessage name="password" />}
                    />
                    <Button type="submit" color="warning" variant="contained" style={btnstyle} fullWidth>
                      Sign In
                    </Button>
                  </Form>
                )}
              </Formik>
              <Grid container sx={{ justifyContent: "space-between" }}>
                <Grid item>
                  <Link href="#" variant="body2" color="#ed6c02" style={{ textDecoration: "none" }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2" color="#ed6c02" style={{ textDecoration: "none" }}>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
            {/* </Box> */}
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
