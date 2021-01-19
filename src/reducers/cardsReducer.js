import { CONSTANTS } from "../actions";

const initialState = {};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_CARD: {
      const {title, text, priority, listID, id } = action.payload;

      const newCard = {
        title,
        text,
        priority,
        id: `card-${id}`,
        list: listID,
        
      };//we assign the new passed properties to a new card object

      //we return the old state plus the new card
      return { ...state, [`card-${id}`]: newCard };
    }
  
    case CONSTANTS.EDIT_CARD: {
      const { id, newTitle, newText, newPriority } = action.payload;
      const card = state[id];//we assign the state of the card that haves the passed id
      //and below we assign the new values in order to update the state of the card
      card.title = newTitle;
      card.text = newText;
      card.priority = newPriority;
      //we spread the state and update the indicated card that contains the new values
      return { ...state, [`card-${id}`]: card };
    }
 
    case CONSTANTS.IMPORT_CARD: {
      const {title, text, priority, listID, id } = action.payload;
      const newID = id;
      const newCard = {
        title,
        text,
        priority,
        id: newID,
        list: listID
      };

      return { ...state, [newID]: newCard };
    }

    case CONSTANTS.DRAG_HAPPENED:
      const {
        activeLists,
        lists,
        droppableIdStart,
        droppableIdEnd,
      } = action.payload;
      
      const listings =  activeLists.map(listID => lists[listID]);
    
      const newState = state;
      if (droppableIdStart !== droppableIdEnd) {

      for(let i in listings){
        console.log("Listings:",listings);
        for(let j in listings[i].cards){
          console.log("newState[listings[i].cards[j]].list",newState[listings[i].cards[j]].list);
          console.log("listings[i].id:",listings[i].id);
          //if cards->listID is not null && cards->listID is different than the target destination listID then do instruction
          if((newState[listings[i].cards[j]].list !== null) && ( newState[listings[i].cards[j]].list !== listings[i].id ))
          {
            
            //change the last listID of the card with the new target listID of the card 
            newState[listings[i].cards[j]].list = listings[i].id;

          }
      }
    }};

      return newState;

    default:
      return state;
  }
};

export default cardsReducer;