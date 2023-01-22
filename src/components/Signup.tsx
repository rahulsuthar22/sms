import * as React from "react";
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
import { FormControlLabel, Checkbox, FormControl } from "@mui/material";
// import { Form } from "react-router-dom";

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
  const marginTop = { marginTop: 5 };
  const txtstyle = { margin: "8px 0" };
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
              <form>
                <TextField fullWidth style={txtstyle} label="Name" placeholder="Enter your name" />
                <TextField fullWidth style={txtstyle} label="Email" placeholder="Enter your email" />
                <TextField fullWidth style={txtstyle} label="username" placeholder="Enter your username" />
                <FormControl component="fieldset" style={marginTop}></FormControl>
                <TextField fullWidth style={txtstyle} label="Password" placeholder="Enter your password" />
                <TextField fullWidth style={txtstyle} label="Confirm Password" placeholder="Confirm your password" />
                <FormControlLabel control={<Checkbox name="checkedA" />} label="I accept the terms and conditions." />
                <Button type="submit" variant="contained" color="primary">
                  Sign up
                </Button>
              </form>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
