import React from 'react';
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import ExperienceItem from '../components/ExperienceItem';
import { ExperienceList } from '../data/ExperienceList';

function Experience() {
  return (
    <div className="experience">
      <VerticalTimeline lineColor="#040d5e">
        {ExperienceList.map((experience) => {
          return (
            <ExperienceItem exp={experience} />
          );
        })}
      </VerticalTimeline>
    </div>
  )
}

export default Experience