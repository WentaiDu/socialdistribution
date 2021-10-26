import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Box, Typography} from "@material-ui/core";
import MuiAlert from "@mui/material/core/Alert";
import Button from "@mui/material/core/Button";
import Card from "@mui/material/core/Card";
import Snackbar from "@mui/material/core/Snackbar";
import axios from "axios";
import React, { useState } from "react";
import "../App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00428b",
    },
    secondary: {
      main: "#ffa800",
    },
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameHelper, setUsernameHelper] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState(null);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openFailureAlert, setOpenFailureAlert] = useState(false);


  function handleLogin() {
    axios
      .post(`${base_url}/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        handleClick(true);
        console.log(res.data);
        localStorage.setItem("id" , res.data.id)
      })
      .catch((res) => {
        handleClick(false);
      });
  }

  const handleClick = (success) => {
    if (success) {
      setOpenSuccessAlert(true);
    } else {
      setOpenFailureAlert(true);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessAlert(false);
    setOpenFailureAlert(false);
  };

  const handleUsernameBlur = () => {
    if (username === "") {
      setUsernameError(true);
      setUsernameHelper("Username is required");
    } else {
      setUsernameError(false);
      setUsernameHelper(null);
    }
  };

  const handlePasswordBlur = () => {
    if (password === "") {
      setPasswordError(true);
      setPasswordHelper("Password is required");
    } else {
      setPasswordError(false);
      setPasswordHelper(null);
    }
  };

  return (
    <div className="Blue-background">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            minWidth: 100,
            maxWidth: 330,
            align: "center",
            padding: "30px",
            borderRadius: 7,
          }}
        >
          <ThemeProvider theme={theme}>
            <Box sx={{ mb: 0 }}>
              <Typography
                color="textPrimary"
                variant="h6"
                align="center"
                fontFamily="Arial"
              >
                EFCL Financial Assessment Tool
              </Typography>
              <br></br>
            </Box>

            <TextField
              id="username"
              fullWidth
              label="Username"
              variant="outlined"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  handleLogin();
                }
              }}
              error={usernameError}
              helperText={usernameHelper}
              onBlur={(e) => handleUsernameBlur()}
            />

            <TextField
              id="password"
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  handleLogin();
                }
              }}
              error={passwordError}
              helperText={passwordHelper}
              onBlur={(e) => handlePasswordBlur()}
            />

            {/* Need this so TextFields in CreateUser look normal?? :( */}
            <TextField
              variant="filled"
              size="small"
              margin="dense"
              style={{ display: "none" }}
            />

            <Box sx={{ py: 2 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                style={{
                  borderRadius: 15,
                  backgroundColor: "#00428b",
                }}
                disabled={!username || !password}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
          </ThemeProvider>
        </Card>

        <Snackbar
          open={openSuccessAlert}
          autoHideDuration={1500}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successful Login!
          </Alert>
        </Snackbar>

        <Snackbar
          open={openFailureAlert}
          autoHideDuration={1500}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            Incorrect Credentials
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}

export default Login;