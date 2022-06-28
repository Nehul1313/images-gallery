import React from "react";
import { Button } from "react-bootstrap";
import "./App.css";
  

const Welcome = () => {
  return (
    <div class="jumbotron">
      <h1>Images Gallery</h1>
      <p>
        This is a simple appplicatioin that retrieves photos using Unsplash API.In order to start enterany search input field. 
      </p>
      <p>
        <Button bsStyle="primary" href="http://unsplash.com" target="_blank">Learn more</Button>
      </p>
    </div>
    
  );
};

export default Welcome;
