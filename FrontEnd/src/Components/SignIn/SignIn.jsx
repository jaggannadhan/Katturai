import * as React from 'react';
import { 
    Link, 
    Typography, 

} from '@mui/material';

import { createTheme } from '@mui/material/styles';
import "../../Styles/Main/SignIn.scss";
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
    
    window.location = window.origin + "/glogin";
  };

  return (
    <div id="signin" style={styles.signin}>
      <form className="form" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-inner">
          <h2>Quick Login</h2>
          <div className="btn-group">
            <button className="btn btn--primary">Sign in with Google</button><a className="btn--text" href="#0"></a>
          </div>
        </div>
        <Copyright sx={{ mt: 8, mb: 4, paddingBottom: "2vh", marginTop: "4vh !important" }} />
      </form>
    </div>
  );
}