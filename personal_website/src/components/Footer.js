import React from 'react';
import { IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import "../styles/Footer.css";

function Footer() {
  return (
    <div className='footer'>
      <div className="socialMedia">
        <IconButton href="mailto:hanseun@seas.upenn.edu">
          <EmailIcon/>
        </IconButton>
        <IconButton href="https://github.com/smhan99" target="_blank">
          <GitHubIcon />
        </IconButton>
        <IconButton href="https://www.linkedin.com/in/seungmin-han-7a158a154/" target="_blank">
          <LinkedInIcon />
        </IconButton>
      </div>
      <p> &copy; 2023 Seungmin Han</p>
    </div>
  )
}

export default Footer