import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import "../styles/Pages.css"

function ProjectItem({ name, id, skills, short }) {
  const navigate = useNavigate();
  return (
    <Card className="project-card" variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography className="project-title" component="div"> <b>{name}</b> </Typography>
        <Typography className="project-skills" component="div"> <b>{skills}</b> </Typography>
        <Typography className="project-body"> {short} </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => {navigate("/projects/" + id);}}> Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default ProjectItem