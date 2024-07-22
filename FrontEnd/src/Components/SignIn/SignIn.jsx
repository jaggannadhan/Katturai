import * as React from 'react';
import { 
    Link, 
    Grid, 
    Box, 
    Typography, 
    Container, 
    Checkbox, 
    FormControlLabel, 
    TextField, 
    CssBaseline, 
    Button, 
    Avatar
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import gIcon from "../../../public/images/landing/gIcon.png";
import signinBg from "../../../public/images/landing/signinBg.avif";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href=".">
        Raconteur
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const styles = {
  signin: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    background: `url(${signinBg}) center no-repeat`,
    backgroundSize: "cover"
  },

  container: {
    background: "rgb(255 255 255 / 43%)",
    padding: "0vh 2vw",
    borderRadius: "1vw",
    marginTop: "2vh"
  },

  googleBtn: {
    width: "fit-content",
    margin: "4vh auto",
    background: "black",
    color: "white",
    fontWeight: "700",
    borderRadius: "4vh",
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    justifyContent: "center"
  },

  gTxt: {
    margin: "2vh 3vw"
  },

  gIcon: {
    height: "7vh",
    margin: "auto 0"
  }
}

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div id="signin" style={styles.signin}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" style={styles.container}>
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box style={styles.googleBtn} onClick={() => window.location = "./glogin"} >
                <img style={styles.gIcon} src={gIcon} alt="G" />
                <p style={styles.gTxt}>Sign in with Google</p>
              </Box>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4, paddingBottom: "2vh", marginTop: "4vh !important" }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}