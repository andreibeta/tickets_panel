import React from 'react';
import Navbar from "react-bootstrap/Navbar"
import { useState } from "react";
import { Link } from "react-router-dom";
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';

library.add(faAngleDoubleLeft);


export default function SimpleAppBar({ title, download, emoFace }) {
  const [truth, setTruth] = useState(false);
  if(truth){
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
    setTruth(false);
  }
  return (

<Navbar bg="secondary" className="navbar" expanded="true">
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Link to="/">
        <FontAwesomeIcon className="icon_arrow" color="white" size="4x" icon={faAngleDoubleLeft} />
      </Link>
      <h3 className="navbar__boardTitle">{title}</h3>

     

    </Nav>
    <Nav>
    <Button className="navbar__downloadBoard" variant="outline-light" onClick={() => setTruth(true)}> 
      Download Board
      </Button>    
    </Nav>
  </Navbar.Collapse>
</Navbar>

  );
};
