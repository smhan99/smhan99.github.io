import React from 'react';
import { useParams } from "react-router-dom";
import { ProjectList } from '../data/ProjectList';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item] = r(item); return null; });
  return images;
}
function ProjectDesc() {
  const navigate = useNavigate();
  const { id } = useParams();
  const project = ProjectList[id];

  const images = importAll(require.context('../data/images/projects', false, /\.png/));

  return (
    <div className="project">
      <h1 className='project-title'> {project.name}</h1>
      {(project.status === "working") ? <b>A Working Project...</b> : ""}
      <p>
        <b>Skills:</b> {project.skills}
      </p>
      <img src={images[project.image]} alt="" width={"40%"} />
      <p className='project-desc'>{project.long}</p>
      <a href={(project.link !== "null") ? project.link : ""} target="_blank" rel="noreferrer">{(project.link !== "null") ? "Link To Project" : ""}</a>
      <Button size="small" onClick={() => {navigate("/projects");}}> <b>Back</b> </Button>
    </div>
  );
}

export default ProjectDesc