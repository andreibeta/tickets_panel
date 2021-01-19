import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard, deleteBoard, importBoard, editBoard } from "../actions/boardActions";
import { importList } from "../actions/listsActions";
import { importCard } from "../actions/cardsActions";
import { } from "../actions/"

//import './Home.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faGrinAlt, faEdit  } from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/Button";
import ImportFile from "../components/importFile";
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { MDBBtn, MDBCollapse } from "mdbreact";



library.add(faTrash, faGrinAlt, faEdit);
const Home = ({boardID, boards, boardOrder, dispatch }) => {
  // this is the home site that shows you your boards and you can also create a Board here.
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const [isEmojing, setIsEmojing] = useState(false);
  const [emojiState, setEmoji] = useState({});
  const [createBoard, setCreateBoard] = useState(false);

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const [collapsedImport,setCollapsedImport] =useState(true);
  const toggleImport =() => setCollapsedImport(!collapsedImport);
  const [collapsedCreate,setCollapsedCreate] =useState(true);
  const toggleNewBoard = () => setCollapsedCreate(!collapsedCreate,!collapsed);
 
  
  //Hooks for showing the clicked board
  const [tempID, setTempID] = useState('');
  const [boardDetails, setBoardDetails] = useState(false);
  //get this
const thumbnailDispatch = (id) => {
  setBoardDetails(true);
  setTempID(id)
  
}
//and this
const renderBoardDescription = () => {

  let board = boards[tempID];
  
  if(board){
    return (

      <div>
        <div className="boardHeader">    
        <h1 style={{color:"white"}}>{board.title}</h1>
        
      
      <Link
  
      key={boardID}
      to={`/${board.id}`}
      style={{ textDecoration: "none" }}
    >
  
  
      <Button variant="outline-light" className="nextPageButton">GO TO BOARD</Button>
    </Link>
   
    </div>
    <div className="descriptionContent">
      <h4 style={{color:"white"}}>Description:</h4>
      <p style={{color:"white", font:"serif", fontSize:"23px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
    </div>
    );

  } else {
    return null;
  }

}


  const handleChangeTitle = e => {
    setNewBoardTitle(e.target.value);
  };

  const handleChangeDesc = e => {
    setBoardDescription(e.target.value);
  }



  const handleSubmit = e => {
    setCreateBoard(false);
    setIsEmojing(false);
    e.preventDefault();
    
    if(newBoardTitle && boardDescription){
      
      dispatch(addBoard(emojiState, newBoardTitle, boardDescription));
      setNewBoardTitle("");
      setBoardDescription("");
      setEmoji({});
      toggleNewBoard();
    
    }else{
      return;
    }
  };
    
  const BoardThumbnail = ({ id, title, emoji },{handleDeleteBoard}) => {



      return (
        <div className="boardList">
          <div onClick={() => thumbnailDispatch(id)} className="boardElement">
          <h4 className="titleBoard">{title}</h4>
          </div>
          <div style={{marginTop:"9px", marginLeft:"10px", padding:".5rem"}}>
          <FontAwesomeIcon className="icon_delete" color="white" size="1x" icon="trash" onMouseDown={handleDeleteBoard} />
          </div>
        </div>
      );
    };
    



const renderBoardsList = () => {
  return boardOrder.map(boardID => {
    const board = boards[boardID];

    const handleDeleteBoard = () =>{
      dispatch(deleteBoard(boardID={boardID}));
    }
  return (
    <div key={boardID}>


{BoardThumbnail({ ...board },{handleDeleteBoard})} 
</div>

);    
});
};


const renderCreateBoard = () => {
  return (
  
  <form className="boardForm" onSubmit={handleSubmit} >
  <h5 style={{color:"white"}}>Create form</h5>
  <input
    className="create_input"
    onChange={handleChangeTitle}
    value={newBoardTitle}
    placeholder="Your boards title..."
    type="text"
  />
  <Form>
    <Form.Group>
      <h5 style={{color:"white" ,textAlign:"center"}}>Board description</h5>
      <Form.Control as="textarea" maxLength="255" style={{width:"350px"}} rows="3"
                    placeholder="Enter board description" onChange={handleChangeDesc}
                    value={boardDescription}
       />
    </Form.Group>
  </Form>
  {/* {renderEmojis()} */}
  <div style = {{display:"flex", flexDirection:"row"}}>

  <Button style={{marginTop:"10px",backgroundColor:"transparent", border:"0.5px solid white"}} onClick={handleSubmit} className="addBoardButton">Submit</Button>
  
  </div>

</form> 
);
};


const handleImport = () => {
  return (
    <ImportFile boardIds={boardOrder} importBoard={importBoard} importList={importList} 
            importCard={importCard} dispatch={dispatch} />
    
  );
};



return (
<div>
<div className="home_container">

<div className="left_column">

<>
<MDBBtn
       style={{backgroundColor:"transparent",minHeight:"35px",marginBottom:"5px",color:"white", border:"0.5px solid white"}}
      onClick={toggleImport}
    >
      IMPORT
    </MDBBtn>
        <MDBCollapse className ="a" className ="collapseShow" id="basicCollapse2" isOpen={!collapsedImport}>
        {handleImport()}
        </MDBCollapse>
      </>
<>
<MDBBtn
      style={{backgroundColor:"transparent",minHeight:"35px",marginBottom:"5px", color:"white", border:"0.5px solid white"}}
      onClick={toggleNewBoard}
    >
      CREATE NEW BOARD
    </MDBBtn>
        <MDBCollapse className ="a" className ="collapseShow" id="basicCollapse2" isOpen={!collapsedCreate}>
        {renderCreateBoard()}
        
        
        </MDBCollapse>
      </>
<>
<MDBBtn
       style={{backgroundColor:"transparent",minHeight:"35px", color:"white", border:"0.5px solid white"}}
      onClick={toggleNavbar}
    >
      MY BOARDS
    </MDBBtn>
        <MDBCollapse className ="collapseShow" id="basicCollapse2" isOpen={!collapsed}>
          
        {renderBoardsList()} 
        </MDBCollapse>
      </>
     

</div>

<div className="right_column">

{boardDetails === true ? renderBoardDescription() : null}


</div>

</div>

</div>

  );
};
const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder,
  cards: state.cards,
  lists: state.lists

});
export default connect(mapStateToProps)(Home);