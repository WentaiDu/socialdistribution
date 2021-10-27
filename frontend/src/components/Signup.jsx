import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import { useHistory } from "react-router-dom";


export default function SignUp() {
    const history = useHistory();
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [github, setGithub] = useState("");
    // const [profileImage, setProfileImage] = useState("");
    const [errorStates, setErrorStates] = useState({
        usernameError: false,
        passwordError: false,
        confirmPasswordError: false,
      });
    const [errorHelper, setErrorHelper] = useState({
        usernameHelper: null,
        passwordHelper: null,
        confirmPasswordHelper: null,
    });
    const handleBlurs = (type) => {
        if (type === "usernameBlur"){
            if (displayName === "") {
                setErrorStates({ ...errorStates, usernameError: true });
                setErrorHelper({
                ...errorHelper,
                usernameHelper: "Username is required",
                });
            } else {
                setErrorStates({ ...errorStates, usernameError: false });
                setErrorHelper({ ...errorHelper, usernameHelper: null });
            }
        } 
        if (type === "passwordBlur") {
            if (password === "") {
                setErrorStates({ ...errorStates, passwordError: true });
                setErrorHelper({
                ...errorHelper,
                passwordHelper: "Password is required",
                });
            } else {
                setErrorStates({ ...errorStates, passwordError: false });
                setErrorHelper({ ...errorHelper, passwordHelper: null });
            }
        } 
        if (type === "passwordBlur") {
            if (confirmPassword === "") {
                setErrorStates({ ...errorStates, confirmPasswordError: true });
                setErrorHelper({
                ...errorHelper,
                confirmPasswordHelper: "Please confirm password",
                });
            } else {
                setErrorStates({ ...errorStates, confirmPasswordError: false });
                setErrorHelper({ ...errorHelper, passwordHelper: null });
            }
        }
    };
    function handleLogin() {
        history.push("");
      }
    function handleSubmit() {
        axios
            .post('http://localhost:8000/signup/', {
            displayName: displayName,
            password: password,
            github: github,
            // profileImage: profileImage,
            })
        history.push("");
        }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField required id="displayName" label="displayName" variant="outlined" value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    error={errorStates.usernameError}
                    helperText={errorHelper.usernameHelper}
                    onBlur={(e) => handleBlurs("usernameBlur")}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField required id="github" label="github" variant="outlined" value={github}
                    onChange={(e) => setGithub(e.target.value)}/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password" type="password"label="password" variant="outlined" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errorStates.passwordError}
                  helperText={errorHelper.passwordHelper}
                  onBlur={(e) => handleBlurs("passwordBlur")}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="confirmPassword" type="password"label="confirm password" variant="outlined" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={errorStates.confirmPasswordError}
                  helperText={errorHelper.confirmPasswordHelper}
                  onBlur={(e) => handleBlurs("confirmPasswordBlur")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                displayName === "" ||
                password === "" ||
                confirmPassword === "" ||
                password !== confirmPassword
              }
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography color="textSecondary" variant="body1" align="center">
                <Link
                    component="button"
                    variant="body1"
                    onClick={handleLogin}
                >
                    Already have an account? Sign in
                </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}