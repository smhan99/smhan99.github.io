import React from 'react';
import face from '../data/images/face.jfif';
import Typed from 'typed.js';
import "../styles/Pages.css"
import { Grid } from '@mui/material';

function Home() {
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['<p>I am a software engineer passionate in learning new things and creating for others.</p>'],
      showCursor: false,
      typeSpeed: 15,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div className='home'>
      <div className="welcome">
        <Grid container spacing={2}>
          <Grid item xs={1}/>
          <Grid item xs={3}>
            <img src={face} alt=""></img>
          </Grid>
          <Grid item xs={7}>
            <h1> Welcome! My name is Seungmin. </h1>
            <span ref={el} />
          </Grid>
          <Grid item xs={1}/>
        </Grid>
      </div>
    </div>
  )
}

export default Home