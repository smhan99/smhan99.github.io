import React from 'react';
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from "@mui/icons-material/Work";
import "../styles/Pages.css"

function ExperienceItem({ exp }) {
  return (
    <VerticalTimelineElement
      date={exp.date}
      iconStyle={{ background: "#040d5e", color: "#fff" }}
      icon={(exp.type === "school") ? <SchoolIcon/> : <WorkIcon/> }
      className="expItem"
    >
      <h2 className="vertical-timeline-element-title"> <a href={exp.related_link} target="_blank" rel="noreferrer">{ exp.name }</a> </h2>
      <h3>{ exp.position }</h3>
      <p>{ exp.short }</p>
    </VerticalTimelineElement>
  )
}

export default ExperienceItem