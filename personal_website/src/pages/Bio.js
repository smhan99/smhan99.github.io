import { Grid } from '@mui/material';
import React from 'react';
import duri from "../data/duri.jpg";
import kapa from "../data/kapa.jpg";
import "../styles/Pages.css";

function Bio() {
  return (
    <div className='bio'>
      <Grid className='bioGrid' container height={"100vh"}>
        <Grid item xs={8} height={"100vh"}>
          <div className='summary'>
            <h1>A little bit about me...</h1>
            <p>
              Hi, my name is Seungmin Han. I am a senior majoring in Computer and Information Science and minoring Mathematics
              at the University of Pennsylvania. I am also pursuing a master's in Computer and Information Science as part of
              UPenn's <a href='https://ugrad.seas.upenn.edu/student-handbook/programs-options/submatriculation-engineering/'>Accelerated Masters Program.</a>
            </p>
          </div>
          <div className='geography'>
            <h2>Geography</h2>
            <ul>
              <li> I am from Seoul, South Korea, where I lived for 17 years of my life. </li>
              <li> I lived in Shanghai, China for 3 years when I was in 3rd grade. I went to a British International School 
                and picked up a British accent. (I don't have it anymore) </li>
              <li> I live in Philly when the semester begins. </li>
            </ul>
          </div>
          <div className='facts'>
            <h2>Some Facts</h2>
            <ul>
              <li> I like to sing. I'm a vocal/bassist for Kapacity, a rock band at UPenn. Here is a picture of me singing
                "Are You Gonna be my Girl" by Jet at a show. 
              </li>
              <li> I recently got introduced to the band "My Chemical Romance" and I love them. </li>
              <li> I love sports. I play every sport that involves any ball except lacrosse. I also picked up boxing recently but... </li>
              <li> My favorite is basketball. I was a OKC fan before KD bailed on us. Now I follow the 76ers. </li>
              <li> My family has a Maltese named "Duri". Here is a picture of him. </li>
              <li> I served in the South Korean military as an Auxilary Police Officer. My main duties were keeping 
                order and safety of seoul citizens and major governmental facilities.
              </li>
            </ul>
          </div>
          <div className='resume'>
            <p>
              Here is my most recent <a href='https://drive.google.com/file/d/1Kho8RUmB5LJw4H6FyUuUt6qgKRHULvHu/view?usp=sharing' target="_blank" rel="noopener noreferrer">CV</a>
              . You can also get a better description of my projects and experiences in the tabs above!
            </p>
          </div>
        </Grid>
        <Grid item xs={4} height={"100vh"}>
          <img className="kapa" src={kapa} alt=""></img>
          <img className="duri" src={duri} alt=""></img>
        </Grid>
      </Grid>
    </div>
  )
}

export default Bio