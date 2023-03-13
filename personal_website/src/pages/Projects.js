import React from 'react';
import { ProjectList } from "../data/ProjectList";
import ProjectItem from "../components/ProjectItem";
import ImageList from '@mui/material/ImageList';

function Projects() {
  return (
    <div className='professional'>
      <div className='profContent'>
        <div className='skills'>
          <h1> My Skills and Interests </h1>
          <ol className="list">
            <li className="item">
              <h2> Full Stack Programming</h2>
              <span>
                NodeJS, ExpressJS, MySQL, MongoDB, Firebase, React
              </span>
            </li>
            <li className="item">
              <h2>Languages</h2>
              <span>C, C++, Javascript, Python, Java, Ruby</span>
            </li>
            <li className="item">
              <h2>Interests</h2>
              <span>Cryptography and Cyber Security, Machine Learning, Full Stack Programming</span>
            </li>
          </ol>
        </div>
        <div className='projects'>
          <h1> My Projects </h1>
          <div className='projectList'>
            <ImageList sx={{ width: "100%", height: "100%" }} cols={3} gap={20}>
              {ProjectList.map((project, idx) => {
                return (
                  <ProjectItem id={idx} name={project.name} short={project.short} />
                );
              })}
            </ImageList >
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects