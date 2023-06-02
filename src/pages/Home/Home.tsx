import * as React from "react";
import '../../assets/scss/home.css';
import Header from "../Header/Header";

const Home: React.FC = () => {
  return (
    <div className="Home">
      <video src={process.env.PUBLIC_URL + '/img/env1.mp4'} autoPlay muted loop></video>
      <Header textColor={'white'}></Header>
    </div>
  );
};

export default Home;

