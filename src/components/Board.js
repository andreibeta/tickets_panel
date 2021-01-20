import React, { PureComponent } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort, setActiveBoard } from "../actions";
import CreateCardForm from "./CreateCardForm";
import SimpleAppBar from "./SimpleAppBar";


class Board extends PureComponent {
  componentDidMount() {
    // set active board here
    const { boardID } = this.props.match.params;
    this.props.dispatch(setActiveBoard(boardID));
  }
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };
  
  

  //Medthod for downloading the json file.
  download(text, fileName) {
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
    a.setAttribute('download', fileName);
    return a;
  };
 

  render() {
    const { lists, cards, match, boards } = this.props;
    const { boardID } = match.params;//we get the boardID of the current board
    

    //here is the method where the json format of the board is build in order to download it
    //we assign the target board by id which contains the properties about the board and the lists id that haves 
    const board = boards[boardID];
    if (!board) {
      return <p>Board not found</p>;
    }
    const listOrder = board.lists;//we assign the lists id's of the target board
    console.log("listOrder:", listOrder);
       //Making the textFile for download
       let textFile = {};//creating an object where we will store the properties of board/lists/cards 

       textFile["boards"] = board;
       console.log("board:",board);
       //we assign to the 'listings' element the properties of each list of the target board, including the card id's of each list   
       let listings =  listOrder.map(listID => lists[listID]);
       console.log("listings:",listings);      
       textFile["lists"] = listings;

       let listOfCards = listOrder.map(listID =>{
        const tempList = lists[listID];//we assign the cards id's of each list
        console.log("tempList:",tempList);
        const cardsList = tempList.cards.map(cardID => cards[cardID]);
        console.log("cardsList:",cardsList);
        //we return each cards properties of every list present in the target board
        return cardsList;
       })
       textFile["cards"] = listOfCards;

    return (
     <div className="background">
    
    <SimpleAppBar title = {board.title} download = {this.download(JSON.stringify(textFile), "boardFile.json")} emoFace={board.emoji}/>

      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <div
              className="listContainer"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {/* we will map the lists of the target board and we will pass the data to the functional TrelloList component */}
              {listOrder.map((listID, index) => {
                const list = lists[listID];

                if (list) {

                  const listCards = list.cards.map(cardID => cards[cardID]);
                 


                return (
                    <TrelloList
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                    />
                  );
                }
              
              })}
              {provided.placeholder}
              <CreateCardForm list />
            </div>
          )}
        </Droppable>
       
      </DragDropContext>
      </div>
    );

  }
}

//used for selecting the part of the data from the store that the connected component needs
const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards,
 
});
//it is called every time the store state changes
export default connect(mapStateToProps)(Board);