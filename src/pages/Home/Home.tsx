import * as React from "react";
import '../../assets/scss/home.css';

const Home: React.FC = () => {
  return (
    <div className="Home">
      <video src={process.env.PUBLIC_URL + '/img/env1.mp4'} autoPlay muted loop></video>
    </div>
  );
};

export default Home;

