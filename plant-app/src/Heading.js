import React from 'react';
import { Link } from 'react-router-dom';

export default function Heading(props) {
  return (
    <>

<div className="saved-list">
      <div className="home-button">
        <Link to="/" >
        Home
        </Link>
      </div>
        <div className="home-button">
          <Link to="/login" >
          Login
          </Link>
        </div>
        <div className="home-button">
          <Link to="/about" >
          About
          </Link>
        </div>
  </div>
  ,
    <div className="saved-list">
      <h3>Saved Plants:</h3>
      {/* {props.list.map(plant => (
        <span className="saved-movie">{plant.title}</span>
      ))} */}
      
    </div>


    </>
  );
}
