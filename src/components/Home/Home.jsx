import React from "react";
import Navbar from "./Navbar/Navbar";
import "./home.scss" ;
import Form from "./Form/Form";
import Table from "./Table/Table";




const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="home">
            <Table/>
        </div>
      </div>
    </>
  );
};

export default Home;
