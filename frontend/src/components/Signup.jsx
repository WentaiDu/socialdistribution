import * as React from 'react';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./common.css";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import Avatar from '@mui/material/Avatar';
export default function SignUp() {
    const [state,setState] = useState({
      file: null
    });
    const handleFile = (e) => {
      let file = e.target.files[0];
      setState({ file });
    }
    const handleUpload = async (e) => {
      await uploadImage(state.file);
    }
    const history = useHistory();
    const [username,setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [github, setGithub] = useState("");
    const [errorStates, setErrorStates] = useState({
        usernameError: false,
        displayNameError: false,
        passwordError: false,
        confirmPasswordError: false,
      });
    const [errorHelper, setErrorHelper] = useState({
        usernameHelper: null,
        displayNameHelper:null,
        passwordHelper: null,
        confirmPasswordHelper: null,
    });
    const handleBlurs = (type) => {
        if (type === "usernameBlur"){
            if (username === "") {
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
        if (type === "displayNameBlur"){
            if (displayName === "") {
                setErrorStates({ ...errorStates, displayNameError: true });
                setErrorHelper({
                ...errorHelper,
                displayNameHelper: "Username is required",
                });
            } else {
                setErrorStates({ ...errorStates, displayNameError: false });
                setErrorHelper({ ...errorHelper, displayNameHelper: null });
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
        if (type === "confirmpasswordBlur") {
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
      const uploadImage = async file => {
        const target = new FormData()
        target.append("username",username)
        target.append("displayName",displayName)
        target.append("password",password)
        target.append("github",github)
        target.append("profileImage",file)
        console.log(target.get("username"))
        console.log(target.get("profileImage"))
        axios
          .post(`http://127.0.0.1:8000/author/`, target,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
          console.log(res);
          console.log(res.data);

          })
          .catch((res) => {
          });
        history.push("");
        }

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main',width: 56, height: 56 }}>
            <AccountCircleTwoToneIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Card
              sx={{
                minWidth: 100,
                align: "center",
                padding: "30px",
                borderRadius: 7,
            }}>

            <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
              <TextField required id="username" label="username" variant="outlined" value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={errorStates.usernameError}
                    helperText={errorHelper.usernameHelper}
                    onBlur={(e) => handleBlurs("usernameBlur")}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField required id="displayName" label="displayName" variant="outlined" value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    error={errorStates.displayNameError}
                    helperText={errorHelper.displayNameHelper}
                    onBlur={(e) => handleBlurs("displayNameBlur")}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="password" type="password"label="password" variant="outlined" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errorStates.passwordError}
                  helperText={errorHelper.passwordHelper}
                  onBlur={(e) => handleBlurs("passwordBlur")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  required
                  id="confirmPassword" type="password"label="confirm password" variant="outlined" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={errorStates.confirmPasswordError}
                  helperText={errorHelper.confirmPasswordHelper}
                  onBlur={(e) => handleBlurs("confirmPasswordBlur")}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField fullWidth required id="github" label="github" variant="outlined" value={github}
                    onChange={(e) => setGithub(e.target.value)}/>
              </Grid>
            </Grid>
            <br/>
            <input type="file" name="file" onChange={e => handleFile(e)} />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                username === "" ||
                displayName === "" ||
                password === "" ||
                confirmPassword === "" ||
                password !== confirmPassword
              }
              onClick={e => handleUpload(e)}
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
            </Card>
          </Box>
        </Box>
      </Container>
  );
}