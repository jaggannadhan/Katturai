import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import { Stack, Toolbar, Link } from '@mui/material';
import { uuid } from "../../Helper/Helper.js";

import "../../Styles/NavBar/NavBar.scss";

const navItems = [
  {name: "Diary"},
  {name: "Travel"},
  {name: "Portfolio"},
  {name: "Opinion"},
  {name: "Recreation"},
]

const NavBar = (props) => {
  const { isNavTrans, socials } = props;

  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar className={isNavTrans ? "toolbar-trans" : "toolbar-opq"} >
        
        <Stack direction="row" spacing={2} className="navbar-title-space">
          <Typography variant="h5" className={`navbar-title ${isNavTrans ? "nav-items-colord" : "nav-items-white"}`}>
            Katturai
          </Typography>
        </Stack>
        
        <Stack direction="row" spacing={2} className="navbar-nav">
          {
            navItems.map(item => {
              return (
                <Typography variant="h6" className='nav-item' key={uuid()}>
                  {item.name}
                </Typography>
              )
            })
          }
        </Stack>
       
        <Stack className="social-icons" direction="row" spacing={2} alignItems="center" justifyContent="center"> 
          {socials.map((network) => (
              <Link
                  display="block"
                  variant="body1"
                  href={network.link}
                  key={network.name}
                  sx={{ mb: 0.5 }}
                  target="_blank"
                  rel="noreferrer"
              >
                  <network.icon className={"nav-items-white"} /> 
              </Link>
          ))}
        </Stack><br/>

      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

